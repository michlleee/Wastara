const PickupRequestCard = ({ title, date }) => {
  return (
    <div className="bg-[#C6D6B8] p-4 rounded-xl flex items-center justify-between">
      <div>
        <p className="font-medium text-gray-800">{title}</p>
        {date && <p className="text-sm text-gray-600">{date}</p>}
      </div>
      <button className="bg-black text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors">
        cancel
      </button>
    </div>
  );
};

export default PickupRequestCard;
