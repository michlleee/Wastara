import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function UserDashboard() {
  const { mongoId } = useParams();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
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

    fetchUserData();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h2>User Dashboard</h2>
      <p>Mongo ID (from URL): {mongoId}</p>
      <p>Name: {userData.name}</p>
      <p>Email: {userData.email}</p>
      <p>Role: {userData.role}</p>
      <p>report count: {userData.reportCount}</p>
    </div>
  );
}

export default UserDashboard;
