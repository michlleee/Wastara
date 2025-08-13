import { useEffect, useState } from "react";

const OrganizerProfileCard = ({ name }) => {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    setNow(new Date());

    const msUntilNextMinute = (60 - new Date().getSeconds()) * 1000;

    const timeout = setTimeout(() => {
      setNow(new Date());

      const interval = setInterval(() => {
        setNow(new Date());
      }, 60 * 1000);

      return () => clearInterval(interval);
    }, msUntilNextMinute);

    return () => clearTimeout(timeout);
  }, []);

  const dayName = now.toLocaleDateString("en-US", { weekday: "long" });
  const dateString = now.toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
  });
  const timeString = now.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  return (
    <div className="relative overflow-hidden rounded-lg shadow-lg/30 bg-white w-full mb-6">
        {/* Top Greeting Section */}
        <div className="relative bg-gradient-to-br from-[#b96c07] to-[#694413] text-white p-4">
            {/* Grid Overlay ONLY here */}
            <div className="absolute inset-0 opacity-60 z-0 pointer-events-none">
            <div
                className="w-full h-full"
                style={{
                backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                                    linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
                backgroundSize: "24px 24px",
                }}
            ></div>
            </div>

            <div className="relative flex justify-between items-end ml-2 z-10">
            <div>
                <h2 className="text-lg sm:text-3xl font-bold mb-1">Hello,</h2>
                <h2 className="text-lg sm:text-3xl font-bold mb-1">{name}!</h2>
            </div>
            <div className="text-right">
                <div className="flex justify-end mb-3">
                <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                >
                    <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.536L16.732 3.732z"
                    />
                </svg>
                </div>
                <p className="text-xs sm:text-base mb-2">
                {dayName}, {dateString}
                </p>
                <p className="text-sm sm:text-xl font-semibold">{timeString}</p>
            </div>
            </div>
        </div>

        {/* Banner */}
        <div className="bg-[#cf9f45] text-white px-8 py-3 text-base font-semibold">
            Report now or later ....
        </div>

        {/* Location Footer */}
        <div className="bg-white px-8 py-4 flex items-center text-black">
            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C8.13 2 5 5.13 5 9C5 14.25 12 22 12 22S19 14.25 19 9C19 5.13 15.87 2 12 2M12 11.5C10.62 11.5 9.5 10.38 9.5 9S10.62 6.5 12 6.5 14.5 7.62 14.5 9 13.38 11.5 12 11.5Z" />
            </svg>
            Tangerang, Banten
        </div>
        </div>
  );
};

export default OrganizerProfileCard;