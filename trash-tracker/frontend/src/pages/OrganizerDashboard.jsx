import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import GetClusters from "../components/DashboardPage/GetClusters";

function OrganizerDashboard() {
  const { mongoId } = useParams();
  const [organizerData, setOrganizerData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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
    <div>
      <h2>Organizer Dashboard</h2>
      <p>Mongo ID (from URL): {mongoId}</p>
      <p>Name: {organizerData.name}</p>
      <p>Email: {organizerData.email}</p>
      <p>Role: {organizerData.role}</p>
      <p>pickup count: {organizerData.pickupCount}</p>
      <GetClusters />
    </div>
  );
}

export default OrganizerDashboard;
