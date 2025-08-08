import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import image from "../assets/bg_sampah5.jpg";

function LoginPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");
  const [role, setRole] = useState("user");

  function handleChange(event) {
    const { value, name } = event.target;
    setForm({
      ...form,
      [name]: value,
    });
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/api/signup/login",
        form,
        { withCredentials: true }
      );
      const { user } = response.data;

      // Role-based redirect
      console.log(user.role);

      if (user.role === "organizer") {
        navigate(`/dashboard/organizer/${user.id}`);
      } else {
        navigate(`/dashboard/${user.id}`);
      }
    } catch (err) {
      setMessage(err.response?.data?.message || "Something went wrong");
    }
  };

  const handleGoogleLogin = () => {
    window.location.href = `http://localhost:3000/auth/google`;
  };

  return (
    <>
      <div className="min-h-screen flex flex-col sm:flex-row">

        <div className="sm:w-1/2 w-full flex items-center justify-center p-6 sm:p-12 bg-gradient-to-t from-gray-400 via-white to-white">
          <div className="w-full max-w-md">
            <h1 className="text-2xl font-semibold text-gray-800 mb-6 text-center sm:text-left">
              Login to your account
            </h1>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  className="block text-sm font-medium text-gray-700 mb-1"
                  htmlFor="name"
                >
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Your name"
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>

              <div>
                <label
                  className="block text-sm font-medium text-gray-700 mb-1"
                  htmlFor="email"
                >
                  Email
                </label>
                <input
                  type="text"
                  name="email"
                  id="email"
                  placeholder="Your email"
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>

              <div>
                <label
                  className="block text-sm font-medium text-gray-700 mb-1"
                  htmlFor="password"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Password"
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-gray-500 text-white font-semibold py-2 rounded-md hover:bg-gray-600 transition"
              >
                Login
              </button>
              <p className="mt-4 text-center text-sm text-gray-600">{message}</p>

              <p className="mt-4 text-center text-sm text-gray-600">
                No account?{" "}
                <span
                  onClick={() =>
                    navigate(role === "user" ? "/signup/user" : "/signup/organizer")
                  }
                  className={`hover:underline cursor-pointer font-medium transition-colors duration-300 ${
                    role === "user" ? "text-blue-500" : "text-green-500"
                  }`}
                >
                  Sign up as {role === "user" ? "User" : "Organizer"}
                </span>
              </p>
              
              <div className="flex items-center justify-center gap-4">
                <div className="flex bg-gray-200 rounded-full p-1 relative w-48">
                  {/* Sliding indicator */}
                  <div
                    className={`absolute top-1 bottom-1 w-1/2 rounded-full transition-all duration-300 
                      ${role === "user" ? "bg-blue-500 left-1" : "bg-green-500 left-[calc(50%-0.125rem)]"}`}
                  ></div>

                  {/* User button */}
                  <button
                    type="button"
                    onClick={() => setRole("user")}
                    className={`flex-1 text-center z-10 font-medium transition-colors duration-300 ${
                      role === "user" ? "text-white" : "text-gray-600"
                    }`}
                  >
                    User
                  </button>

                  {/* Organizer button */}
                  <button
                    type="button"
                    onClick={() => setRole("organizer")}
                    className={`flex-1 text-center z-10 font-medium transition-colors duration-300 ${
                      role === "organizer" ? "text-white" : "text-gray-600"
                    }`}
                  >
                    Organizer
                  </button>
                </div>
              </div>
            </form>

            <div className="my-4 flex items-center">
              <div className="flex-grow h-px bg-gray-400"></div>
              <span className="mx-3 text-sm text-gray-500">or</span>
              <div className="flex-grow h-px bg-gray-400"></div>
            </div>

            <button
              onClick={handleGoogleLogin}
              className="w-full flex items-center justify-center bg-red-500 hover:bg-red-600 text-white font-semibold py-2 rounded-md transition"
            >
              <img
                src="https://www.svgrepo.com/show/475656/google-color.svg"
                alt="Google"
                className="w-5 h-5 mr-2"
              />
              Login with Google
            </button>

            <p className="mt-4 text-center text-sm text-gray-600">{message}</p>
          </div>
        </div>

        <div className="sm:w-1/2 w-full h-64 sm:h-auto relative flex items-center justify-center bg-black text-white">
          <img
            src={image}
            alt="Visual"
            className="object-cover w-full h-full absolute inset-0"
          />
          <div className="z-10 text-center p-6 sm:p-12">
            <h2 className="text-3xl font-bold">Welcome Back</h2>
            <p className="mt-2">Let's make our community cleaner together.</p>
          </div>
          <div className="absolute inset-0 bg-black opacity-75"></div>
        </div>
      </div>
    </>
  );
}

export default LoginPage;
