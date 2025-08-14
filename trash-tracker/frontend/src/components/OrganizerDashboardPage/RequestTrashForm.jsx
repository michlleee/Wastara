import LeafletMap from "../LeafletMap";
import { useState } from "react";
import axios from "axios";

const RequestTrashForm = ({ refreshPickupHandler }) => {
  const [button, setButton] = useState(false);
  const [location, setLocation] = useState({
    lat: null,
    lon: null,
  });
  const [pickupPoint, setPickupPoint] = useState("");
  const [kilometer, setKilometer] = useState("");

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
          k: Number(pickupPoint),
          radiusKm: Number(kilometer),
        },
        { withCredentials: true }
      );
      console.log("Cluster result:", res.data);
      refreshPickupHandler();
    } catch (err) {
      console.error("Error fetching clusters:", err);
    }
  };

  return (
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
                value={kilometer}
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
                value={pickupPoint}
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
                Please allow location access so we can pinpoint where your trash
                is.
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
            onClick={() => {
              handleGetClusters();
              setPickupPoint("");
              setKilometer("");
            }}
            className="mt-7 w-full bg-[#d06631] hover:bg-[#c05b28] text-white font-semibold py-4 rounded-2xl shadow-lg transition"
          >
            Request Nearby Trash
          </button>
        </div>
      </div>
    </div>
  );
};

export default RequestTrashForm;
