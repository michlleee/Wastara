import { Link } from "react-router-dom";
import logo from "../assets/WASTARA_black.svg";

const Navbar = () => {
  return (
    <header className="flex justify-between items-center px-6 py-4 text-white">
      <img src={logo} alt="Wastara Logo" className="ml-8 h-10 w-auto" />
      
      <nav className="space-x-6 hidden sm:flex">
        <a href="#about" className="hover:text-green-300">About Us</a>
        <a href="#vision" className="hover:text-green-300">Vision & Mission</a>
        <a href="#features" className="hover:text-green-300">Features</a>
        <a href="#how" className="hover:text-green-300">How to Use</a>
      </nav>

      <div className="space-x-2">
        <Link
          to="/login"
          className="mx-4 px-4 py-2 text-base font-semibold leading-7 transition-all duration-200 bg-transparent rounded-xl font-pj focus:outline-none focus:ring-2 focus:ring-offset-2"
          style={{
            color: '#E6E2C3',
            border: '1px solid #E6E2C3',
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.backgroundColor = '#E6E2C3';
            e.currentTarget.style.color = '#176B37';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.backgroundColor = 'transparent';
            e.currentTarget.style.color = '#E6E2C3';
          }}
          onFocus={(e) => {
            e.currentTarget.style.backgroundColor = '#E6E2C3';
            e.currentTarget.style.color = '#176B37';
          }}
          onBlur={(e) => {
            e.currentTarget.style.backgroundColor = 'transparent';
            e.currentTarget.style.color = '#E6E2C3';
          }}
        >
          Login
        </Link>

        <Link
          to="/signup/user"
          className="mr-8 sm:px-4 sm:py-2 text-base font-bold leading-7 border border-transparent rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2"
          style={{
            color: '#176B37',
            backgroundColor: '#E6E2C3',
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.backgroundColor = '#176B37';
            e.currentTarget.style.color = '#E6E2C3';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.backgroundColor = '#E6E2C3';
            e.currentTarget.style.color = '#176B37';
          }}
        >
          Sign Up
        </Link>
      </div>
    </header>
  );
};

export default Navbar;