import { Link } from "react-router-dom";
import RegisterDropdown from "./RegisterDropdown";
import logo from "../assets/WASTARA_black.svg";

const HeroSection = () => {
  return (
    <main className="flex-grow flex flex-col items-center justify-center text-center px-6 text-white max-w-md sm:max-w-xl mx-auto pb-10">
      <h2 className="text-5xl sm:text-6xl font-extrabold mb-4">
        <img src={logo} alt="Wastara Logo" className="h-30 w-auto" />
      </h2>
      <p className="max-w-xl mb-6 text-lg text-gray-300">
        Easily report full or neglected trash bins with GPS and photos. Help organizers respond quicker and keep your city clean — one report at a time.
      </p>
      <RegisterDropdown />
      <p className="mt-2 text-sm text-gray-400">
        Already have an account?{" "}
        <Link to="/login" className="underline text-[#6D9D58] hover:text-[#4d6f3e]">Login</Link>
      </p>
    </main>
  );
};

export default HeroSection;
