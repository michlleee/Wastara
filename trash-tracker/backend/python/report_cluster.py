# backend/python/report_cluster.py
import sys
import json
from dataclasses import dataclass
from typing import Optional, List, Dict, Any, Tuple
from datetime import datetime, timezone
import numpy as np
import math
from sklearn.cluster import KMeans
from sklearn.preprocessing import StandardScaler

# ---------------------------
# CONFIG
# ---------------------------
WEIGHTS = {
    "distance": 0.8,   # how much distance from organizer matters
    "time": 1.0,       # older = more urgent
    "text": 1.0,       # urgency words in description
}

TEXT_URGENCY_WORDS = {
    "bau": 0.8, "menyengat": 1.0, "banjir": 1.0,
    "besar": 0.5, "banyak": 0.5, "penuh": 0.7,
    "berceceran": 0.8, "berbau": 0.8, "beracun": 1.0,
}

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
        return datetime.utcnow().replace(tzinfo=timezone.utc)
    try:
        return datetime.fromisoformat(dt_iso.replace("Z", "+00:00")).astimezone(timezone.utc)
    except Exception:
        return datetime.utcnow().replace(tzinfo=timezone.utc)

def hours_since(dt: datetime) -> float:
    return max(0.0, (datetime.utcnow().replace(tzinfo=timezone.utc) - dt).total_seconds() / 3600.0)

def haversine_km(lat1, lon1, lat2, lon2) -> float:
    R = 6371.0
    p1, p2 = math.radians(lat1), math.radians(lat2)
    dp = p2 - p1
    dl = math.radians(lon2 - lon1)
    a = math.sin(dp/2)**2 + math.cos(p1)*math.cos(p2)*math.sin(dl/2)**2
    return 2 * R * math.asin(math.sqrt(a))

def time_urgency(created_iso: Optional[str]) -> float:
    age_h = hours_since(parse_dt(created_iso))
    return float(np.clip(math.log1p(age_h) / math.log1p(72.0), 0.0, 1.0))

def text_urgency(desc: Optional[str]) -> float:
    if not desc:
        return 0.0
    low = desc.lower()
    score = 0.0
    for w, wgt in TEXT_URGENCY_WORDS.items():
        if w in low:
            score += wgt
    return float(np.clip(score, 0.0, 1.0))

def build_vector(rep: Report, org: Organizer) -> Tuple[np.ndarray, Dict[str, float]]:
    dist_km = haversine_km(rep.lat, rep.lng, org.lat, org.lng)
    t_urg = time_urgency(rep.createdAt)
    x_urg = text_urgency(rep.description)
    
    vec = np.array([
        WEIGHTS["distance"] * dist_km,
        WEIGHTS["time"] * t_urg,
        WEIGHTS["text"] * x_urg,
    ], dtype=np.float32)
    
    parts = {
        "distance_km": dist_km,
        "time_urg": t_urg,
        "text_urg": x_urg,
        "user_lat": rep.lat,
        "user_lng": rep.lng
    }
    return vec, parts

def cluster_reports(reports: List[Report], organizer: Organizer, k: int = 6) -> Dict[str, Any]:
    if not reports:
        return {"labels": [], "centroids": []}
    
    X_list, meta = [], []
    
    for r in reports:
        v, parts = build_vector(r, organizer)
        X_list.append(v)
        meta.append(parts)
        
    X = np.vstack(X_list)
    scaler = StandardScaler()
    Xs = scaler.fit_transform(X)
    k = max(1, min(k, len(reports)))
    km = KMeans(n_clusters=k, n_init=10, random_state=42)
    labels = km.fit_predict(Xs)
    
    by: Dict[int, List[Tuple[float, float]]] = {}
    
    for i, r in enumerate(reports):
        c = int(labels[i])
        by.setdefault(c, []).append((float(r.lat), float(r.lng)))
        
    centroids = []
    
    for c, arr in by.items():
        arr = np.array(arr, dtype=np.float32)
        lat, lng = float(arr[:, 0].mean()), float(arr[:, 1].mean())
        centroids.append({
            "clusterId": f"c{c}",
            "size": len(arr),
            "centroid": {"type": "Point", "coordinates": [lng, lat]},
        })
    
    out = []
    for i, r in enumerate(reports):
        out.append({
            "_id": r._id,
            "clusterId": f"c{int(labels[i])}",
            **meta[i],
        })
    
    return {"labels": out, "centroids": centroids}

def main():
    try:
        # Read JSON input from stdin
        input_data = json.loads(sys.stdin.read())
        
        # Parse reports
        reports = []
        for report_data in input_data['reports']:
            reports.append(Report(
                _id=report_data['_id'],
                lat=report_data['lat'],
                lng=report_data['lng'],
                description=report_data.get('description'),
                createdAt=report_data.get('createdAt')
            ))
        
        # Parse organizer
        org_data = input_data['organizer']
        organizer = Organizer(lat=org_data['lat'], lng=org_data['lng'])
        
        # Get k value
        k = input_data.get('k', 6)
        
        # Run clustering
        result = cluster_reports(reports, organizer, k)
        
        # Output result as JSON
        print(json.dumps(result))
        
    except Exception as e:
        # Output error to stderr
        sys.stderr.write(f"Error: {str(e)}\n")
        sys.exit(1)

if __name__ == "__main__":
    main()