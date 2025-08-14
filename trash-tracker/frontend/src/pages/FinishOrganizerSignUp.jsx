import { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

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
    <div className="max-w-xl mx-auto p-6 bg-white shadow-md rounded-md mt-6">
      <h2 className="text-2xl font-bold mb-4">
        Complete Your Organizer Profile
      </h2>
      {message && <p className="text-red-500 mb-4">{message}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium mb-1">Organization Name</label>
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
            name="whatsappNumber"
            value={form.whatsappNumber}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            required
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Upload KTP</label>
          <input
            type="file"
            name="ktpImage"
            accept="image/*"
            onChange={handleFileChange}
            className="w-full"
            required
          />
          {previewUrl && (
            <div className="mt-2">
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
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default FinishOrganizerSignUp;
