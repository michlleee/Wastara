const StatCard = ({ title, value, unit, icon = null }) => {
  return (
    <div className="bg-white p-8 rounded-lg text-center shadow-md/30 border-solid-gray outline-2 relative min-h-[120px] flex flex-col justify-center">
      <p className="text-base font-bold text-gray-600 mb-2">{title}</p>
      <p className="text-4xl font-bold text-gray-800 mb-2">
        {value} <span className="text-lg font-normal text-gray-600">{unit}</span>
      </p>
      {icon && (
        <div className="absolute bottom-6 right-6">
          <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
            {icon}
          </div>
        </div>
      )}
    </div>
  );
};

export default StatCard;
