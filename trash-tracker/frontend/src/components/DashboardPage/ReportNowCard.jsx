import { useNavigate } from "react-router-dom";

const ReportNowCard = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-gradient-to-br p-6 rounded-xl flex flex-col items-center justify-center text-center h-full w-full relative overflow-hidden">
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
          navigate("/dashboard/user/report");
        }}
        className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-xl font-medium text-sm shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 active:scale-95 w-full max-w-xs"
      >
        <span className="flex items-center justify-center gap-2">
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 4v16m8-8H4"
            />
          </svg>
          Add Trash Pickup Location
        </span>
      </button>
    </div>
  );
};

export default ReportNowCard;
