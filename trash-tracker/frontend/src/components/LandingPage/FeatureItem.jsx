export default function FeatureItem({ imageOnLeft, text, imageSrc, featureName, number }) {
  return (
    <div className="group w-full flex flex-col md:flex-row items-center gap-3 sm:gap-4 md:gap-8 lg:gap-16 mb-12 sm:mb-16 md:mb-20 lg:mb-24 transition-all duration-500 hover:scale-[1.01] md:hover:scale-[1.02]">
      {imageOnLeft && (
        <div className="relative overflow-hidden rounded-xl md:rounded-2xl shadow-lg md:shadow-xl transition-all duration-500 group-hover:shadow-xl md:group-hover:shadow-2xl group-hover:-translate-y-1 md:group-hover:-translate-y-2 flex-shrink-0 w-full sm:w-80 md:w-96">
          <img
            src={imageSrc}
            alt="feature"
            className="w-full h-48 sm:h-56 md:h-64 lg:h-72 object-cover transition-transform duration-700 group-hover:scale-105 md:group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
      )}

      <div className="relative bg-white text-black rounded-xl md:rounded-2xl p-4 sm:p-6 md:p-8 w-full md:flex-1 min-h-64 sm:min-h-72 md:h-80 shadow-lg md:shadow-xl border border-gray-100 flex flex-col items-center text-center transition-all duration-500 group-hover:shadow-xl md:group-hover:shadow-2xl group-hover:-translate-y-1 md:group-hover:-translate-y-2 backdrop-blur-sm">

        <div className="relative z-10 w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 bg-[#88A47C] rounded-xl md:rounded-2xl mb-3 sm:mb-4 flex items-center justify-center text-lg sm:text-xl font-bold text-[#3f5835] shadow-md md:shadow-lg transition-all duration-300 group-hover:scale-105 md:group-hover:scale-110 group-hover:rotate-2 md:group-hover:rotate-3 group-hover:shadow-lg md:group-hover:shadow-xl">
          <span className="relative z-10">{number}</span>
          <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-xl md:rounded-2xl" />
        </div>

        <h2 className="relative z-10 text-lg sm:text-xl md:text-2xl font-bold mb-2 sm:mb-3 md:mb-4 bg-clip-text transition-all duration-300 group-hover:scale-105 px-2 text-[#3f5835]">
          {featureName}
        </h2>

        <p className="relative z-10 text-sm sm:text-base leading-relaxed text-gray-700 px-2 sm:px-3 md:px-4 transition-all duration-300 group-hover:text-gray-900">
          {text}
        </p>

      </div>

      {!imageOnLeft && (
        <div className="relative overflow-hidden rounded-xl md:rounded-2xl shadow-lg md:shadow-xl transition-all duration-500 group-hover:shadow-xl md:group-hover:shadow-2xl group-hover:-translate-y-1 md:group-hover:-translate-y-2 flex-shrink-0 w-full sm:w-80 md:w-96">
          <img
            src={imageSrc}
            alt="feature"
            className="w-full h-48 sm:h-56 md:h-64 lg:h-72 object-cover transition-transform duration-700 group-hover:scale-105 md:group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
      )}
    </div>
  )
}
