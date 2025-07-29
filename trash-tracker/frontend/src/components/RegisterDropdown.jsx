import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

const RegisterDropdown = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  const handleSelect = (role) => {
    setOpen(false);
    if (role === "user") {
      navigate("/signup/user");
    } else if (role === "organizer") {
      navigate("/signup/organizer");
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="w-full sm:w-auto px-14 sm:px-28 py-3 sm:py-4 text-white border border-white rounded-xl font-bold text-base sm:text-lg transition duration-200"
        style={{
          backgroundColor: "#5E864C",
        }}
        onMouseOver={(e) => {
          e.currentTarget.style.backgroundColor = "#4d6f3e";
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.backgroundColor = "#5E864C";
        }}
      >
        SIGN UP NOW
      </button>

      {open && (
        <div className="absolute z-10 mt-3 w-56 rounded-xl shadow-xl bg-white ring-1 ring-black ring-opacity-5 animate-fade-in-down">
          <div className="py-2 text-base text-gray-800 font-medium space-y-1">
            <button
              onClick={() => handleSelect("user")}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-green-100 hover:pl-5 hover:scale-[1.01] transition-all duration-200 ease-in-out"
            >
              <span role="img" aria-label="User" className="text-xl">👤</span>
              <span>User</span>
            </button>
            <button
              onClick={() => handleSelect("organizer")}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-green-100 hover:pl-5 hover:scale-[1.01] transition-all duration-200 ease-in-out"
            >
              <span role="img" aria-label="Organizer" className="text-xl">🧑‍💼</span>
              <span>Organizer</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default RegisterDropdown;
