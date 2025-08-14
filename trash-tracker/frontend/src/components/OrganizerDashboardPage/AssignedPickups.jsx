import { useEffect, useState } from "react";
import axios from "axios";
import { Package, Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import ActivePickupCard from "./ActivePickupCard.jsx";

const AssignedPickups = ({ organizerId, refreshTrigger }) => {
  const [reports, setReports] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [cluster, setCluster] = useState({
    id: "",
    gmapsUrl: "",
    reportIds: [],
  });

  const getExistingReports = async () => {
    try {
      const result = await axios.get(
        "http://localhost:3000/api/organizer-dashboard/reports",
        { withCredentials: true }
      );

      setReports(result.data.report || []);
      setCluster(result.data.cluster || null);
    } catch (error) {
      if (error.response) {
        const { status, data } = error.response;

        if (status === 401 && data.notAuthenticated) {
          window.location.href = "/login";
        } else if (status === 403) {
          window.location.href = "/login";
        } else {
          toast.error(data.message || "Failed to load organizer pickups.");
        }
      } else {
        toast.error("Network error. Please try again.");
      }
      toast.error("Failed to load organizer pickups.");
      setReports([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = async (reportId) => {
    try {
      const res = await axios.post(
        "http://localhost:3000/api/organizer-dashboard/cancel",
        { reportId },
        { withCredentials: true }
      );
      if (res.data.success) {
        toast.success("Pickup request cancelled.");
        setIsLoading(true);
        setCluster(res.data.cluster);
        await getExistingReports();
      } else {
        toast.error("Cancellation failed.");
      }
    } catch (err) {
      console.error(err);
      toast.error("Cancellation failed.");
    }
  };

  const handleFinish = async (reportId, userId) => {
    try {
      const res = await axios.post(
        "http://localhost:3000/api/organizer-dashboard/finish",
        { reportId: reportId, userId: userId },
        { withCredentials: true }
      );

      if (res.data.success) {
        toast.success(res.data.message || "Pickup request finished!");
      } else {
        toast.error(res.data.message || "Failed to finish pickup request.");
      }
      setIsLoading(true);
      setCluster(res.data.cluster);
      await getExistingReports();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!organizerId) return;
    setIsLoading(true);
    getExistingReports();
  }, [organizerId, refreshTrigger]);

  const hasData = reports.length > 0;

  return (
    <div className="bg-gradient-to-br from-white to-slate-50 p-4 sm:p-6 lg:p-8 rounded-2xl border border-slate-200/60 min-h-[300px] max-h-[400px] sm:h-[360px] flex flex-col backdrop-blur-sm">
      <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
        <div className="p-1.5 sm:p-2 bg-emerald-100 rounded-xl">
          <Package className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-600" />
        </div>
        <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-slate-800 tracking-tight">
          Organizer Active Pickups
        </h3>
      </div>
      {cluster?.reportIds?.length > 0 && (
        <p>
          gmpas url:{" "}
          <a href={cluster.gmapsUrl} target="_blank" rel="noopener noreferrer">
            gmaps
          </a>
        </p>
      )}
      <div className="py-2 space-y-3 sm:space-y-4 overflow-y-auto pr-1 sm:pr-2 scrollbar-thin scrollbar-thumb-slate-300 scrollbar-track-transparent flex-1">
        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-8 h-8 text-slate-400 animate-spin" />
          </div>
        ) : hasData ? (
          reports.map((report, index) => (
            <ActivePickupCard
              key={report._id || index}
              status={report.status}
              reportId={report._id}
              userId={report.userId}
              index={index}
              date={new Date(report.createdAt).toLocaleString()}
              trashDescription={report.trashDescription}
              placeDescription={report.placeDescription}
              onCancel={handleCancel}
              onFinish={handleFinish}
            />
          ))
        ) : (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="p-4 bg-slate-100 rounded-full mb-4">
              <Package className="w-8 h-8 text-slate-400" />
            </div>
            <p className="text-slate-600 font-medium">
              No pickups assigned to you.
            </p>
            <p className="text-slate-400 text-sm mt-1">
              Pickups where you are the assigned organizer will appear here.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AssignedPickups;
