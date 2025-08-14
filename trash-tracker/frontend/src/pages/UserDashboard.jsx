import { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../components/DashboardPage/Sidebar";
import StatCard from "../components/DashboardPage/StatCard";
import ActivePickups from "../components/DashboardPage/ActivePickups";
import MonthlyReportCard from "../components/DashboardPage/MonthlyReportCard";
import ReportNowCard from "../components/DashboardPage/ReportNowCard";
import UserCard from "../components/DashboardPage/UserProfileCard";
import happyFaceIcon from "../assets/happyFace.svg";
import flagIcon from "../assets/flagIcon.svg";
import checkMark from "../assets/checkMark.svg";
import LoadingScreen from "../components/LoadingScreen";

const UserDashboard = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [reports, setReports] = useState([]);

  const getUpdates = (updatedReports) => {
    setReports(updatedReports);
  };

  const getAllReports = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:3000/api/user-dashboard/reports",
        { withCredentials: true }
      );

      if (Array.isArray(data)) {
        setReports(data);
      } else if (data && typeof data.message === "string") {
        setReports([]);
      } else {
        setReports([]);
      }
    } catch (err) {
      setReports([]);
    }
  };

  const fetchUserData = async () => {
    try {
      const result = await axios.get("http://localhost:3000/api/me", {
        withCredentials: true,
      });

      setUserData(result.data);
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

  useEffect(() => {
    fetchUserData();
    getAllReports();
  }, []);

  if (loading) return <LoadingScreen />;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="min-h-screen bg-gray-300 relative overflow-hidden">
      <div className="flex min-h-screen relative z-10">
        <div className="flex-shrink-0">
          <Sidebar />
        </div>

        <div className="flex-1 p-8 space-y-6 md:ml-18 pt-16 md:pt-4">
          <div className="space-y-6">
            <UserCard name={userData.name} />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <StatCard
                title="Total trash reported:"
                value={reports.length}
                unit="trashes"
                icon={
                  <img
                    className="w-6 h-6"
                    draggable="false"
                    src={happyFaceIcon}
                    alt="happy face icon"
                  />
                }
              />
              <StatCard
                title="Trash reported this month:"
                value={1}
                unit="trashes"
                icon={
                  <img
                    className="w-5 h-5"
                    draggable="false"
                    src={flagIcon}
                    alt="flag icon"
                  />
                }
              />
              <StatCard
                title="Pickups Completed:"
                value={userData.reportCount}
                unit="trashes"
                icon={
                  <img
                    className="w-5 h-5"
                    draggable="false"
                    src={checkMark}
                    alt="flag icon"
                  />
                }
              />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-6">
              <ActivePickups getUpdatedReports={getUpdates} />
            </div>

            <div className="lg:col-span-3">
              <div className="bg-white backdrop-blur-sm p-6 rounded-2xl shadow-emerald-100/20 border border-white/30 flex flex-col items-center justify-center text-center transition-all duration-300 h-full">
                <ReportNowCard />
              </div>
            </div>

            <div className="lg:col-span-3">
              <div className="bg-white backdrop-blur-sm p-6 rounded-2xl shadow-emerald-100/20 border border-white/30 transition-all duration-300 h-full">
                <MonthlyReportCard />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
