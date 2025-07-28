import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage.jsx';
// import SignUp from './pages/RegisterPage.jsx';
// import Login from './pages/LoginPage.jsx';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

//<Route path="/login" element={<Login/>} />
//<Route path="/register" element={<SignUp/>} />
export default App
