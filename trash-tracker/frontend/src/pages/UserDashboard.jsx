import { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../components/DashboardPage/Sidebar";
import StatCard from "../components/DashboardPage/StatCard";
import ActivePickups from "../components/DashboardPage/ActivePickups";
import MonthlyReportCard from "../components/DashboardPage/MonthlyReportCard";
import ReportNowCard from "../components/DashboardPage/ReportNowCard";
import UserCard from "../components/DashboardPage/UserProfileCard";

const UserDashboard = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [reports, setReports] = useState([]);

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

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="min-h-screen bg-[#F0EEDA] p-6">
      <div className="bg-white/70 rounded-xl overflow-hidden min-h-[calc(100vh-4rem)] p-6 border-2 border-black-500">
        <div className="flex gap-6 mb-6 w-full">
          <Sidebar />

          <div className="flex flex-col w-full">
            <UserCard name={userData.name} />
            <div className="flex gap-6">
              <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <StatCard
                  title="Total trash reported:"
                  value={reports.length}
                  unit="trashes"
                  icon={<span className="text-xl">😊</span>}
                />
                <StatCard
                  title="Trash reported this month:"
                  value={12}
                  unit="trashes"
                  bgColor="#C6D6B8"
                  icon={
                    <svg
                      className="w-5 h-5 text-gray-700"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M3 13H1V7H3V13M9 13H7V9H9V13M15 13H13V11H15V13M21 13H19V8H21V13..." />
                    </svg>
                  }
                />
                <StatCard
                  title="Pickups Completed:"
                  value={132}
                  unit="trashes"
                  icon={
                    <svg
                      className="w-5 h-5 text-green-600"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z" />
                    </svg>
                  }
                />
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-12 gap-6">
          <div className="sm:col-span-5 rounded-lg shadow-md/30">
            <ActivePickups />
          </div>

          <div className="sm:col-span-3 bg-white p-4 rounded-lg shadow-md/30 border-2 border-black-200 flex flex-col items-center justify-center text-center">
            <ReportNowCard />
          </div>

          <div className="sm:col-span-4 bg-white p-6 rounded-lg shadow-md/30 border-2 border-black-200">
            <MonthlyReportCard />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
