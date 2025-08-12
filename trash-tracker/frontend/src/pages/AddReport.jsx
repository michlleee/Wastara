import { useState } from "react";
import LeafletMap from "../components/LeafletMap";
import axios from "axios";
import backIcon from "../assets/back-svgrepo-com.svg";
import { useNavigate } from "react-router-dom";

export default function LocationTracker() {
  const [button, setButton] = useState(false);
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const [reportData, setReportData] = useState({
    trashDescription: "",
    placeDescription: "",
    status: "pending",
    createdAt: new Date(),
    updatedAt: new Date(),
    location: {
      type: "Point",
      coordinates: [],
    },
    trashImage: null,
  });

  const [previewUrl, setPreviewUrl] = useState(null);

  const triggerLocationRequest = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;

        setReportData((prev) => ({
          ...prev,
          location: {
            type: "Point",
            coordinates: [longitude, latitude],
          },
        }));
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!reportData.location.coordinates.length) {
      console.log("location is empty, submit request denied");
      return;
    }

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("trashDescription", reportData.trashDescription);
      formData.append("placeDescription", reportData.placeDescription);
      formData.append("status", reportData.status);
      formData.append("createdAt", reportData.createdAt);
      formData.append("updatedAt", reportData.updatedAt);
      formData.append("location", JSON.stringify(reportData.location));
      if (reportData.trashImage) {
        formData.append("trashImage", reportData.trashImage);
      }

      const res = await axios.post("/api/user-dashboard/create", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });

      const data = res.data;
      if (data.message === "New report created") {
        setSubmitted(true);
        setLoading(false);

        setTimeout(() => {
          navigate("/dashboard/user");
        }, 1000);
      } else {
        console.log("report creation failed");
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setReportData((prev) => ({ ...prev, trashImage: file }));
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  return (
    <>
      <div className="flex justify-center items-center w-full min-h-svh bg-gradient-to-br from-[#F0EEDA] to-[#aedf81] p-6">
        <button
          onClick={() => navigate(-1)}
          className="absolute top-4 left-4 p-1 rounded-full bg-green-500 hover:bg-green-600 transition"
        >
          <img src={backIcon} alt="Back" className="w-6 h-6" />
        </button>
        <div className="w-full max-w-2xl bg-white/70 backdrop-blur-lg border border-green-200 rounded-2xl shadow-xl p-8 transition-all">
          <div className="text-center mb-6">
            <h2 className="text-3xl font-extrabold text-green-800">
              Add Trash Report
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-emerald-500 to-green-600 mx-auto rounded-full mt-2"></div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-lg font-semibold text-green-900 mb-2">
                Upload your trash photo:
              </label>
              <label
                htmlFor="trashImage"
                className="cursor-pointer inline-block bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 transition px-5 py-2 rounded-lg text-white font-medium shadow-lg"
              >
                Choose File
              </label>
              <input
                type="file"
                id="trashImage"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
                required
              />
              {previewUrl && (
                <img
                  src={previewUrl}
                  alt="Trash preview"
                  className="mt-4 w-48 h-48 object-cover rounded-xl shadow-md border border-green-200"
                />
              )}
            </div>

            <div>
              <label className="block text-lg font-semibold text-green-900 mb-2">
                Trash Description
              </label>
              <textarea
                value={reportData.trashDescription}
                onChange={(e) =>
                  setReportData((prev) => ({
                    ...prev,
                    trashDescription: e.target.value,
                  }))
                }
                className="border border-green-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 rounded-lg p-3 w-full outline-none resize-none bg-white/80"
                placeholder="Describe your trash here..."
                rows="3"
                required
              />
            </div>

            <div>
              <label className="block text-lg font-semibold text-green-900 mb-2">
                Location Description
              </label>
              <textarea
                value={reportData.placeDescription}
                onChange={(e) =>
                  setReportData((prev) => ({
                    ...prev,
                    placeDescription: e.target.value,
                  }))
                }
                className="border border-green-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 rounded-lg p-3 w-full outline-none resize-none bg-white/80"
                placeholder="Describe your trash location here..."
                rows="3"
                required
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
                Please allow location access so we can pinpoint where your trash
                is.
              </p>
              {!button ? (
                <p className="mt-4 text-gray-500 italic">
                  Map not available. Location not found.
                </p>
              ) : (
                <div className="h-52 mt-4 rounded-xl overflow-hidden border border-green-300 shadow">
                  <LeafletMap
                    longitude={reportData.location.coordinates[0]}
                    latitude={reportData.location.coordinates[1]}
                    onLocationChange={(lat, lng) =>
                      setReportData((prev) => ({
                        ...prev,
                        location: {
                          type: "Point",
                          coordinates: [lng, lat],
                        },
                      }))
                    }
                  />
                </div>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full 
                ${
                  loading || submitted
                    ? "bg-green-200 text-green-800 cursor-not-allowed"
                    : "bg-gradient-to-r from-emerald-600 to-green-700 hover:from-emerald-700 hover:to-green-800 text-white"
                }
                px-6 py-3 rounded-xl shadow-lg transition transform hover:scale-[1.02] font-semibold
              `}
            >
              {loading
                ? "Submitting..."
                : submitted
                ? "Submitted successfully!"
                : "Submit Report"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
