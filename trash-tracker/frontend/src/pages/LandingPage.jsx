import { Link } from "react-router-dom";
import bgSampah from '../assets/bg_sampah2.jpg';
import landingBg from '../assets/bg_landing_page.png';
import logo from '../assets/WASTARA_black.svg';
import Footer from "../components/Footer"
import HeroSection from "../components/HeroSection";
const LandingPage = () => {
  return (
    <>
      {/* Landing Hero Section */}
      <div
        className="relative min-h-screen bg-cover bg-center"
      >
        {/* Gradient Overlay */}
        <div
          className="absolute inset-0 bg-cover bg-center z-10"
          style={{ backgroundImage: `url(${landingBg})` }}
        ></div>


        {/* Content */}
        <div className="relative z-20 flex flex-col min-h-screen">
          {/* Navbar */}
          <header className="flex justify-between items-center px-6 py-4 text-white">
            <img src={logo} alt="Wastara Logo" className="h-10 w-auto" />
            
            <nav className="space-x-6 hidden sm:flex">
              <a href="#about" className="hover:text-green-300">About Us</a>
              <a href="#vision" className="hover:text-green-300">Vision & Mission</a>
              <a href="#features" className="hover:text-green-300">Features</a>
              <a href="#how" className="hover:text-green-300">How to Use</a>
            </nav>
            <div className="space-x-2">
              <Link
                to="/login"
                className="px-5 py-2 text-base font-semibold leading-7 transition-all duration-200 bg-transparent rounded-xl font-pj focus:outline-none focus:ring-2 focus:ring-offset-2"
                style={{
                  color: '#E6E2C3',
                  border: '1px solid #E6E2C3',
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.backgroundColor = '#E6E2C3';
                  e.currentTarget.style.color = '#176B37'; // Optional: match brand
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
                to="/register"
                className="px-5 py-2 text-base font-bold leading-7 border border-transparent rounded-xl font-pj transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2"
                style={{
                  color: '#176B37',
                  backgroundColor: '#E6E2C3',
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.backgroundColor = '#176B37';
                  e.currentTarget.style.color = '#E6E2C3'
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.backgroundColor = '#E6E2C3';
                  e.currentTarget.style.color = '#176B37'
                }}
              >
                Sign Up
              </Link>

            </div>
          </header>

          {/* Hero */}
          <HeroSection />
        </div>
      </div>

      {/* About Us Section */}
      <section
        id="about"
        className="bg-gradient-to-br from-green-200 to-green-400 rounded-xl p-6 md:p-10 max-w-6xl mx-auto mt-20 shadow-2xl flex flex-col md:flex-row items-center gap-6"
      >
        {/* Left: Text */}
        <div className="md:w-2/3">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 text-gray-900">About Us</h2>
          <p className="text-justify text-gray-800 text-sm md:text-base leading-relaxed">
            At Wastara, we believe cleaner cities start with empowered communities.
            Our platform was created to give everyday citizens a simple, effective way
            to report unmanaged trash in their surroundings. Whether it's a packed bin
            or an illegal dump spot, your report helps local organizers and waste
            management teams act faster and smarter. Wastara is designed to be
            lightweight, accessible, and responsive — a progressive web app that works
            seamlessly on any device. We aim to connect the public with those who keep
            our cities clean, using tech as a bridge for civic impact.
          </p>
        </div>

        {/* Right: Image */}
        <div className="md:w-1/3">
          <img
            src={bgSampah}
            alt="Overflowing trash bin"
            className="rounded-lg w-full h-auto object-cover"
          />
        </div>
      </section>

      <Footer />
    </>
  );
};

export default LandingPage;