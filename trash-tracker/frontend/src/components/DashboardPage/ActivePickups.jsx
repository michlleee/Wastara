import PickupRequestCard from "./PickupRequestCard";

const ActivePickups = () => {
  const pickups = [
    { title: "Pickup Request 1", date: "8 April 2026", showButton: true },
    { title: "Pickup Request 3", date: "9 April 2026", showButton: true },
    { title: "Pickup Request 4", date: "10 April 2026", showButton: true },
    { title: "Pickup Request 5", date: "11 April 2026", showButton: false },
  ];

  return (
    <div className="bg-white p-6 rounded-lg border-2 border-black-200 h-[360px] flex flex-col">
      <h3 className="sm:text-3xl font-bold mb-4 text-gray-800">Active Pickups</h3>

      <div className="space-y-3 overflow-y-auto pr-1" style={{ maxHeight: "calc(100% - 3rem)" }}>
        {pickups.map((pickup, index) => (
          <PickupRequestCard
            key={index}
            title={pickup.title}
            date={pickup.date}
            showButton={pickup.showButton}
          />
        ))}
      </div>
    </div>
  );
};

export default ActivePickups;
