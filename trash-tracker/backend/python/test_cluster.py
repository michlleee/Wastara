# backend/python/test_cluster.py
import json
import subprocess
import sys

# Test data matching your MongoDB structure
test_data = {
    "reports": [
        {
            "_id": "6899c6c0414956eca5cd4a0c",
            "lat": -6.146404856166636,
            "lng": 106.70896053341421,
            "description": "dekat jalan raya",
            "createdAt": "2025-08-11T10:32:09.000Z"
        },
        {
            "_id": "test2",
            "lat": -6.146500000000000,
            "lng": 106.70900000000000,
            "description": "sampah bau menyengat",
            "createdAt": "2025-08-10T10:32:09.000Z"
        },
        {
            "_id": "test3",
            "lat": -6.200000000000000,
            "lng": 106.80000000000000,
            "description": "tempat pembuangan sampah penuh",
            "createdAt": "2025-08-09T10:32:09.000Z"
        }
    ],
    "organizer": {
        "lat": -6.146404856166636,
        "lng": 106.70896053341421
    },
    "k": 3
}

def test_clustering():
    try:
        # Run the Python script
        process = subprocess.Popen(
            [sys.executable, 'report_cluster.py'],
            stdin=subprocess.PIPE,
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE,
            text=True
        )
        
        stdout, stderr = process.communicate(json.dumps(test_data))
        
        if process.returncode == 0:
            result = json.loads(stdout)
            print("✅ Clustering successful!")
            print("Centroids:", len(result['centroids']))
            print("Labels:", len(result['labels']))
            print("\nResult:")
            print(json.dumps(result, indent=2))
        else:
            print("❌ Error:", stderr)
            
    except Exception as e:
        print(f"❌ Exception: {e}")

if __name__ == "__main__":
    test_clustering()