# backend/python/report_cluster.py
import sys
import json
from dataclasses import dataclass
from typing import Optional, List, Dict, Any
from datetime import datetime, timezone
import numpy as np
import math
from urllib.parse import quote_plus

# ---------------------------
# CONFIG
# ---------------------------
WEIGHTS = {
    "distance": 0.8,
    "time": 1.0,
    "text": 1.0,
}

TEXT_URGENCY_WORDS = {
    "bau": 0.8, "menyengat": 1.0, "banjir": 1.0,
    "besar": 0.5, "banyak": 0.5, "penuh": 0.7,
    "berceceran": 0.8, "berbau": 0.8, "beracun": 1.0,
}

DEFAULT_MAX_REPORTS = 10
DEFAULT_WORKING_RADIUS_KM = 5.0

@dataclass
class Report:
    _id: str
    lat: float
    lng: float
    description: Optional[str]
    createdAt: Optional[str]

@dataclass
class Organizer:
    lat: float
    lng: float

# ---------------------------
# Time & distance utils
# ---------------------------
def parse_dt(dt_iso: Optional[str]) -> datetime:
    if not dt_iso:
        return datetime.now(timezone.utc)
    try:
        return datetime.fromisoformat(dt_iso.replace("Z", "+00:00")).astimezone(timezone.utc)
    except Exception:
        return datetime.now(timezone.utc)

def hours_since(dt: datetime) -> float:
    return max(0.0, (datetime.now(timezone.utc) - dt).total_seconds() / 3600.0)

def haversine_km(lat1, lon1, lat2, lon2) -> float:
    """Calculate distance between two points in kilometers"""
    R = 6371.0
    p1, p2 = math.radians(lat1), math.radians(lat2)
    dp = p2 - p1
    dl = math.radians(lon2 - lon1)
    a = math.sin(dp/2)**2 + math.cos(p1)*math.cos(p2)*math.sin(dl/2)**2
    return 2 * R * math.asin(math.sqrt(a))

# ---------------------------
# Local TSP heuristics (no external API)
# ---------------------------
def path_length_km(origin, pts_order):
    """Total length from origin through pts_order (open tour, no return)."""
    if not pts_order:
        return 0.0
    total = haversine_km(origin[0], origin[1], pts_order[0][0], pts_order[0][1])
    for i in range(len(pts_order) - 1):
        a, b = pts_order[i], pts_order[i + 1]
        total += haversine_km(a[0], a[1], b[0], b[1])
    return total

def nearest_neighbor_order(origin, pts):
    """
    Greedy: always go to the nearest next point.
    origin: (lat, lng)
    pts: list[(lat, lng)]
    returns: list[(lat, lng)] in visiting order
    """
    remaining = pts[:]
    order = []
    cur = origin
    while remaining:
        j = min(range(len(remaining)),
                key=lambda k: haversine_km(cur[0], cur[1], remaining[k][0], remaining[k][1]))
        nxt = remaining.pop(j)
        order.append(nxt)
        cur = nxt
    return order

def try_2opt_once(origin, order):
    """
    Try a single best 2-opt swap; return (improved_order, improved_flag).
    """
    n = len(order)
    if n < 4:
        return order, False
    best = order
    best_len = path_length_km(origin, order)
    for i in range(1, n - 1):
        for k in range(i + 1, n):
            new_order = order[:i] + list(reversed(order[i:k+1])) + order[k+1:]
            new_len = path_length_km(origin, new_order)
            if new_len + 1e-9 < best_len:
                return new_order, True
    return best, False

def two_opt(origin, order, max_iters=60):
    """Repeated 2-opt until no improvement or max_iters reached."""
    cur = order[:]
    for _ in range(max_iters):
        cur, improved = try_2opt_once(origin, cur)
        if not improved:
            break
    return cur

def optimize_visit_order(organizer: Organizer, reports: List[Dict]):
    """
    Optimize visiting order (open tour):
    1) Nearest Neighbor from organizer
    2) 2-opt refinement
    Returns (reordered_reports, estimated_km)
    """
    origin = (float(organizer.lat), float(organizer.lng))
    pts = [(r["lat"], r["lng"]) for r in reports]
    # seed route
    nn = nearest_neighbor_order(origin, pts)
    # refine with 2-opt
    opt_pts = two_opt(origin, nn, max_iters=60)

    # map back to the reports in the new order (handles duplicate coords)
    buckets = {}
    for idx, p in enumerate(pts):
        buckets.setdefault(p, []).append(idx)
    new_reports = []
    for p in opt_pts:
        idx = buckets[p].pop(0)
        new_reports.append(reports[idx])

    est_km = path_length_km(origin, [(r["lat"], r["lng"]) for r in new_reports])
    return new_reports, est_km

# ---------------------------
# Scoring
# ---------------------------
def time_urgency(created_iso: Optional[str]) -> float:
    """Recent reports more urgent (0..1)."""
    age_h = hours_since(parse_dt(created_iso))
    return float(np.clip(math.log1p(age_h) / math.log1p(72.0), 0.0, 1.0))

def text_urgency(desc: Optional[str]) -> float:
    """Keyword-based urgency (0..1)."""
    if not desc:
        return 0.0
    low = desc.lower()
    score = 0.0
    for w, wgt in TEXT_URGENCY_WORDS.items():
        if w in low:
            score += wgt
    return float(np.clip(score, 0.0, 1.0))

def calculate_urgency_metrics(rep: Report, org: Organizer) -> Dict[str, float]:
    """Multi-factor urgency scoring."""
    dist_km = haversine_km(rep.lat, rep.lng, org.lat, org.lng)
    t_urg = time_urgency(rep.createdAt)
    x_urg = text_urgency(rep.description)
    urgency_score = (
        WEIGHTS["time"] * t_urg +
        WEIGHTS["text"] * x_urg +
        WEIGHTS["distance"] * (1.0 / (1.0 + dist_km * 0.1))  # closer = higher
    )
    return {
        "distance_km": float(dist_km),
        "time_urg": float(t_urg),
        "text_urg": float(x_urg),
        "urgency_score": float(urgency_score),
        "user_lat": float(rep.lat),
        "user_lng": float(rep.lng)
    }

# ---------------------------
# Core selection + routing
# ---------------------------
def select_top_urgent_reports(
    reports: List[Report],
    organizer: Organizer,
    working_radius_km: float = DEFAULT_WORKING_RADIUS_KM,
    max_reports: int = DEFAULT_MAX_REPORTS
) -> Dict[str, Any]:
    """
    Rank by urgency within working radius, select top-K,
    then locally optimize visit order (NN + 2-opt).
    """
    if not reports:
        return {
            "selected_reports": [],
            "google_maps_url": "",
            "estimated_route_km": 0.0,
            "total_reports": 0,
            "organizer_location": {"lat": organizer.lat, "lng": organizer.lng},
            "filtering_stats": {
                "working_radius_km": working_radius_km,
                "max_reports_requested": max_reports,
                "reports_in_radius": 0,
                "reports_selected": 0
            }
        }

    # Score and keep only those within working radius
    enhanced_reports = []
    for rep in reports:
        metrics = calculate_urgency_metrics(rep, organizer)
        if metrics["distance_km"] <= working_radius_km:
            enhanced_report = {
                "_id": rep._id,
                "lat": rep.lat,
                "lng": rep.lng,
                "description": rep.description or "",
                "createdAt": rep.createdAt,
                **metrics
            }
            enhanced_reports.append(enhanced_report)

    # Rank by urgency
    enhanced_reports.sort(key=lambda x: x["urgency_score"], reverse=True)

    # Select top-K
    selected_reports = enhanced_reports[:max_reports]

    # Optimize stop order (NN + 2-opt)
    optimized_reports, estimated_km = optimize_visit_order(organizer, selected_reports)

    # Build URL in the optimized order
    google_maps_url = generate_google_maps_url(organizer, optimized_reports)

    return {
        "selected_reports": optimized_reports,
        "google_maps_url": google_maps_url,
        "estimated_route_km": round(float(estimated_km), 3),
        "total_reports": len(enhanced_reports),  # reports within radius
        "organizer_location": {"lat": float(organizer.lat), "lng": float(organizer.lng)},
        "filtering_stats": {
            "working_radius_km": float(working_radius_km),
            "max_reports_requested": int(max_reports),
            "reports_in_radius": int(len(enhanced_reports)),
            "reports_selected": int(len(selected_reports)),
            "reports_excluded_by_radius": int(len(reports) - len(enhanced_reports))
        }
    }

def generate_google_maps_url(organizer: Organizer, ordered_reports: List[Dict]) -> str:
    """Build a Google Maps URL in the exact optimized order (open tour)."""
    if not ordered_reports:
        return ""
    waypoints = [f"{organizer.lat},{organizer.lng}"] + [
        f"{r['lat']},{r['lng']}" for r in ordered_reports
    ]
    base_url = "https://www.google.com/maps/dir/"
    encoded_waypoints = [quote_plus(wp) for wp in waypoints]
    return base_url + "/".join(encoded_waypoints)

# ---------------------------
# CLI entry
# ---------------------------
def main():
    try:
        raw_input = sys.stdin.read().strip()
        if not raw_input:
            raise ValueError("No input data provided")

        input_data = json.loads(raw_input)

        # Format 1: { lat, lng, radius_km, top_k, reports }
        if 'lat' in input_data and 'lng' in input_data:
            organizer = Organizer(
                lat=float(input_data['lat']),
                lng=float(input_data['lng'])
            )
            working_radius_km = float(input_data.get('radius_km', DEFAULT_WORKING_RADIUS_KM))
            max_reports = int(input_data.get('top_k', DEFAULT_MAX_REPORTS))

            if 'reports' not in input_data or not input_data['reports']:
                raise ValueError("No reports provided. Reports should be included in the input.")

            reports = [
                Report(
                    _id=str(r['_id']),
                    lat=float(r['lat']),
                    lng=float(r['lng']),
                    description=r.get('description', ''),
                    createdAt=r.get('createdAt')
                ) for r in input_data['reports']
            ]

        # Format 2: { organizer: {lat, lng}, radius_km?, top_k?, reports }
        elif 'organizer' in input_data and 'reports' in input_data:
            org_data = input_data['organizer']
            organizer = Organizer(
                lat=float(org_data['lat']),
                lng=float(org_data['lng'])
            )
            reports = [
                Report(
                    _id=str(r['_id']),
                    lat=float(r['lat']),
                    lng=float(r['lng']),
                    description=r.get('description', ''),
                    createdAt=r.get('createdAt')
                ) for r in input_data['reports']
            ]
            working_radius_km = float(input_data.get('working_radius_km', input_data.get('radius_km', DEFAULT_WORKING_RADIUS_KM)))
            max_reports = int(input_data.get('max_reports', input_data.get('top_k', DEFAULT_MAX_REPORTS)))
        else:
            raise ValueError("Invalid input format. Expected either {lat, lng, radius_km, top_k, reports} or {organizer, reports}")

        result = select_top_urgent_reports(reports, organizer, working_radius_km, max_reports)
        print(json.dumps(result, ensure_ascii=False, separators=(',', ':')))

    except Exception as e:
        error_msg = {"error": str(e), "type": type(e).__name__}
        sys.stderr.write(json.dumps(error_msg) + "\n")
        sys.exit(1)

if __name__ == "__main__":
    main()
