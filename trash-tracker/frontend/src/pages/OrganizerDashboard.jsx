import { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../components/DashboardPage/Sidebar";
import OrganizerProfileCard from "../components/DashboardPage/OrganizerProfileCard";
import AssignedPickups from "../components/OrganizerDashboardPage/AssignedPickups";
import RequestTrashForm from "../components/OrganizerDashboardPage/RequestTrashForm";

function OrganizerDashboard() {
  const [organizerData, setOrganizerData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [refreshPickups, setRefreshPickups] = useState(false);

  const refreshPickupHandler = () => {
    setRefreshPickups((prev) => !prev);
  };

  useEffect(() => {
    const fetchOrganizerData = async () => {
      try {
        const result = await axios.get("http://localhost:3000/api/me", {
          withCredentials: true,
        });

        setOrganizerData(result.data);
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

    fetchOrganizerData();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="min-h-screen bg-gray-300 relative overflow-hidden">
      <div className="flex min-h-screen relative z-10">
        <div className="flex-shrink-0">
          <Sidebar />
        </div>

        <div className="flex-1 p-8 space-y-6 md:ml-18 pt-16 md:pt-4">
          <div className="space-y-6">
            <OrganizerProfileCard name={organizerData.name} />
          </div>

          <RequestTrashForm refreshPickupHandler={refreshPickupHandler} />
          <AssignedPickups
            organizerId={organizerData._id}
            refreshTrigger={refreshPickups}
          />
        </div>
      </div>
    </div>
  );
}

export default OrganizerDashboard;
