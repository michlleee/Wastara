import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import LeafletMap from "../components/LeafletMap";

function OrganizerDashboard() {
  const { mongoId } = useParams();
  const [organizerData, setOrganizerData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [button, setButton] = useState(false);
  const [location, setLocation] = useState({
    lat: null,
    lon: null,
  });
  const [pickupPoint, setPickupPoint] = useState(0);
  const [kilometer, setKilometer] = useState(0);

  const triggerLocationRequest = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;

        setLocation({ lat: latitude, lon: longitude });
        setButton(true);
      },
      (error) => {
        console.error("Error getting location:", error);
      },
      {
        enableHighAccuracy: true,
        timeout: 1000,
        maximumAge: 0,
      }
    );
  };

  const { lat, lon } = location;

  const handleGetClusters = async () => {
    try {
      const res = await axios.post("http://localhost:3000/api/cluster/find", {
        lat: lat,
        lng: lon,
        k: 5,
        radiusKm: kilometer,
      });
      console.log("Cluster result:", res.data);
      alert("Clusters fetched! Check console for details.");
    } catch (err) {
      console.error("Error fetching clusters:", err);
      alert("Failed to get clusters");
    }
  };

  useEffect(() => {
    const fetchOrganizerData = async () => {
      try {
        const result = await axios.get("http://localhost:3000/api/me", {
          withCredentials: true,
        });

        setOrganizerData(result.data);
      } catch (err) {
        if (err.response && err.response.data?.message) {
          setError(err.response.data.message);
        } else {
          setError("An unexpected error occurred");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchOrganizerData();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h2>Organizer Dashboard</h2>
      <p>Mongo ID (from URL): {mongoId}</p>
      <p>Name: {organizerData.name}</p>
      <p>Email: {organizerData.email}</p>
      <p>Role: {organizerData.role}</p>
      <p>pickup count: {organizerData.pickupCount}</p>

      <div>
        <p>input how many kilos u want:</p>
        <input
          className="w-2xl border-amber-600 border-2"
          type="number"
          name="kilometer"
          placeholder="e.g. 2 kilometer from your location.."
          onChange={(e) => {
            const val = Number(e.target.value);
            if (val >= 0) setKilometer(val);
          }}
        />

        <p>How many trash pickup points do you want?</p>
        <input
          className="w-2xl border-amber-600 border-2"
          type="number"
          name="pickupPoints"
          placeholder="e.g. 20 pickup points within my chosen radius.."
          onChange={(e) => {
            const val = Number(e.target.value);
            if (val >= 0) setPickupPoint(val);
          }}
        />
      </div>
      <div>
        <label className="block text-lg font-semibold text-green-900 mb-2">
          Choose Trash Location
        </label>
        <button
          type="button"
          onClick={triggerLocationRequest}
          className="bg-gradient-to-r from-amber-300 to-amber-400 hover:from-amber-400 hover:to-amber-500 transition px-5 py-2 rounded-lg text-amber-900 font-medium shadow-lg"
        >
          Turn on Location
        </button>
        <p className="text-sm text-gray-600 mt-2">
          Please allow location access so we can pinpoint where your trash is.
        </p>
        {!button ? (
          <p className="mt-4 text-gray-500 italic">
            Map not available. Location not found.
          </p>
        ) : (
          <div className="h-52 mt-4 rounded-xl overflow-hidden border border-green-300 shadow">
            <LeafletMap
              longitude={location.lon}
              latitude={location.lat}
              onLocationChange={(lat, lng) =>
                setLocation({ lat: lat, lon: lng })
              }
            />
          </div>
        )}
      </div>

      <button
        type="button"
        onClick={handleGetClusters}
        className="bg-[#93B088] text-white px-6 py-3 rounded-xl font-medium hover:bg-[#7a9671] transition-colors"
      >
        Get Clusters
      </button>
    </div>
  );
}

export default OrganizerDashboard;
