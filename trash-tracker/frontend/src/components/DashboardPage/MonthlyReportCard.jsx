const MonthlyReportCard = () => {
  return (
    <div className="bg-white p-6 h-fill">
      <h3 className="text-xl font-bold mb-4 text-gray-800">Monthly Trash Report</h3>
      <div className="flex items-end justify-around h-32 mb-3">
        {[20, 20, 24, 20, 28].map((height, index) => (
          <div key={index} className="flex flex-col items-center">
            <div className={`w-8 bg-[#445D48] rounded-t-md`} style={{ height }}></div>
          </div>
        ))}
      </div>
      <div className="flex justify-around text-xs text-gray-600">
        {['Jan', 'Feb', 'Mar', 'Apr', 'May'].map((month) => (
          <span key={month}>{month}</span>
        ))}
      </div>
    </div>
  );
};

export default MonthlyReportCard;
