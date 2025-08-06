const problemData = [
  {
    value: "50%",
    description: "Of citizens reported unmanaged trash in their area.",
  },
  {
    value: "5 mil",
    description: "Tons of unmanaged waste generated every year.",
  },
  {
    value: "25%",
    description: "Of complaints never reach authorities on time.",
  },
];

const BackgroundSection = () => {
  return (
    <div className="bg-white h-150 py-20 px-4">
      <h2 className="text-4xl font-bold text-[#6D9D58] text-center mb-10 sm:mb-20">
        Problems
      </h2>

      {/* Desktop: horizontal | Mobile: vertical */}
      <div className="relative flex flex-col sm:flex-row sm:justify-center sm:items-center gap-12 sm:gap-16">
        {/* Horizontal line for desktop */}
        <div className="hidden sm:block absolute top-[85px] left-0 w-full h-[2px] bg-[#6D9D58] z-0" />

        {/* Vertical line for mobile */}
        <div className="sm:hidden absolute left-[35px] top-0 h-full w-[2px] bg-[#6D9D58] z-0" />

        {problemData.map((item, index) => (
          <div
            key={index}
            className="relative z-10 flex sm:flex-col items-center sm:items-center gap-4 sm:gap-4"
          >
            {/* Circle */}
            <div className="w-20 h-20 sm:w-40 sm:h-40 bg-[#6D9D58] rounded-full flex items-center justify-center text-white font-bold text-lg sm:text-xl shrink-0">
              {item.value}
            </div>

            {/* Description */}
            <p className="text-sm text-gray-700 text-left sm:text-center w-[300px]">
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BackgroundSection;
