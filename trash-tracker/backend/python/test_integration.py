# backend/python/test_integration.py
import json
import subprocess
import sys

def test_with_your_format():
    """Test the clustering script with your exact backend format"""
    
    # Sample data matching your backend format
    test_payload = {
        "organizer": {
            "lat": -6.091333,
            "lng": 106.681806
        },
        "k": 6,
        "reports": [
            {
                "_id": "66b8e1234567890abcdef123",
                "lat": -6.091333,
                "lng": 106.681806,
                "description": "Sampah berceceran dekat pasar, bau menyengat",
                "createdAt": "2025-08-11T08:00:00.000Z"
            },
            {
                "_id": "66b8e1234567890abcdef124", 
                "lat": -6.091400,
                "lng": 106.681900,
                "description": "Tumpukan sampah besar dan penuh",
                "createdAt": "2025-08-10T12:30:00.000Z"
            },
            {
                "_id": "66b8e1234567890abcdef125",
                "lat": -6.091500,
                "lng": 106.682000, 
                "description": "Sampah berbau dan berceceran ke jalan",
                "createdAt": "2025-08-09T15:45:00.000Z"
            },
            {
                "_id": "66b8e1234567890abcdef126",
                "lat": -6.095000,
                "lng": 106.685000,
                "description": "Tempat pembuangan penuh, perlu dibersihkan",
                "createdAt": "2025-08-08T09:20:00.000Z"
            },
            {
                "_id": "66b8e1234567890abcdef127",
                "lat": -6.095100,
                "lng": 106.685100,
                "description": "Sampah beracun, sangat berbau",
                "createdAt": "2025-08-07T14:10:00.000Z"
            },
            {
                "_id": "66b8e1234567890abcdef128",
                "lat": -6.088000,
                "lng": 106.679000,
                "description": "Sedikit sampah, tidak terlalu bau",
                "createdAt": "2025-08-11T16:00:00.000Z"
            }
        ]
    }
    
    try:
        # Run the clustering script
        process = subprocess.Popen(
            [sys.executable, 'report_cluster.py'],
            stdin=subprocess.PIPE,
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE,
            text=True,
            cwd='.'
        )
        
        stdout, stderr = process.communicate(json.dumps(test_payload))
        
        if process.returncode != 0:
            print("❌ Script failed with error:")
            print(stderr)
            return False
            
        try:
            result = json.loads(stdout)
        except json.JSONDecodeError as e:
            print("❌ Invalid JSON output:")
            print("STDOUT:", stdout)
            print("STDERR:", stderr)
            return False
        
        # Display results
        print("✅ DBSCAN Clustering Test Results:")
        print("=" * 50)
        print(f"📊 Total reports processed: {result.get('total_reports', 0)}")
        print(f"🗂️  Clusters found: {result.get('clustering_stats', {}).get('clusters_found', 0)}")
        print(f"📍 Route points selected: {len(result.get('route_points', []))}")
        print(f"⚠️  Noise points: {result.get('noise_count', 0)}")
        print(f"📱 Organizer: ({result.get('organizer_location', {}).get('lat', 0):.4f}, {result.get('organizer_location', {}).get('lng', 0):.4f})")
        
        # Show cluster details
        clusters = result.get('clusters', [])
        if clusters:
            print("\n🗂️ Cluster Details:")
            for i, cluster in enumerate(clusters):
                print(f"  Cluster {cluster['cluster_id']}: {cluster['size']} reports, "
                      f"urgency: {cluster['avg_urgency']:.2f}, "
                      f"distance: {cluster['distance_from_organizer']:.2f}km")
        
        # Show route points
        route_points = result.get('route_points', [])
        if route_points:
            print("\n📍 Optimized Route Points:")
            for i, point in enumerate(route_points, 1):
                print(f"  {i}. ID: {point['_id'][-6:]}... "
                      f"({point['lat']:.4f}, {point['lng']:.4f}) "
                      f"- Urgency: {point['urgency_score']:.2f} "
                      f"- Distance: {point['distance_km']:.2f}km")
        
        # Show Google Maps URL
        maps_url = result.get('google_maps_url', '')
        if maps_url:
            print(f"\n🗺️  Google Maps Route URL:")
            print(f"   {maps_url[:100]}...")
        
        print("\n✅ Test completed successfully!")
        return True
        
    except Exception as e:
        print(f"❌ Test failed with exception: {e}")
        return False

if __name__ == "__main__":
    test_with_your_format()