import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
  Outlet,
} from "react-router-dom";
import { useEffect, useState } from "react";
import LandingPage from "./pages/LandingPage.jsx";
import SignUpUser from "./pages/UserSignUp.jsx";
import SignUpOrganizer from "./pages/OrganizerSignUp.jsx";
import FinishOrganizerSignUp from "./pages/FinishOrganizerSignUp.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import UserDashboard from "./pages/UserDashboard.jsx";
import OrganizerDashboard from "./pages/OrganizerDashboard.jsx";
import AddReport from "./pages/AddReport.jsx";
import LoadingScreen from "./components/LoadingScreen.jsx";
import { Toaster } from "react-hot-toast";
import axios from "axios";
import ProtectedRoute from "./pages/ProtectedRoute.jsx";
import GoogleCallback from "./pages/GoogleCallbacks.jsx";

function LayoutWithLoader() {
  const location = useLocation();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(timer);
  }, [location]);

  return (
    <>
      <LoadingScreen loading={loading} />
      <div className={`${loading ? "pointer-events-none" : ""}`}>
        <Outlet />
      </div>
    </>
  );
}
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
function App() {
  const [loadingUser, setLoadingUser] = useState(true);
  const [userData, setUserData] = useState(null);

  const fetchUser = async () => {
    try {
      const res = await axios.get(`${BACKEND_URL}/api/me`, {
        withCredentials: true,
      });
      setUserData(res.data);
    } catch (err) {
      setUserData(null);
    } finally {
      setLoadingUser(false);
    }
  };
  useEffect(() => {
    fetchUser();
  }, []);
  return (
    <BrowserRouter>
      <Toaster position="bottom-center" reverseOrder={false} />

      <Routes>
        <Route element={<LayoutWithLoader />}>
          <Route path="/" element={<LandingPage />} />
          <Route path="/signup/user" element={<SignUpUser />} />
          <Route path="/signup/organizer" element={<SignUpOrganizer />} />
          <Route
            path="/signup/organizer/finish"
            element={<FinishOrganizerSignUp />}
          />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/dashboard/user" element={<UserDashboard />} />
          <Route path="/dashboard/organizer" element={<OrganizerDashboard />} />
          <Route path="/dashboard/user/report" element={<AddReport />} />
          <Route path="/auth/google/callback" element={<GoogleCallback />} />
        </Route>

        {/* <Route
            path="/dashboard/user"
            element={
              <ProtectedRoute
                allowedRoles={["user"]}
                userRole={userData?.role}
                loadingUser={loadingUser}
              >
                <UserDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/organizer"
            element={
              <ProtectedRoute
                allowedRoles={["organizer"]}
                userRole={userData?.role}
                loadingUser={loadingUser}
              >
                <OrganizerDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/user/report"
            element={
              <ProtectedRoute
                allowedRoles={["user"]}
                userRole={userData?.role}
                loadingUser={loadingUser}
              >
                <AddReport />
              </ProtectedRoute>
            }
          />
        </Route> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;