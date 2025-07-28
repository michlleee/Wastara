import React from "react";
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-100 to-green-300 px-4">
      <div className="text-center">
        <h1 className="text-4xl sm:text-5xl font-bold text-green-900 mb-4">
          Welcome to <span className="italic">"nama app kita"</span>
        </h1>
        <p className="text-md sm:text-lg text-green-800 mb-8 max-w-md mx-auto">
          Help keep your city clean. Report overflowing trash bins and help sanitation workers locate them easily.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link
            to="/login"
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-full shadow transition text-sm sm:text-base"
          >
            Log In
          </Link>
          <Link
            to="/register"
            className="bg-white text-green-700 border border-green-600 hover:bg-green-100 px-6 py-3 rounded-full shadow transition text-sm sm:text-base"
          >
            Register
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
