const PickupRequestCard = ({
  trashDescription,
  placeDescription,
  status,
  index,
  date,
  showButton,
  onCancel,
}) => {
  const statusColors = {
    pending: "bg-yellow-100 text-yellow-800",
    "in-progress": "bg-blue-100 text-blue-800",
    completed: "bg-green-100 text-green-800",
    cancelled: "bg-red-100 text-red-800",
  };
  return (
    <div className="bg-[#C6D6B8] shadow-sm border border-gray-200 p-4 rounded-xl flex flex-col hover:shadow-md transition-all">
      <div className="flex justify-between items-center mb-2">
        <p className="font-semibold text-gray-900">
          Pickup Request #{index + 1}
        </p>
        <span
          className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${
            statusColors[status] || "bg-gray-100 text-gray-700"
          }`}
        >
          {status}
        </span>
      </div>

      {date && (
        <p className="text-xs text-gray-700 mb-2">Requested on {date}</p>
      )}

      <div className="mb-2 p-3 rounded-lg bg-white/70 border border-gray-200 shadow-sm">
        <p className="font-semibold text-gray-900 mb-1 tracking-wide uppercase text-xs">
          Trash Description
        </p>
        <p className="text-gray-700 text-sm leading-relaxed">
          {trashDescription || "No description provided."}
        </p>
      </div>

      <div className="mb-4 p-3 rounded-lg bg-white/70 border border-gray-200 shadow-sm">
        <p className="font-semibold text-gray-900 mb-1 tracking-wide uppercase text-xs">
          Location Description
        </p>
        <p className="text-gray-700 text-sm leading-relaxed">
          {placeDescription || "No location description provided."}
        </p>
      </div>

      {showButton && (
        <button
          onClick={onCancel}
          className="
            bg-amber-100
            border
            border-amber-400
            text-amber-600
            px-4 py-2
            rounded-lg
            text-sm font-medium
            hover:bg-amber-200
            hover:border-amber-500
            hover:text-amber-700
            transition-colors
            shadow-sm
            focus:outline-none
            focus:ring-2
            focus:ring-amber-300
            focus:ring-opacity-50
            mt-4
            self-start
          "
        >
          Cancel
        </button>
      )}
    </div>
  );
};

export default PickupRequestCard;
