import { useState } from "react"

const RegisterDropdown = () => {
  const [isOpen, setIsOpen] = useState(false)

  const toggleDropdown = () => {
    setIsOpen(!isOpen)
  }

  return (
    <div className="relative w-full">
      <button
        onClick={toggleDropdown}
        className="w-full bg-gradient-to-r from-[#6D9D58] to-[#5a8049] hover:from-[#5a8049] hover:to-[#4a6b3a] text-white font-bold py-5 px-6 rounded-2xl transition-all duration-300 transform hover:scale-[1.02] hover:shadow-2xl focus:outline-none focus:ring-4 focus:ring-[#6D9D58]/30 shadow-lg"
      >
        <span className="flex items-center justify-center space-x-3">
          <span className="text-lg tracking-wide">SIGN UP NOW</span>
          <svg
            className={`w-5 h-5 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
          </svg>
        </span>
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-3 bg-white/90 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-200/30 overflow-hidden z-10 animate-in slide-in-from-top-2 duration-300">
          <div className="py-2 md:py-3">
            <button
              className="w-full block px-4 py-3 md:px-6 md:py-4 text-gray-800 hover:bg-green-50 hover:text-green-800 transition-all duration-300 font-medium group"
              onClick={() => {
                setIsOpen(false)
                window.location.href = "/signup/user"
              }}
            >
              <div className="flex items-center space-x-3 md:space-x-4">
                <div className="w-8 h-8 md:w-10 md:h-10 bg-gray-100 group-hover:bg-green-100 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110">
                  <svg
                    className="w-4 h-4 md:w-5 md:h-5 text-gray-600 group-hover:text-green-600 transition-colors duration-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </div>
                <div className="text-left">
                  <div className="font-bold text-base md:text-lg group-hover:text-green-800 transition-colors duration-300">
                    As User
                  </div>
                  <div className="text-xs md:text-sm text-gray-500 group-hover:text-green-600 transition-colors duration-300">
                    Report trash bins in your area
                  </div>
                </div>
                <div className="ml-auto">
                  <div className="w-2 h-2 bg-green-500 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:scale-150"></div>
                </div>
              </div>
            </button>

            <button
              className="w-full block px-4 py-3 md:px-6 md:py-4 text-gray-800 hover:bg-orange-50 hover:text-orange-800 transition-all duration-300 font-medium group"
              onClick={() => {
                setIsOpen(false)
                window.location.href = "/signup/organizer"
              }}
            >
              <div className="flex items-center space-x-3 md:space-x-4">
                <div className="w-8 h-8 md:w-10 md:h-10 bg-gray-100 group-hover:bg-orange-100 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110">
                  <svg
                    className="w-4 h-4 md:w-5 md:h-5 text-gray-600 group-hover:text-orange-600 transition-colors duration-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-4m-5 0H3m2 0h4M9 7h6m-6 4h6m-6 4h6"
                    />
                  </svg>
                </div>
                <div className="text-left">
                  <div className="font-bold text-base md:text-lg group-hover:text-orange-800 transition-colors duration-300">
                    As Organizer
                  </div>
                  <div className="text-xs md:text-sm text-gray-500 group-hover:text-orange-600 transition-colors duration-300">
                    Manage and respond to reports
                  </div>
                </div>
                <div className="ml-auto">
                  <div className="w-2 h-2 bg-orange-500 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:scale-150"></div>
                </div>
              </div>
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default RegisterDropdown