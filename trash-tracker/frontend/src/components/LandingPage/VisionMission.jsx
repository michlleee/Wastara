import { useState } from "react"
import cityIcon from "../../assets/city-svgrepo-com.svg"
import trashIcon from "../../assets/trash-alt-svgrepo-com.svg"

const VisionMission = () => {
  const [activeCard, setActiveCard] = useState(null)

  return (
    <div className="w-full pt-12 sm:pt-16 lg:pt-20 bg-[#141414] text-white relative overflow-hidden">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-transparent bg-gradient-to-r from-[#88A47C] to-[#a8c49c] bg-clip-text mb-4 animate-fade-in">
            Vision & Mission
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[#88A47C] to-[#a8c49c] mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 items-start">
          <div
            className={`group bg-gradient-to-br from-white to-gray-50 text-black rounded-2xl p-6 sm:p-8 lg:p-12 shadow-xl min-h-[280px] sm:min-h-[320px] 
                        h-full flex flex-col justify-start transition-all duration-500 transform cursor-pointer
                        ${activeCard === "vision"
                          ? "scale-105 shadow-2xl ring-4 ring-[#88A47C]/30"
                          : "hover:shadow-2xl hover:scale-[1.02]"}
                      `}
            onClick={() => setActiveCard(activeCard === "vision" ? null : "vision")}
            onMouseEnter={() => setActiveCard("vision")}
            onMouseLeave={() => setActiveCard(null)}
          >
            <div className="flex justify-center mb-6">
              <div className="relative">
                <div
                  className={`absolute inset-0 bg-[#88A47C]/20 rounded-full blur-xl transition-all duration-500
                              ${activeCard === "vision" ? "scale-150 opacity-100" : "scale-100 opacity-0"}`}
                />
                <img
                  src={cityIcon}
                  alt="city icon"
                  className={`w-16 h-16 sm:w-20 sm:h-20 relative z-10 transition-all duration-500
                              ${activeCard === "vision" ? "scale-110 -translate-y-2" : "group-hover:scale-105 group-hover:-translate-y-1"}`}
                />
              </div>
            </div>

            <div className="text-center mb-4">
              <h3 className="text-xl sm:text-2xl font-bold text-[#88A47C] mb-2">Our Vision</h3>
              <div className="w-12 h-0.5 bg-[#88A47C] mx-auto rounded-full"></div>
            </div>

            <p
              className={`text-sm sm:text-base text-gray-700 leading-relaxed tracking-wide text-justify transition-all duration-500
                          ${activeCard === "vision" ? "text-gray-800 scale-105" : ""}`}
            >
              Our vision is to build cleaner and more responsive urban environments by enabling real-time,
              community-driven waste reporting. This encourages public participation and improves waste management
              efficiency.
            </p>

            <div
              className={`mt-auto pt-6 flex justify-center transition-all duration-500
                          ${activeCard === "vision" ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"}`}
            >
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-[#88A47C] rounded-full animate-pulse"></div>
              </div>
            </div>
          </div>

          <div
            className={`group bg-gradient-to-br from-white to-gray-50 text-black rounded-2xl p-6 sm:p-8 lg:p-12 shadow-xl min-h-[280px] sm:min-h-[320px]
                        h-full flex flex-col justify-start transition-all duration-500 transform cursor-pointer
                        ${activeCard === "mission"
                          ? "scale-105 shadow-2xl ring-4 ring-[#88A47C]/30"
                          : "hover:shadow-2xl hover:scale-[1.02]"}
                      `}
            onClick={() => setActiveCard(activeCard === "mission" ? null : "mission")}
            onMouseEnter={() => setActiveCard("mission")}
            onMouseLeave={() => setActiveCard(null)}
          >
            <div className="flex justify-center mb-6">
              <div className="relative">
                <div
                  className={`absolute inset-0 bg-[#88A47C]/20 rounded-full blur-xl transition-all duration-500
                              ${activeCard === "mission" ? "scale-150 opacity-100" : "scale-100 opacity-0"}`}
                />
                <img
                  src={trashIcon}
                  alt="trash icon"
                  className={`w-16 h-16 sm:w-20 sm:h-20 relative z-10 transition-all duration-500
                              ${activeCard === "mission" ? "scale-110 -translate-y-2" : "group-hover:scale-105 group-hover:-translate-y-1"}`}
                />
              </div>
            </div>

            <div className="text-center mb-4">
              <h3 className="text-xl sm:text-2xl font-bold text-[#88A47C] mb-2">Our Mission</h3>
              <div className="w-12 h-0.5 bg-[#88A47C] mx-auto rounded-full"></div>
            </div>

            <p
              className={`text-sm sm:text-base text-gray-700 leading-relaxed tracking-wide text-justify transition-all duration-500
                          ${activeCard === "mission" ? "text-gray-800 scale-105" : ""}`}
            >
              We aim to empower citizens to take part in maintaining public cleanliness by streamlining communication
              between communities and waste management teams. Leveraging technology, we offer a fast, reliable, and
              scalable platform for reporting trash, while promoting sustainable practices through civic responsibility
              and environmental awareness.
            </p>

            <div
              className={`mt-auto pt-6 flex justify-center transition-all duration-500
                          ${activeCard === "mission" ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"}`}
            >
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-[#88A47C] rounded-full animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-center mt-12 sm:mt-16">
          <div className="w-32 h-1 bg-gradient-to-r from-transparent via-[#88A47C] to-transparent rounded-full opacity-50"></div>
        </div>
      </div>
    </div>
  )
}

export default VisionMission