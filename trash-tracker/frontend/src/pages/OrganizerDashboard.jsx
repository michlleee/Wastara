import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import LeafletMap from "../components/LeafletMap";
import Sidebar from "../components/DashboardPage/Sidebar";
import OrganizerProfileCard from "../components/DashboardPage/OrganizerProfileCard";
import AssignedPickups from "../components/OrganizerDashboardPage/AssignedPickups";

function OrganizerDashboard() {
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
      const res = await axios.post(
        "http://localhost:3000/api/cluster/find",
        {
          lat: lat,
          lng: lon,
          k: pickupPoint,
          radiusKm: kilometer,
        },
        { withCredentials: true }
      );
      console.log("Cluster result:", res.data);
    } catch (err) {
      console.error("Error fetching clusters:", err);
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
    <div className="min-h-screen bg-gray-300 relative overflow-hidden">
      <div className="flex min-h-screen relative z-10">
        <div className="flex-shrink-0">
          <Sidebar />
        </div>

        <div className="flex-1 p-8 space-y-6 md:ml-18 pt-16 md:pt-4">
          <div className="space-y-6">
            <OrganizerProfileCard name={organizerData.name} />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

            <div className="lg:col-span-3">
              <div className="bg-white rounded-3xl shadow-xl border border-gray-200 p-6 relative overflow-hidden h-full flex flex-col">
                <h1 className="text-[32px] leading-none font-extrabold text-[#243a22] tracking-tight">
                  Get Nearby Trash
                </h1>
                <hr className="mt-4 mb-6 border-t-2 border-[#3a493a]" />

                {/* --- FORM --- */}
                <div className="space-y-6 flex-1">
                  <div>
                    <label className="block text-lg font-semibold text-[#243a22] mb-2">
                      Maximum Distance
                    </label>
                    <input
                      className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-800 placeholder-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400 transition"
                      type="number"
                      name="kilometer"
                      placeholder="Minimum distance is 15km"
                      onChange={(e) => {
                        const val = Number(e.target.value);
                        if (val >= 0) setKilometer(val);
                      }}
                    />
                  </div>

                  <div>
                    <label className="block text-lg font-semibold text-[#243a22] mb-2">
                      Maximum Trash
                    </label>
                    <input
                      className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-800 placeholder-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400 transition"
                      type="number"
                      name="pickupPoints"
                      placeholder="Minimum 5, Maximum 30"
                      onChange={(e) => {
                        const val = Number(e.target.value);
                        if (val >= 0) setPickupPoint(val);
                      }}
                    />
                  </div>

                  <div>
                    <label className="block text-lg font-semibold text-[#243a22] mb-2">
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
                      <div className="h-56 mt-4 rounded-xl overflow-hidden border border-gray-300 shadow">
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
                </div>

                {/* Primary CTA */}
                <button
                  type="button"
                  onClick={handleGetClusters}
                  className="mt-7 w-full bg-[#d06631] hover:bg-[#c05b28] text-white font-semibold py-4 rounded-2xl shadow-lg transition"
                >
                  Request Nearby Trash
                </button>
              </div>
            </div>

          </div>
          <AssignedPickups organizerId={organizerData._id} />
        </div>
      </div>
    </div>
  );
}

export default OrganizerDashboard;