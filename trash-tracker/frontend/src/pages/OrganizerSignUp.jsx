import { useState } from "react";
import axios from "axios";

function RegisterPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    nationalId: "",
    role: "organizer",
    ktpImage: null,
    phone: "",
    organizationName: "",
  });
  const [message, setMessage] = useState("");
  const [previewUrl, setPreviewUrl] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setForm({ ...form, ktpImage: file });
      setPreviewUrl(URL.createObjectURL(file));
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", form.name);
      formData.append("email", form.email);
      formData.append("password", form.password);
      formData.append("role", form.role);
      formData.append("nationalId", form.nationalId);
      formData.append("phone", form.phone);
      formData.append("organizationName", form.organizationName);
      if (form.ktpImage) {
        formData.append("ktpImage", form.ktpImage);
      }

      const result = await axios.post("/api/signup/organizer", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setMessage(result.data.message);
    } catch (error) {
      setMessage(error.response?.data?.message || "Error occurred");
    }
  };

  const handleGoogleSignup = () => {
    window.location.href = `http://localhost:3000/auth/google?intent=organizer`;
  };

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
        <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
          <h1 className="text-2xl font-semibold text-center text-gray-800 mb-6">
            Sign Up as Organizer
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

            <div>
              <label className="block font-medium mb-1">
                Organization Name
              </label>
              <input
                name="organizationName"
                value={form.organizationName}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded"
                required
              />
            </div>

            <div>
              <label className="block font-medium mb-1">WhatsApp Number</label>
              <input
                name="phone"
                value={form.phone}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded"
                required
              />
            </div>

            <div>
              <label
                htmlFor="ktpImage"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Upload KTP Image
              </label>
              <input
                type="file"
                name="ktpImage"
                id="ktpImage"
                accept="image/*"
                onChange={handleFileChange}
                className="w-full"
                required
              />

              {previewUrl && (
                <div className="mt-4">
                  <p className="text-sm text-gray-600 mb-1">Preview:</p>
                  <img
                    src={previewUrl}
                    alt="KTP Preview"
                    className="max-w-xs rounded shadow"
                  />
                </div>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-pink-500 text-white font-semibold py-2 rounded-md hover:bg-pink-600 transition"
            >
              Sign Up
            </button>
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
    </>
  );
}

export default RegisterPage;
