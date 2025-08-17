const problemData = [ 
  { 
    value: "40.12%", 
    title: "of Indonesia's waste remains unmanaged despite national programs",
  }, 
  { 
    value: "3.2 million", 
    title: "tons of plastic waste leak into Indonesia's marine environments annually",
  }, 
  { 
    value: "90%", 
    title: "of Indonesia's waste processing capacity remains untapped",
  }, 
]; 
 
const ProblemSection = () => {
  return (
    <div className="bg-white py-12 px-4 mb-10 sm:mb-25">
      <h2 className="text-5xl font-bold text-[#6D9D58] text-center mb-15 sm:mb-10">
        Problems
      </h2>

      <div className="relative flex flex-col sm:flex-row sm:justify-center sm:items-start gap-16 sm:gap-24 overflow-hidden py-8 sm:py-16">

        {/* desktop lines */}
        <div className="hidden sm:block absolute top-2/5 md:-translate-y-7 lg:-translate-y-2 left-0 w-full h-[2px] bg-[#6D9D58] z-0" />

        {problemData.map((item, index) => (
          <div
            key={index}
            className="relative z-10 flex items-center sm:flex-col sm:items-center gap-x-6 sm:gap-6 w-full sm:w-auto px-4 sm:px-0"
          >
            <div className="relative flex items-center justify-center min-w-[85px] min-h-[85px] sm:min-w-[128px] sm:min-h-[128px] ml-2">
              <div className="absolute w-full h-full rounded-full bg-[#6D9D58] opacity-20"
                  style={{ animation: 'pulseInner 3s ease-in-out infinite' }}></div>
              <div className="absolute w-full h-full rounded-full bg-[#6D9D58] opacity-10"
                  style={{ animation: 'pulseOuter 3s ease-in-out infinite' }}></div>

              <style>
              {`
              @keyframes pulseInner {
                0%, 100% { transform: scale(1); opacity: 0.2; }
                50% { transform: scale(1.25); opacity: 0.3; }
              }
              @keyframes pulseOuter {
                0%, 100% { transform: scale(1.3); opacity: 0.1; }
                50% { transform: scale(1.55); opacity: 0.15; }
              }
              `}
              </style>

              <div className="relative w-20 h-20 sm:w-32 sm:h-32 bg-[#6D9D58] rounded-full flex items-center justify-center text-white font-bold text-sm sm:text-xl shadow-lg">
                {item.value}
              </div>
            </div>

            <div className="flex-1 sm:text-center max-w-[220px] sm:max-w-[320px] ml-4 sm:ml-0">
              <h3 className="text-sm sm:text-lg font-bold text-gray-800 leading-tight">
                <span className="text-[#6D9D58] text-base sm:text-2xl">{item.value}</span>{" "}
                {item.title}
              </h3>
            </div>
          </div>
        ))}

      </div>
    </div>
  );
};

 
export default ProblemSection;