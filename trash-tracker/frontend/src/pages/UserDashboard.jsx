import { useParams } from "react-router-dom";

function Dashboard() {
  const { mongoId } = useParams();
  console.log("user dashboard " + mongoId);

  return <div>Dashboard user {mongoId}</div>;
}

export default Dashboard;
