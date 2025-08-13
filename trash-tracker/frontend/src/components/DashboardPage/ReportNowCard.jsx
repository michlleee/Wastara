"use client"

import { useNavigate } from "react-router-dom"

const ReportNowCard = () => {
  const navigate = useNavigate()

  return (
    <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-xl flex flex-col items-center justify-center text-center h-full w-full shadow-lg hover:shadow-xl transition-all duration-300 border border-green-100 relative overflow-hidden">
      <div className="absolute top-4 right-6 w-2 h-2 bg-green-200 rounded-full opacity-40 animate-pulse"></div>
      <div
        className="absolute bottom-6 left-4 w-1.5 h-1.5 bg-emerald-200 rounded-full opacity-30 animate-bounce"
        style={{ animationDelay: "1s" }}
      ></div>
      <div className="absolute top-8 left-8 opacity-20 animate-pulse" style={{ animationDelay: "2s" }}>
        <svg className="w-3 h-3 text-green-300" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      </div>
      <div
        className="absolute bottom-4 right-8 w-1 h-1 bg-green-300 rounded-full opacity-25 animate-ping"
        style={{ animationDelay: "3s" }}
      ></div>

      <div className="mb-4">
        <h3 className="text-2xl font-bold text-gray-800 mb-2">Report Now!</h3>
        <p className="text-sm text-gray-600">Help keep our community clean</p>
      </div>

      <div className="relative mb-4 group">
        <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center shadow-md group-hover:shadow-lg transition-all duration-300 group-hover:scale-105 border border-green-200">
          <div className="relative z-10 w-10 h-10 flex items-center justify-center">
            <img
              src="/src/assets/wastara_logo_small.svg"
              alt="Wastara Mascot"
              className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300"
            />
          </div>
        </div>
      </div>

      <button
        onClick={() => {
          navigate("/dashboard/user/report")
        }}
        className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-xl font-medium text-sm shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 active:scale-95 w-full max-w-xs"
      >
        <span className="flex items-center justify-center gap-2">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Add Trash Pickup Location
        </span>
      </button>
    </div>
  )
}

export default ReportNowCard
