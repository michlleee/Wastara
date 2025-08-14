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
    <div className="bg-gradient-to-br from-white to-slate-50 p-4 sm:p-6 lg:p-8 rounded-2xl border border-slate-200/60 flex flex-col backdrop-blur-sm w-full h-full max-h-150">
      <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
        <div className="p-1.5 sm:p-2 bg-orange-200 rounded-xl">
          <Package className="w-5 h-5 sm:w-6 sm:h-6 text-amber-600" />
        </div>
        <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-slate-800 tracking-tight">
          Organizer Active Pickups
        </h3>
      </div>
      {cluster?.reportIds?.length > 0 && (
        <button
          onClick={() => window.open(cluster.gmapsUrl, '_blank', 'noopener,noreferrer')}
          className="
            group/btn
            bg-blue-50
            border
            border-blue-200
            text-blue-600
            px-3 sm:px-4
            py-2 sm:py-2.5
            rounded-lg sm:rounded-xl
            text-sm font-medium
            hover:bg-blue-100
            hover:border-blue-300
            hover:text-blue-700
            transition-all
            duration-200
            shadow-sm
            hover:shadow-md
            focus:outline-none
            focus:ring-2
            focus:ring-blue-200
            focus:ring-opacity-50
            self-start
            flex
            items-center
            gap-2
            w-full xs:w-auto
            mb-4
          "
        >
          <svg 
            className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover/btn:scale-110 transition-transform duration-200" 
            fill="currentColor" 
            viewBox="0 0 24 24"
          >
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
          </svg>
          Open in Google Maps
        </button>
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
