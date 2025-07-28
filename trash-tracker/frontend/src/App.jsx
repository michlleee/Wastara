import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage.jsx';
import SignUp from './pages/RegisterPage.jsx';
// import Login from './pages/LoginPage.jsx';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/signup" element={<SignUp/>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

//<Route path="/login" element={<Login/>} />
export default App
