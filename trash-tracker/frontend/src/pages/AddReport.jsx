import { useState } from "react";
import LeafletMap from "../components/LeafletMap";
import axios from "axios";

export default function LocationTracker() {
  const [location, setLocation] = useState({
    latitude: 0,
    longitude: 0,
  });
  const [button, setButton] = useState(false);

  const [reportData, setReportData] = useState({
    trashDescription: "",
    placeDescription: "",
    status: "pending",
    createdAt: new Date(),
    updatedAt: new Date(),
    location: {
      latitude: 0,
      longitude: 0,
    },
    trashImage: null,
  });

  const [previewUrl, setPreviewUrl] = useState(null);

  const triggerLocationRequest = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude, accuracy } = position.coords;

        setLocation({
          latitude,
          longitude,
          accuracyInMeters: accuracy,
        });
      },
      (error) => {
        console.error("Error getting location:", error);
      },
      {
        enableHighAccuracy: true,
        timeout: 20000,
        maximumAge: 0,
      }
    );

    setButton(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (location.latitude === 0 && location.longitude === 0) {
      console.log("location is empty, submit request denied");
      return;
    }
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
      console.log(data);
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
      <div>
        <form onSubmit={handleSubmit}>
          <p>Report your trash!</p>

          <p>Upload your trash photo:</p>
          <label
            htmlFor="ktpImage"
            className="cursor-pointer bg-blue-500 text-white px-3 py-1 rounded"
          >
            Choose File
          </label>
          <input
            type="file"
            name="ktpImage"
            id="ktpImage"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
            required
          />

          {previewUrl && (
            <img
              src={previewUrl}
              alt="Trash preview"
              className="mt-2 w-40 h-40 object-cover rounded"
            />
          )}

          <p>Give us a description about your trash!</p>
          <textarea
            name="trashDescription"
            value={reportData.trashDescription}
            onChange={(e) =>
              setReportData((prev) => ({
                ...prev,
                trashDescription: e.target.value,
              }))
            }
            className="border rounded p-2 w-full"
            placeholder="Describe your trash here..."
            required
          />

          <p>Give us a description about your trash location</p>
          <textarea
            name="placeDescription"
            value={reportData.placeDescription}
            onChange={(e) =>
              setReportData((prev) => ({
                ...prev,
                placeDescription: e.target.value,
              }))
            }
            className="border rounded p-2 w-full"
            placeholder="Describe your trash location here..."
            required
          />

          <p>Choose the location of your trash placement:</p>
          <button
            type="button"
            onClick={triggerLocationRequest}
            className="border-amber-700 border-2 bg-amber-500 hover:bg-amber-600"
          >
            Turn on Location
          </button>
          <p>
            pls kindly give us access to your location to know where your trash
            is placed!
          </p>
          {!button ? (
            <p>map not available. location not found.</p>
          ) : (
            <div className="h-64">
              <LeafletMap
                latitude={location.latitude}
                longitude={location.longitude}
                onLocationChange={(lat, lng) =>
                  setReportData((prev) => ({
                    ...prev,
                    location: { latitude: lat, longitude: lng },
                  }))
                }
              />
            </div>
          )}

          <button
            type="submit"
            className="bg-green-500 text-white px-4 py-2 rounded mt-50"
          >
            Submit Report
          </button>
        </form>

        <p>Your latitude: {location.latitude}</p>
        <p>Your longitude: {location.longitude}</p>
      </div>
    </>
  );
}
