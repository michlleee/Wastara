import { useState } from "react";
import SidebarIcon from "../DashboardPage/SidebarIcon";
import { useNavigate } from "react-router-dom";
import LogoutIcon from "../LogoutIcon";

const OrganizerSidebar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const navigate = useNavigate();

  return (
    <>
      {/* Mobile Hamburger Button */}
      {!isMobileMenuOpen && (
        <button
          onClick={toggleMobileMenu}
          className="md:hidden fixed top-4 left-4 z-[60] w-10 h-10 bg-black rounded-lg flex items-center justify-center shadow-lg border border-gray-700"
        >
          <div className="w-6 h-6 flex flex-col justify-center items-center">
            <span className="bg-white block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm -translate-y-0.5"></span>
            <span className="bg-white block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm my-0.5 opacity-100"></span>
            <span className="bg-white block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm translate-y-0.5"></span>
          </div>
        </button>
      )}

      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/50 z-[50]"
          onClick={toggleMobileMenu}
        ></div>
      )}

      <div
        className={`
          flex flex-col w-20 bg-gradient-to-b from-black via-gray-900 to-black p-4 items-center h-screen justify-between shadow-2xl border-r border-gray-800/50 backdrop-blur-sm relative overflow-hidden
          left-0 top-0 z-[55] 
          transition-transform duration-300 ease-in-out
          ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0
        `}
        style={{
          position: "fixed",
          left: 0,
          top: 0,
          height: "100vh",
          zIndex: 55,
        }}
      >
        {isMobileMenuOpen && (
          <button
            onClick={toggleMobileMenu}
            className="md:hidden absolute top-4 right-4 z-10 w-8 h-8 bg-gray-800 hover:bg-gray-700 rounded-lg flex items-center justify-center shadow-lg border border-gray-600 transition-colors duration-200"
          >
            <svg
              className="w-5 h-5 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        )}

        {/* Top section */}
        <div className="flex flex-col space-y-8 items-center relative z-10">
          <div className="group cursor-pointer relative">
            {/* Logo with orange gradient */}
            <div className="w-14 h-14 bg-gradient-to-br from-orange-400 via-orange-500 to-orange-600 rounded-2xl flex items-center justify-center shadow-xl hover:shadow-orange-500/30 transition-all duration-500 hover:scale-110 ring-2 ring-orange-500/30 hover:ring-orange-400/50 hover:rotate-3">
              <img
                src="../../src/assets/wastara_logo_small.svg"
                alt="Wastara Logo"
                className="w-10 h-10 group-hover:scale-110 transition-transform duration-300"
              />
            </div>
            {/* Pulsing orange glow */}
            <div className="absolute -inset-2 bg-gradient-to-r from-orange-600 via-orange-400 to-orange-600 rounded-2xl blur-lg opacity-0 group-hover:opacity-30 transition-opacity duration-500 animate-pulse"></div>
            {/* Rotating orange ring */}
            <div className="absolute -inset-1 border-2 border-orange-400/20 rounded-2xl group-hover:border-orange-400/40 transition-colors duration-300 group-hover:animate-spin"></div>
          </div>

          <div className="flex flex-col space-y-6 items-center">
            <SidebarIcon
              label="Report"
              hoverBg="hover:bg-orange-500/15"
              hoverText="group-hover:text-orange-400"
              icon={
                <svg
                  className="w-6 h-6 text-white group-hover:text-orange-400 transition-colors duration-300"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M3 6h18" />
                  <path d="M8 6V4h8v2" />
                  <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
                  <path d="M12 10c0-2 1.5-3.5 3.5-3.5S19 8 19 10c0 2.5-3.5 6-3.5 6s-3.5-3.5-3.5-6z" />
                </svg>
              }
            />
            <SidebarIcon
              label="History"
              hoverBg="hover:bg-orange-500/15"
              hoverText="group-hover:text-orange-400"
              icon={
                <svg
                  className="w-6 h-6 text-white group-hover:text-orange-400 transition-colors duration-300"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="9" />
                  <path d="M12 7v5l3 2" />
                </svg>
              }
            />
          </div>
        </div>

        {/* Bottom section */}
        <div className="relative z-10">
          <LogoutIcon
            label="Logout"
            hoverBg="hover:bg-red-600/40"
            hoverText="group-hover:text-red-400"
            icon={
              <svg
                className="w-6 h-6 text-red-400 transition-colors duration-300"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M16 17V14H9V10H16V7L21 12L16 17M14 2C15.11 2 16 2.9 16 4V6H14V4H5V20H14V18H16V20C16 21.11 15.11 22 14 22H5C3.9 22 3 21.11 3 20V4C3 2.9 3.9 2 5 2H14Z" />
              </svg>
            }
          />
        </div>
      </div>
    </>
  );
};

export default OrganizerSidebar;