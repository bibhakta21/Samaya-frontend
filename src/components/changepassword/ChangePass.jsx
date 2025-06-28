import React, { useState, useContext } from "react";
import { FiLock, FiEye, FiEyeOff } from "react-icons/fi";
import { default as watch } from "../../assets/watchlogo.png";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";

export default function ChangePass() {
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
  });
  const [error, setError] = useState("");
  const { logout } = useContext(UserContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const token = localStorage.getItem("token");

      await axios.put(
        "http://localhost:3000/api/users/change-password",
        formData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      toast.success("Password changed successfully! Logging out...");
      setFormData({ oldPassword: "", newPassword: "" });

      setTimeout(() => {
        logout();
        navigate("/login");
      }, 2000);
    } catch (error) {
      setError(error.response?.data?.error || "Failed to change password");
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
          Change Password
        </h2>
        <p className="text-gray-500 text-center mb-6">Update your password below</p>

        {error && (
          <p className="text-red-500 text-sm text-center mb-4">{error}</p>
        )}

        <form className="w-full max-w-sm space-y-4" onSubmit={handleSubmit}>
          {/* Old Password */}
          <div className="relative">
            <input
              type={showOldPassword ? "text" : "password"}
              name="oldPassword"
              placeholder="Old Password"
              value={formData.oldPassword}
              onChange={handleChange}
              className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <div className="absolute inset-y-0 left-3 flex items-center text-gray-400 pointer-events-none">
              <FiLock size={20} />
            </div>
            <button
              type="button"
              onClick={() => setShowOldPassword(!showOldPassword)}
              className="absolute inset-y-0 right-3 flex items-center text-gray-600 hover:text-gray-900 focus:outline-none"
              tabIndex={-1}
            >
              {showOldPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
            </button>
          </div>

          {/* New Password */}
          <div className="relative">
            <input
              type={showNewPassword ? "text" : "password"}
              name="newPassword"
              placeholder="New Password"
              value={formData.newPassword}
              onChange={handleChange}
              className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <div className="absolute inset-y-0 left-3 flex items-center text-gray-400 pointer-events-none">
              <FiLock size={20} />
            </div>
            <button
              type="button"
              onClick={() => setShowNewPassword(!showNewPassword)}
              className="absolute inset-y-0 right-3 flex items-center text-gray-600 hover:text-gray-900 focus:outline-none"
              tabIndex={-1}
            >
              {showNewPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
            </button>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-md"
          >
            Change Password
          </button>
        </form>
      </div>
    </div>
  );
}
