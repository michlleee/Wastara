import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <div className="text-center">
        <h1 className="text-3xl sm:text-4xl font-semibold text-black mb-2">
          Welcome to <span className="inline-block underline underline-offset-4">our app</span>
        </h1>

        <div className="my-6">
          <Link
            to="/signup"
            className="inline-block border-4 border-blue-500 text-blue-700 font-bold text-lg px-8 py-3 rounded-lg hover:bg-blue-50 transition"
          >
            Start now
          </Link>
        </div>

        <p className="text-orange-500 text-sm">
          <Link to="/login" className="hover:underline">
            login if got acc
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LandingPage;
