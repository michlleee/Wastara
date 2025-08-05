import { useParams } from "react-router-dom";

function OrganizerDashboard() {
  const { mongoId } = useParams();
  console.log(mongoId);
  return <div>OrganizerDashboard welcome {mongoId}</div>;
}

export default OrganizerDashboard;
