const SidebarIcon = ({
  icon,
  label,
  hoverBg = "hover:bg-gray-800/50",
  hoverText = "group-hover:text-gray-300",
}) => {
  return (
    <div className="group flex flex-col items-center cursor-pointer">
      <div
        className={`w-10 h-10 flex items-center justify-center rounded-lg transition-all duration-300 ${hoverBg} hover:scale-110`}
      >
        <div className="transition-colors duration-300 group-hover:scale-110">
          {icon}
        </div>
      </div>

      <span
        className={`text-xs text-white ${hoverText} transition-colors duration-300 mt-1`}
      >
        {label}
      </span>
    </div>
  );
};

export default SidebarIcon;
