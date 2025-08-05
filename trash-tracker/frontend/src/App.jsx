import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage.jsx";
import SignUpUser from "./pages/UserSignUp.jsx";
import SignUpOrganizer from "./pages/OrganizerSignUp.jsx";
import FinishOrganizerSignUp from "./pages/FinishOrganizerSignUp.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import UserDashboard from "./pages/UserDashboard.jsx";
import OrganizerDashboard from "./pages/OrganizerDashboard.jsx";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/signup/user" element={<SignUpUser />} />
          <Route path="/signup/organizer" element={<SignUpOrganizer />} />
          <Route
            path="/signup/organizer/finish/:mongoId"
            element={<FinishOrganizerSignUp />}
          />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/dashboard/:mongoId" element={<UserDashboard />} />
          <Route
            path="/dashboard/organizer/:mongoId"
            element={<OrganizerDashboard />}
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
