const ReportNowCard = () => {
  return (
    <div className="bg-white p-6 rounded-lg flex flex-col items-center justify-center text-center h-full">
      
      <h3 className="sm:text-3xl font-bold mb-4 text-gray-800">Report Now!</h3>

      <button className="bg-[#93B088] text-white px-6 py-3 rounded-xl font-medium mb-6 hover:bg-[#7a9671] transition-colors">
        Add Trash Pickup Location
      </button>

      <div className="w-32 h-32 bg-[#C6D6B8]  flex items-center justify-center">
        <svg className="w-8 h-8 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
          <path d="M19 13H13V19H11V13H5V11H11V5H13V11H19V13Z"/>
        </svg>
      </div>

    </div>
  );
};

export default ReportNowCard;