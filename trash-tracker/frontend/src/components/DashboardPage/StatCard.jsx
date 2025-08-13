"use client"

const StatCard = ({ title, value, unit, icon = null, bgColor = null }) => {
  // Define contextually appropriate icons based on title
  const getContextualIcon = () => {
    if (icon) return icon

    const titleLower = title.toLowerCase()

    if (titleLower.includes("total") || titleLower.includes("reported")) {
      return (
        <svg className="w-5 h-5 text-orange-600" fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
            clipRule="evenodd"
          />
        </svg>
      )
    }

    if (titleLower.includes("month") || titleLower.includes("this month")) {
      return (
        <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
            clipRule="evenodd"
          />
        </svg>
      )
    }

    if (titleLower.includes("pickup") || titleLower.includes("completed")) {
      return (
        <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
            clipRule="evenodd"
          />
        </svg>
      )
    }

    // Default icon
    return (
      <svg className="w-5 h-5 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
        <path
          fillRule="evenodd"
          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
          clipRule="evenodd"
        />
      </svg>
    )
  }

  return (
    <div
      className="bg-gradient-to-br from-white to-gray-50 p-6 rounded-xl text-center shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 relative overflow-hidden group hover:scale-[1.02] min-h-[140px] flex flex-col justify-center"
      style={bgColor ? { background: `linear-gradient(135deg, ${bgColor}, ${bgColor}dd)` } : {}}
    >
      <div className="absolute top-3 right-4 w-2 h-2 bg-green-200 rounded-full opacity-30 animate-pulse"></div>
      <div
        className="absolute bottom-4 left-3 w-1.5 h-1.5 bg-blue-200 rounded-full opacity-25 animate-bounce"
        style={{ animationDelay: "1s" }}
      ></div>
      <div className="absolute top-6 left-6 opacity-15 animate-pulse" style={{ animationDelay: "2s" }}>
        <svg className="w-3 h-3 text-emerald-300" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      </div>

      <p className="text-sm sm:text-base font-semibold text-gray-700 mb-3 leading-tight px-2">{title}</p>

      <div className="mb-4">
        <p className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-800 leading-none">{value}</p>
        <span className="text-sm sm:text-base font-medium text-gray-600 mt-1 block">{unit}</span>
      </div>

      <div className="absolute bottom-4 right-4 group-hover:scale-110 transition-transform duration-300">
        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center shadow-md group-hover:shadow-lg transition-all duration-300 border border-gray-200">
          {getContextualIcon()}
        </div>
      </div>

      <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>
    </div>
  )
}

export default StatCard
