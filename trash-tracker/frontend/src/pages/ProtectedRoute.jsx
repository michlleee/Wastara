import { Navigate } from "react-router-dom";

function ProtectedRoute({ allowedRoles, userRole, loadingUser, children }) {
  if (loadingUser) {
    return null;
  }
  if (!userRole) {
    return <Navigate to="/login" replace />;
  }
  if (!allowedRoles.includes(userRole)) {
    return <Navigate to="/login" replace />;
  }
  return children;
}

export default ProtectedRoute;
