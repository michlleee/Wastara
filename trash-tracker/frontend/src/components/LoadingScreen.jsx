import { useEffect, useState } from "react";
import wastaraLogo from "../assets/wastara_logo_small.svg";

const LoadingScreen = ({ loading }) => {
  const [visible, setVisible] = useState(true);
  const [canFade, setCanFade] = useState(false);

  useEffect(() => {
    const minTime = setTimeout(() => setCanFade(true), 1000);

    return () => clearTimeout(minTime);
  }, []);

  useEffect(() => {
    if (!loading && canFade) {
      const timeout = setTimeout(() => setVisible(false), 600);
      return () => clearTimeout(timeout);
    }
  }, [loading, canFade]);

  if (!visible) return null;

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center bg-[#233525] transition-opacity duration-500 z-50
      ${
        loading && !canFade
          ? "opacity-100"
          : loading && canFade
          ? "opacity-100"
          : "opacity-0"
      }`}
    >
      <img
        src={wastaraLogo}
        alt="Loading..."
        className="w-24 h-24 animate-spin-slow drop-shadow-lg"
      />

      <span className="absolute w-32 h-32 border-4 border-white rounded-full animate-ping opacity-50"></span>
    </div>
  );
};

export default LoadingScreen;
