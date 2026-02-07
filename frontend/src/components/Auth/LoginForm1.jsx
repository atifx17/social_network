import { useState } from "react";
import api from "../../services/api";
import { useNavigate, Link } from "react-router-dom";

export default function LoginForm1() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const res = await api.post("/accounts/login/", form);

      // Save JWT tokens
      localStorage.setItem("access", res.data.access);
      localStorage.setItem("refresh", res.data.refresh);

      setMessage("Login successful!");

      // Redirect to profile page
      navigate("/profile", { replace: true });

    } catch (err) {
      setMessage("Invalid email or password");
    }
  };

  return (
    <form onSubmit={handleLogin} className="space-y-4">

      {/* Email */}
      <div>
        <label className="block font-medium">Email</label>
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          className="w-full border rounded-lg px-3 py-2"
        />
      </div>

      {/* Password */}
      <div>
        <label className="block font-medium">Password</label>
        <input
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          className="w-full border rounded-lg px-3 py-2"
        />
      </div>

      {message && (
        <p className="text-center text-red-500">{message}</p>
      )}

      {/* Login button */}
      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
      >
        Login
      </button>

      {/* ➤ New Line Added Here */}
      <p className="text-center text-blue-600 mt-2">
        Don't have an account?{" "}
        <Link to="/signup" className="font-semibold underline">
          Create Account
        </Link>
      </p>
    </form>
  );
}
