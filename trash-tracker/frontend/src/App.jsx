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

function App() {
  return (
    <BrowserRouter>
      <Toaster position="bottom-center" reverseOrder={false} />
      <Routes>
        <Route element={<LayoutWithLoader />}>
          <Route path="/" element={<LandingPage />} />
          <Route path="/signup/user" element={<SignUpUser />} />
          <Route path="/signup/organizer" element={<SignUpOrganizer />} />
          <Route
            path="/signup/organizer/finish/:mongoId"
            element={<FinishOrganizerSignUp />}
          />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/dashboard/user" element={<UserDashboard />} />
          <Route path="/dashboard/organizer" element={<OrganizerDashboard />} />
          <Route path="/dashboard/user/report" element={<AddReport />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
