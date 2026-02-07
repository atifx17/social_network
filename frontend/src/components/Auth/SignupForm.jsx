import { useState } from "react";
import Input from "../ui/Input";
import Button from "../ui/Button";
import api from "../../services/api";
import userImage from "../../assets/userImage.png";
import { useNavigate, Link } from "react-router-dom";



export default function SignupForm() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    full_name: "",
    email: "",
    password: "",
    date_of_birth: "",
  });

  const [profilePic, setProfilePic] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [age, setAge] = useState("");

  // Create preview URL
  const preview = profilePic ? URL.createObjectURL(profilePic) : userImage;

  const handleChange = (e) => {
  const { name, value } = e.target;

  setForm({ ...form, [name]: value });

  if (name === "date_of_birth") {
    setAge(calculateAge(value));
  }};


  const handleImage = (e) => {
    setProfilePic(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const formData = new FormData();
    formData.append("full_name", form.full_name);
    formData.append("email", form.email);
    formData.append("password", form.password);
    formData.append("date_of_birth", form.date_of_birth);
    if (profilePic) formData.append("profile_pic", profilePic);

    try {
      await api.post("/accounts/signup/", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setMessage("Signup successful!");
      setTimeout(() => navigate("/"), 1500);
    } catch (err) {
      setMessage("Signup failed. Check your details.");
    }

    setLoading(false);
  };

  const calculateAge = (dob) => {
  if (!dob) return "";

  const birthDate = new Date(dob);
  const today = new Date();

  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();

  if (
    monthDiff < 0 ||
    (monthDiff === 0 && today.getDate() < birthDate.getDate())
  ) {
    age--;
  }

  return age;
};

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-xl mx-auto bg-white p-8 shadow-xl rounded-2xl"
    >
      <h2 className="text-3xl font-bold mb-6 text-center">Join Social Network</h2>

      {/* Avatar Section */}
      <div className="flex flex-col items-center mb-4">
        <img
          src={preview}
          alt="Profile Preview"
          className="w-28 h-28 rounded-full object-cover border"
        />

        <label className="mt-3 cursor-pointer">
          <input
            type="file"
            className="hidden"
            accept="image/*"
            onChange={handleImage}
          />
          <span className="px-4 py-1 border rounded-lg text-blue-600 hover:bg-blue-50">
            Upload Profile Pic
          </span>
        </label>
      </div>

      <Input
        label="Full Name"
        name="full_name"
        value={form.full_name}
        onChange={handleChange}
      />

      <Input
        label="Date of Birth"
        type="date"
        name="date_of_birth"
        value={form.date_of_birth}
        onChange={handleChange}
      />
      <Input
        label="Age"
        type="number"
        value={age}
        readOnly
        className="bg-gray-100 cursor-not-allowed"
      />


      <Input
        label="Email Address"
        type="email"
        name="email"
        value={form.email}
        onChange={handleChange}
      />

      {/* Password fields in 2 columns */}
      <div className="grid grid-cols-2 gap-4">
        <Input
          label="Password"
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
        />

        <Input
          label="Re - Password"
          type="password"
          name="re_password"
          onChange={() => {}}
        />
      </div>

      <p className="text-gray-500 text-sm mb-4">
        Use A-Z, a-z, 0-9, !@/#$%^&* in password
      </p>

      {message && (
        <p className="text-center text-red-500 mb-3">{message}</p>
      )}
        <p className="text-center text-blue-600 mb-3">
          Already have an account?{" "}
          <Link to="/" className="font-semibold underline">
            Login Here
          </Link>
        </p>

      <Button type="submit" className="w-full py-3 text-lg rounded-xl">
        {loading ? "Creating..." : "Sign Up"}
      </Button>
    </form>
  );
}
