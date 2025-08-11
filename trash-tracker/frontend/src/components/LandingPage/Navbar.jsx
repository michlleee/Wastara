import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/wastara_logo_small_border.svg";
import { Menu, X } from "lucide-react"; // You can use any icon lib

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="relative flex justify-between items-center px-6 py-4 bg-transparent text-white">
      <div className="flex flex-row items-center">
        <img
          src={logo}
          alt="Wastara Logo"
          className="ml-2 sm:ml-8 h-8 sm:h-12 w-auto"
        />
        <span className="ml-2 sm:ml-4 text-md sm:text-lg">Wastara</span>
      </div>
      

      <nav className="space-x-6 hidden mr-25 sm:flex">
        <a href="#about" className="hover:text-green-300">About Us</a>
        <a href="#vision" className="hover:text-green-300">Vision & Mission</a>
        <a href="#features" className="hover:text-green-300">Features</a>
        <a href="#how" className="hover:text-green-300">How to Use</a>
      </nav>

      <div className="hidden sm:flex space-x-2">
        <Link
          to="/login"
          className="px-4 py-2 text-base font-semibold rounded-xl transition-all"
          style={{
            color: '#ffffff',
            border: '1px solid #ffffff',
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.backgroundColor = '#ffffff';
            e.currentTarget.style.color = '#6D9D58';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.backgroundColor = 'transparent';
            e.currentTarget.style.color = '#ffffff';
          }}
        >
          Login
        </Link>
      </div>

      <button
        className="sm:hidden text-white focus:outline-none"
        onClick={() => setIsOpen(true)}
      >
        <Menu size={28} />
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-60 z-50">
          <div className="fixed top-0 left-0 w-3/4 max-w-xs h-full bg-white p-6 text-black shadow-lg z-50 flex flex-col gap-6">
            <div className="flex justify-between items-center mb-4">
              <img src={logo} alt="Logo" className="h-8 w-auto" />
              <button onClick={() => setIsOpen(false)}>
                <X size={24} />
              </button>
            </div>

            <a href="#about" onClick={() => setIsOpen(false)}>About Us</a>
            <a href="#vision" onClick={() => setIsOpen(false)}>Vision & Mission</a>
            <a href="#features" onClick={() => setIsOpen(false)}>Features</a>
            <a href="#how" onClick={() => setIsOpen(false)}>How to Use</a>

            <hr />

            <Link to="/login" onClick={() => setIsOpen(false)} className="text-[#6D9D58] font-semibold">
              Login
            </Link>
            <Link
              to="/signup/user"
              onClick={() => setIsOpen(false)}
              className="bg-[#6D9D58] text-white px-4 py-2 rounded-md font-bold"
            >
              Sign Up
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;