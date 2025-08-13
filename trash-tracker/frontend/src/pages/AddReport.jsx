import { useState } from "react";
import LeafletMap from "../components/LeafletMap";
import axios from "axios";
import backIcon from "../assets/back-svgrepo-com.svg";
import { useNavigate } from "react-router-dom";

export default function AddReport() {
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
      <div className="flex justify-center items-center w-full min-h-svh bg-gray-300 p-6">
        <button
          onClick={() => navigate(-1)}
          className="absolute top-4 left-4 p-2 rounded-full bg-black hover:bg-gray-900 transition shadow-lg"
        >
          <img src={backIcon} alt="Back" className="w-6 h-6" />
        </button>
        <div className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden">
          <div className="bg-gradient-to-r bg-[#25381f] px-8 py-6">
            <h2 className="text-2xl font-bold text-white mb-2">
              Add Trash Report
            </h2>
            <p className="text-teal-100 text-sm">
              Help keep our community clean
            </p>
          </div>

          <div className="p-8">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Upload your trash photo:
                </label>
                <label
                  htmlFor="trashImage"
                  className="cursor-pointer inline-block bg-green-700 hover:bg-green-800 transition px-6 py-3 rounded-lg text-white font-medium shadow-md"
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
                    className="mt-4 w-48 h-48 object-cover rounded-xl shadow-md border-2 border-gray-200"
                  />
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
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
                  className="border-2 border-gray-200 focus:border-teal-700 focus:ring-2 focus:ring-teal-200 rounded-lg p-4 w-full outline-none resize-none bg-gray-50 focus:bg-white transition"
                  placeholder="Describe your trash..."
                  rows="3"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
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
                  className="border-2 border-gray-200 focus:border-teal-700 focus:ring-2 focus:ring-teal-200 rounded-lg p-4 w-full outline-none resize-none bg-gray-50 focus:bg-white transition"
                  placeholder="Describe the location where you placed the trash..."
                  rows="3"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Choose Trash Location
                </label>
                <button
                  type="button"
                  onClick={triggerLocationRequest}
                  className="bg-green-700 hover:bg-green-800 transition px-6 py-3 rounded-lg text-white font-medium shadow-md flex items-center gap-2"
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                  </svg>
                  Turn on Location
                </button>
                <p className="text-sm text-gray-500 mt-2">
                  Please allow location access so we can pinpoint where your
                  trash is.
                </p>
                {!button ? (
                  <div className="mt-4 p-4 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
                    <p className="text-gray-500 text-center italic">
                      Map not available. Location not found.
                    </p>
                  </div>
                ) : (
                  <div className="h-52 mt-4 rounded-xl overflow-hidden border-2 border-gray-200 shadow-md">
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
                      ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                      : "bg-green-700 hover:bg-green-800 text-white shadow-lg hover:shadow-xl"
                  }
                  px-6 py-4 rounded-xl transition transform hover:scale-[1.02] font-semibold text-lg flex items-center justify-center gap-2
                `}
              >
                {loading ? (
                  "Submitting..."
                ) : submitted ? (
                  <>
                    <svg
                      className="w-6 h-6"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                    </svg>
                    Submitted successfully!
                  </>
                ) : (
                  "+ Add Trash Pickup Location"
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
