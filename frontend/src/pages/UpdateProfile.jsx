import { useEffect, useState, useRef } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";
import userImage from "../assets/userImage.png";

export default function UpdateProfile() {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [form, setForm] = useState({
    email: "",
    full_name: "",
    date_of_birth: "",
  });

  const [profilePic, setProfilePic] = useState(null);
  const [preview, setPreview] = useState(null);
  const [existingImage, setExistingImage] = useState(null);

  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

    const loadProfile = async () => {
    try {
        const res = await api.get("/accounts/profile/");
        const data = res.data;

        setForm({
        email: data.email || "",
        full_name: data.full_name || "",
        date_of_birth: data.date_of_birth || ""
        });

        if (data.profile_pic) {
        const imgURL = `http://127.0.0.1:8000${data.profile_pic}`;
        setExistingImage(imgURL);
        setPreview(imgURL);
        } else {
        setPreview(userImage);
        }

    } catch (e) {
        console.log(e);
    }
    };


  useEffect(() => {
    loadProfile();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImage = (e) => {
    const file = e.target.files[0];
    setProfilePic(file);
    setPreview(URL.createObjectURL(file));
  };

  const cancelImage = () => {
    setProfilePic(null);
    setPreview(existingImage || userImage);

    // clear input field
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMsg("");

    const formData = new FormData();
    formData.append("full_name", form.full_name);
    formData.append("date_of_birth", form.date_of_birth);
    if (profilePic) formData.append("profile_pic", profilePic);

    try {
      await api.patch("/accounts/profile/", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setMsg("Profile updated successfully!");
      setTimeout(() => navigate("/profile"), 1200);
    } catch (err) {
      setMsg("Failed to update profile.");
    }

    setLoading(false);
  };

  return (
    <form
      onSubmit={handleUpdate}
      className="max-w-xl mx-auto bg-white mt-10 p-8 shadow-xl rounded-2xl"
    >
      <h2 className="text-3xl font-bold mb-6 text-center">Update Profile</h2>

      <div className="flex flex-col items-center mb-6">
        <img
          src={preview}
          className="w-28 h-28 rounded-full object-cover border"
          alt="Preview"
        />

        <label className="mt-3 cursor-pointer">
          <input
            ref={fileInputRef}
            type="file"
            className="hidden"
            accept="image/*"
            onChange={handleImage}
          />
          <span className="px-4 py-1 border rounded-lg text-blue-600 hover:bg-blue-50">
            Change Image
          </span>
        </label>

        {profilePic && (
          <button
            type="button"
            onClick={cancelImage}
            className="mt-2 px-3 py-1 rounded-lg bg-red-100 text-red-600 font-semibold hover:bg-red-200 transition"
          >
            Cancel
          </button>
        )}
      </div>

      {/* EMAIL (read only) */}
      <div className="mb-4">
        <label className="block font-medium">Email</label>
        <input
          type="email"
          value={form.email}
          readOnly
          className="w-full border bg-gray-100 rounded-lg px-3 py-2"
        />
      </div>

      {/* FULL NAME */}
      <div className="mb-4">
        <label className="block font-medium">Full Name</label>
        <input
          name="full_name"
          value={form.full_name}
          onChange={handleChange}
          className="w-full border rounded-lg px-3 py-2"
        />
      </div>

      {/* DOB */}
      <div className="mb-4">
        <label className="block font-medium">Date of Birth</label>
        <input
          type="date"
          name="date_of_birth"
          value={form.date_of_birth}
          onChange={handleChange}
          className="w-full border rounded-lg px-3 py-2"
        />
      </div>

      {msg && <p className="text-center text-green-600 mb-3">{msg}</p>}

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700"
      >
        {loading ? "Updating..." : "Update Profile"}
      </button>
    </form>
  );
}
