import { useState } from "react";
import axios from "axios";
import image from "../assets/bg_sampah3.jpg";
import { useNavigate } from "react-router-dom";

function UserSignUp() {
  const navigate = useNavigate();
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");

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
      const result = await axios.post(`${BACKEND_URL}/api/signup/users`, form, {
        withCredentials: true,
      });
      const data = result.data;
      //console.log(data.message);
      if (data.message === "Success") {
        setTimeout(() => {
          navigate(`/dashboard/user`);
        }, 0);
      }
    } catch (error) {
      setMessage(error.response?.data?.message || "Error occured");
    }
  };

  // const handleGoogleSignup = () => {
  //   window.location.href = `${BACKEND_URL}/auth/google?intent=user`;
  // };

  const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;

  // Use your deployed frontend callback path
  // (must match the one you added in Google Cloud console)
  const FRONTEND_CALLBACK = "https://wastara-frontend.vercel.app/auth/google/callback";

  // Optional: carry intent so backend knows if it's user or organizer
  const OAUTH_STATE = "user";

  const handleGoogleSignup = () => {
    const params = new URLSearchParams({
      client_id: GOOGLE_CLIENT_ID,
      redirect_uri: FRONTEND_CALLBACK,
      response_type: "code",
      scope: "openid email profile",
      include_granted_scopes: "true",
      access_type: "offline", // optional: get refresh token
      prompt: "consent",      // optional: force consent each time
      state: OAUTH_STATE,
    });

    window.location.assign(
      `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`
    );
  };

  return (
    <>
      <div className="min-h-screen flex flex-col sm:flex-row">
        <div className="sm:w-1/2 w-full h-64 sm:h-auto relative flex items-center justify-center bg-black text-white">
          <img
            src={image}
            alt="Visual"
            className="object-cover w-full h-full absolute inset-0"
          />
          <div className="z-10 text-center p-6 sm:p-12">
            <h2 className="text-3xl font-bold">Create your free account</h2>
            <p className="mt-2">Clean communities start with your report.</p>
          </div>
          <div className="absolute inset-0 bg-black opacity-75"></div>
        </div>

        <div className="bg-white sm:bg-gradient-to-t from-blue-200 via-white to-white">
          <button
            onClick={() => navigate("/")}
            className="relative top-4 left-4 z-10 w-10 h-10 flex items-center justify-center hover:scale-130 transition-transform duration-300"
            aria-label="Back to Home"
          >
            <svg
              className="w-6 h-6 text-black"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
        </div>
        <div className="sm:w-1/2 w-full flex items-center justify-center p-6 sm:p-12 bg-gradient-to-t from-blue-200 via-white to-white">
          <div className="w-full max-w-md">
            <h1 className="text-2xl font-semibold text-gray-800 mb-6 text-center sm:text-left">
              Sign Up as User
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
                  required
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
                  required
                  type="email"
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
                  required
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
                className="w-full bg-blue-500 text-white font-semibold py-2 rounded-md hover:bg-blue-600 transition"
              >
                Sign Up
              </button>
              <p className="mt-3 text-start text-sm text-gray-600">
                Already have an account?{" "}
                <button
                  type="button"
                  onClick={() => navigate("/login")}
                  className="text-blue-500 hover:underline font-medium"
                >
                  Log in
                </button>
              </p>
            </form>

            <div className="my-4 flex items-center">
              <div className="flex-grow h-px bg-gray-300"></div>
              <span className="mx-3 text-sm text-gray-500">or</span>
              <div className="flex-grow h-px bg-gray-300"></div>
            </div>

            <button
              onClick={handleGoogleSignup}
              className="w-full flex items-center justify-center bg-red-500 hover:bg-red-600 text-white font-semibold py-2 rounded-md transition"
            >
              <img
                src="https://www.svgrepo.com/show/475656/google-color.svg"
                alt="Google"
                className="w-5 h-5 mr-2"
              />
              Sign Up with Google
            </button>

            <p className="mt-4 text-center text-sm text-gray-600">{message}</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default UserSignUp;