import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage.jsx';
import SignUpUser from './pages/UserSignUp.jsx';
import SignUpOrganizer from './pages/OrganizerSignUp.jsx';
import Login from './pages/LoginPage.jsx';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/signup/user" element={<SignUpUser/>} />
          <Route path="/signup/organizer" element={<SignUpOrganizer/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}
//<Route path="/login" element={<Login/>} />

export default App
