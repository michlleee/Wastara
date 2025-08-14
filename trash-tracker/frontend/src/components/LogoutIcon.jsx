import { useNavigate } from "react-router-dom";

const LogoutIcon = ({
  icon,
  label,
  hoverBg,
  hoverText,
}) => {
    const navigate = useNavigate();

    return (
        <div className="group flex flex-col items-center cursor-pointer" onClick={()=>{navigate("/")}}>
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

export default LogoutIcon;
