const SidebarIcon = ({label, icon}) => {
  return (
    <div className="flex flex-col items-center">
      <div className="w-10 h-10 flex items-center justify-center">
        {icon}
      </div>
      <span className="text-xs text-white">{label}</span>
    </div>
  );
}

export default SidebarIcon;