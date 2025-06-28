import { useState } from "react";
import { FiUser, FiMail, FiLock, FiEye, FiEyeOff } from "react-icons/fi";
import { default as watch } from "../../assets/watchlogo.png";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/api/users/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: formData.username,
          email: formData.email,
          password: formData.password
        }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("Registration successful! Redirecting to login...");
        setFormData({ username: "", email: "", password: "", confirmPassword: "" });
        setTimeout(() => navigate("/login"), 2000);
      } else {
        setError(data.error || "Registration failed. Please try again.");
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row items-start justify-center bg-white font-[Poppins] px-4 md:px-6 pt-16 md:pt-20 gap-0">
      {/* Left Section */}
      <div className="w-full md:w-[45%] p-3 bg-gradient-to-br from-[#0569d7] to-[#022788] flex flex-col items-center justify-start rounded-2xl md:rounded-lg shadow-lg self-start">
        <h1 className="text-white text-4xl font-bold mb-4 self-start ml-4">
          Samaya<span className="text-orange-400">.</span>
        </h1>
        <img
          src={watch}
          alt="watch"
          className="max-w-xs w-full object-contain"
        />
      </div>

      {/* Right Section */}
      <div className="w-full md:w-[50%] p-3 md:pl-1 flex flex-col items-center justify-center self-start">
        <h2 className="text-3xl font-bold mb-2 text-gray-800 text-center">
          Create your account!
        </h2>
        <p className="text-gray-500 text-center mb-6">Sign Up to Get Started</p>

        {error && (
          <p className="text-red-500 text-sm text-center mb-4">{error}</p>
        )}

        <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-4">
          {/* Full Name Input */}
          <div className="relative">
            <input
              type="text"
              name="username"
              placeholder="Full Name"
              value={formData.username}
              onChange={handleChange}
              className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <div className="absolute inset-y-0 left-3 flex items-center text-gray-400 pointer-events-none">
              <FiUser size={20} />
            </div>
          </div>

          {/* Email Input */}
          <div className="relative">
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <div className="absolute inset-y-0 left-3 flex items-center text-gray-400 pointer-events-none">
              <FiMail size={20} />
            </div>
          </div>

          {/* Password Input */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <div className="absolute inset-y-0 left-3 flex items-center text-gray-400 pointer-events-none">
              <FiLock size={20} />
            </div>
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-3 flex items-center text-gray-600 hover:text-gray-900 focus:outline-none"
              tabIndex={-1}
            >
              {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
            </button>
          </div>

          {/* Confirm Password Input */}
          <div className="relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <div className="absolute inset-y-0 left-3 flex items-center text-gray-400 pointer-events-none">
              <FiLock size={20} />
            </div>
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute inset-y-0 right-3 flex items-center text-gray-600 hover:text-gray-900 focus:outline-none"
              tabIndex={-1}
            >
              {showConfirmPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
            </button>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-md"
          >
            Register
          </button>
        </form>

        <p className="mt-6 text-gray-500 text-sm">
          Already Have an Account?{" "}
          <Link to="/login" className="text-blue-600 hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
