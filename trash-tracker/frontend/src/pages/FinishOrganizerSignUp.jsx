import { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import image from "../assets/bg_sampah6.jpg"; 

function FinishOrganizerSignUp() {
  const navigate = useNavigate();
  const { mongoId } = useParams();
  console.log(mongoId);

  const [form, setForm] = useState({
    whatsappNumber: "",
    organizationName: "",
    ktpImage: null,
  });

  const [previewUrl, setPreviewUrl] = useState(null);
  const [message, setMessage] = useState("");

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
      formData.append("organizationName", form.organizationName);
      formData.append("whatsappNumber", form.whatsappNumber);
      if (form.ktpImage) {
        formData.append("ktpImage", form.ktpImage);
      }

      const res = await axios.patch(`/api/signup/organizer`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });

      const data = res.data;

      if (data.message === "Success") {
        setTimeout(() => {
          navigate(`/dashboard/organizer/`);
        }, 0);
      }

      setMessage(res.data.message);
    } catch (err) {
      setMessage(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="min-h-[100dvh] flex flex-col sm:flex-row">
      <div className="w-full sm:w-1/2 h-48 sm:h-auto relative flex items-center justify-center bg-black text-white">
        <img
          src={image}
          alt="Visual"
          className="object-cover w-full h-full absolute inset-0"
        />
        <div className="z-10 text-center p-6 sm:p-12">
          <h2 className="text-3xl font-bold">Complete Your Organizer Profile</h2>
          <p className="mt-2">Help us verify your account to start organizing pickups.</p>
        </div>
        <div className="absolute inset-0 bg-black opacity-70" />
      </div>
      
      <div className="w-full sm:w-1/2 flex items-center justify-center p-6 sm:p-12 bg-gradient-to-t from-[#99c994ff] via-white to-white min-h-[calc(100dvh-12rem)] sm:min-h-[100dvh]">
        <div className="w-full max-w-md">
          {message && <p className="text-red-500 mb-4">{message}</p>}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Organization Name
              </label>
              <input
                name="organizationName"
                value={form.organizationName}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                WhatsApp Number
              </label>
              <input
                name="whatsappNumber"
                value={form.whatsappNumber}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
                required
              />
            </div>

            <div>
              <label htmlFor="ktpImage" className="block text-sm font-medium text-gray-700 mb-1">
                Upload KTP
              </label>

              <div className="flex items-center space-x-3">
                <label
                  htmlFor="ktpImage"
                  className="inline-block cursor-pointer border border-gray-300 rounded-md px-4 py-2 text-sm text-gray-700 hover:bg-green-300 transition"
                >
                  Choose Image
                </label>
                <span className="text-sm text-gray-600">
                  {form.ktpImage?.name || "No file chosen"}
                </span>
              </div>

              <input
                type="file"
                name="ktpImage"
                id="ktpImage"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
                required
              />

              {previewUrl && (
                <div className="mt-4 border border-gray-300 rounded-md p-3">
                  <p className="text-sm text-gray-600 mb-1">Preview:</p>
                  <img
                    src={previewUrl}
                    alt="KTP Preview"
                    className="rounded shadow max-w-[300px] max-h-[200px] object-contain"
                  />
                </div>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-green-600 text-white font-semibold py-2 rounded-md hover:bg-green-700 transition"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default FinishOrganizerSignUp;