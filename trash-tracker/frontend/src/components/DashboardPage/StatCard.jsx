const StatCard = ({ title, value, unit, icon = null, bgColor = null }) => {
  return (
    <div
      className="bg-gradient-to-br from-white to-gray-50 p-6 rounded-xl text-center shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 relative overflow-hidden group hover:scale-[1.02] min-h-[140px] flex flex-col justify-center"
      style={
        bgColor
          ? { background: `linear-gradient(135deg, ${bgColor}, ${bgColor}dd)` }
          : {}
      }
    >
      <p className="text-sm sm:text-base font-semibold text-gray-700 mb-3 leading-tight px-2">
        {title}
      </p>

      <div className="mb-4">
        <p className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-800 leading-none">
          {value}
        </p>
        <span className="text-sm sm:text-base font-medium text-gray-600 mt-1 block">
          {unit}
        </span>
      </div>

      <div className="absolute bottom-4 right-4 group-hover:scale-110 group-hover:rotate-10 transition-transform duration-300">
        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center shadow-md group-hover:shadow-lg transition-all duration-300 border border-gray-200">
          {icon}
        </div>
      </div>

      <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-emerald-500/5 opacity-0 transition-opacity duration-300 rounded-xl"></div>
    </div>
  );
};

export default StatCard;
