const SidebarIcon = ({ label, icon }) => {
  return (
    <div className="group flex flex-col items-center cursor-pointer">
      <div className="w-10 h-10 flex items-center justify-center rounded-lg transition-all duration-300 hover:bg-gray-800/50 hover:scale-110">
        <div className="transition-colors duration-300 group-hover:scale-110">{icon}</div>
      </div>

      <span className="text-xs text-white group-hover:text-emerald-300 transition-colors duration-300 mt-1">
        {label}
      </span>
    </div>
  )
}

export default SidebarIcon
