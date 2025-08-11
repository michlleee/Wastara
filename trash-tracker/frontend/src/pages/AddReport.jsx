import { useEffect, useState } from "react";
import LeafletMap from "../components/Leaflet";

export default function LocationTracker() {
  const [location, setLocation] = useState({
    latitude: 0,
    longitude: 0,
  });

  const [reportData, setReportData] = useState({
    description: "",
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
  };

  useEffect(() => {
    triggerLocationRequest();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(reportData);
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
            name="description"
            value={reportData.description}
            onChange={(e) =>
              setReportData((prev) => ({
                ...prev,
                description: e.target.value,
              }))
            }
            className="border rounded p-2 w-full"
            placeholder="Describe your trash here..."
            required
          />

          <p>Choose the location of your trash placement:</p>
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
