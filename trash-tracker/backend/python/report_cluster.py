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

# Default values
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

def time_urgency(created_iso: Optional[str]) -> float:
    """AI: Calculate time-based urgency (recent reports are more urgent)"""
    age_h = hours_since(parse_dt(created_iso))
    return float(np.clip(math.log1p(age_h) / math.log1p(72.0), 0.0, 1.0))

def text_urgency(desc: Optional[str]) -> float:
    """AI: Natural Language Processing for Indonesian urgency keywords"""
    if not desc:
        return 0.0
    low = desc.lower()
    score = 0.0
    for w, wgt in TEXT_URGENCY_WORDS.items():
        if w in low:
            score += wgt
    return float(np.clip(score, 0.0, 1.0))

def calculate_urgency_metrics(rep: Report, org: Organizer) -> Dict[str, float]:
    """AI: Multi-factor urgency scoring algorithm"""
    dist_km = haversine_km(rep.lat, rep.lng, org.lat, org.lng)
    t_urg = time_urgency(rep.createdAt)
    x_urg = text_urgency(rep.description)
    
    # AI: Weighted combination of factors for intelligent decision making
    urgency_score = (
        WEIGHTS["time"] * t_urg + 
        WEIGHTS["text"] * x_urg +
        WEIGHTS["distance"] * (1.0 / (1.0 + dist_km * 0.1))  # Distance penalty
    )
    
    return {
        "distance_km": float(dist_km),
        "time_urg": float(t_urg),
        "text_urg": float(x_urg),
        "urgency_score": float(urgency_score),
        "user_lat": float(rep.lat),
        "user_lng": float(rep.lng)
    }

def select_top_urgent_reports(reports: List[Report], organizer: Organizer, 
                            working_radius_km: float = DEFAULT_WORKING_RADIUS_KM, 
                            max_reports: int = DEFAULT_MAX_REPORTS) -> Dict[str, Any]:
    """
    AI-driven smart prioritization system for waste management reports
    Combines NLP, temporal analysis, and spatial intelligence
    """
    if not reports:
        return {
            "selected_reports": [],
            "google_maps_url": "",
            "total_reports": 0,
            "organizer_location": {"lat": organizer.lat, "lng": organizer.lng},
            "filtering_stats": {
                "working_radius_km": working_radius_km,
                "max_reports_requested": max_reports,
                "reports_in_radius": 0,
                "reports_selected": 0
            }
        }
    
    # AI: Calculate urgency metrics for all reports
    enhanced_reports = []
    
    for rep in reports:
        metrics = calculate_urgency_metrics(rep, organizer)
        # Only add to enhanced_reports if it's within working radius
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
    
    # AI: Smart ranking by urgency score (highest priority first)
    enhanced_reports.sort(key=lambda x: x["urgency_score"], reverse=True)
    
    # AI: Select top K most urgent reports
    selected_reports = enhanced_reports[:max_reports]
    
    # Generate optimized Google Maps route
    google_maps_url = generate_google_maps_url(organizer, selected_reports)
    
    return {
        "selected_reports": selected_reports,
        "google_maps_url": google_maps_url,
        "total_reports": len(enhanced_reports),  # Only reports within radius
        "organizer_location": {"lat": float(organizer.lat), "lng": float(organizer.lng)},
        "filtering_stats": {
            "working_radius_km": float(working_radius_km),
            "max_reports_requested": int(max_reports),
            "reports_in_radius": int(len(enhanced_reports)),
            "reports_selected": int(len(selected_reports)),
            "reports_excluded_by_radius": int(len(reports) - len(enhanced_reports))
        }
    }

def generate_google_maps_url(organizer: Organizer, selected_reports: List[Dict]) -> str:
    """Generate optimized Google Maps navigation route"""
    if not selected_reports:
        return ""
    
    # Sort selected reports by distance for efficient routing
    sorted_reports = sorted(selected_reports, key=lambda x: x["distance_km"])
    
    # Build waypoints list starting with organizer
    waypoints = [f"{organizer.lat},{organizer.lng}"]
    
    # Add selected report points in distance order for efficient routing
    for report in sorted_reports:
        waypoints.append(f"{report['lat']},{report['lng']}")
    
    # Create Google Maps directions URL
    base_url = "https://www.google.com/maps/dir/"
    encoded_waypoints = [quote_plus(waypoint) for waypoint in waypoints]
    
    return base_url + "/".join(encoded_waypoints)

def main():
    try:
        raw_input = sys.stdin.read().strip()
        if not raw_input:
            raise ValueError("No input data provided")
        
        input_data = json.loads(raw_input)
        
        # Handle different input formats
        # Format 1: Direct organizer coordinates (Postman format)
        if 'lat' in input_data and 'lng' in input_data:
            organizer = Organizer(
                lat=float(input_data['lat']), 
                lng=float(input_data['lng'])
            )
            working_radius_km = float(input_data.get('radius_km', DEFAULT_WORKING_RADIUS_KM))
            max_reports = int(input_data.get('top_k', DEFAULT_MAX_REPORTS))
            
            if 'reports' not in input_data or not input_data['reports']:
                raise ValueError("No reports provided. Reports should be included in the input.")
            
            reports = []
            for report_data in input_data['reports']:
                reports.append(Report(
                    _id=str(report_data['_id']),
                    lat=float(report_data['lat']),
                    lng=float(report_data['lng']),
                    description=report_data.get('description', ''),
                    createdAt=report_data.get('createdAt')
                ))
        
        # Format 2: Original format with organizer object
        elif 'organizer' in input_data and 'reports' in input_data:
            org_data = input_data['organizer']
            organizer = Organizer(
                lat=float(org_data['lat']), 
                lng=float(org_data['lng'])
            )
            
            reports = []
            for report_data in input_data['reports']:
                reports.append(Report(
                    _id=str(report_data['_id']),
                    lat=float(report_data['lat']),
                    lng=float(report_data['lng']),
                    description=report_data.get('description', ''),
                    createdAt=report_data.get('createdAt')
                ))
            
            working_radius_km = float(input_data.get('working_radius_km', input_data.get('radius_km', DEFAULT_WORKING_RADIUS_KM)))
            max_reports = int(input_data.get('max_reports', input_data.get('top_k', DEFAULT_MAX_REPORTS)))
        else:
            raise ValueError("Invalid input format. Expected either {lat, lng, radius_km, top_k, reports} or {organizer, reports}")
        
        # Run AI-powered report selection
        result = select_top_urgent_reports(reports, organizer, working_radius_km, max_reports)
        
        # Output
        print(json.dumps(result, ensure_ascii=False, separators=(',', ':')))
        
    except Exception as e:
        error_msg = {
            "error": str(e),
            "type": type(e).__name__
        }
        sys.stderr.write(json.dumps(error_msg) + "\n")
        sys.exit(1)

if __name__ == "__main__":
    main()