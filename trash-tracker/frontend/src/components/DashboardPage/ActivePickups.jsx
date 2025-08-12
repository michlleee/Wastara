import { useEffect, useState } from "react";
import PickupRequestCard from "./PickupRequestCard";
import axios from "axios";

const ActivePickups = () => {
  const [reports, setReports] = useState([]);
  const [currStatus, setCurrStatus] = useState(false);

  const getAllReports = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:3000/api/user-dashboard/reports",
        { withCredentials: true }
      );

      if (Array.isArray(data)) {
        setCurrStatus(true);
        setReports(data);
      } else if (data && typeof data.message === "string") {
        setCurrStatus(false);
        setReports([]);
      } else {
        setCurrStatus(false);
        setReports([]);
      }
    } catch (err) {
      setCurrStatus(false);
      setReports([]);
    }
  };

  const handleCancel = () => {
    console.log("clicked");
  };

  useEffect(() => {
    getAllReports();
  }, []);

  return (
    <div className="bg-white p-6 rounded-lg border-2 border-black-200 h-[360px] flex flex-col">
      <h3 className="sm:text-3xl font-bold mb-4 text-gray-800">
        Active Pickups
      </h3>

      <div
        className="space-y-3 overflow-y-auto pr-1"
        style={{ maxHeight: "calc(100% - 3rem)" }}
      >
        {currStatus ? (
          reports.map((report, index) => (
            <PickupRequestCard
              key={report._id || index}
              status={report.status}
              index={index}
              date={new Date(report.createdAt).toLocaleString()}
              trashDescription={report.trashDescription}
              placeDescription={report.placeDescription}
              showButton={report.status !== "in-progress"}
              onCancel={handleCancel}
            />
          ))
        ) : (
          <div>
            <p>No pickup requests made.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ActivePickups;
