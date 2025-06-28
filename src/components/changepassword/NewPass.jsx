import React, { useState } from "react";
import { FiLock, FiEye, FiEyeOff } from "react-icons/fi";
import { default as watch } from "../../assets/watchlogo.png";
import axios from "axios";
import { toast } from "react-hot-toast";  // changed here
import { useNavigate, useParams } from "react-router-dom";

export default function NewPass() {
  const { token } = useParams();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!newPassword) {
      toast.error("Please enter your new password.");  // react-hot-toast usage
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post("http://localhost:3000/api/users/reset-password", {
        token,
        newPassword,
      });
      toast.success(response.data.message || "Password reset successful!");  // react-hot-toast usage
      setNewPassword("");
      navigate("/login");
    } catch (error) {
      toast.error(error.response?.data?.error || "Failed to reset password");  // react-hot-toast usage
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row items-start justify-center bg-white font-[Poppins] px-4 md:px-6 pt-16 md:pt-20 gap-0">
      {/* Left Section */}
      <div className="w-full md:w-[45%] p-3 bg-gradient-to-br from-[#0569d7] to-[#022788] flex flex-col items-center justify-start rounded-2xl md:rounded-lg shadow-lg self-start">
        <h1 className="text-white text-4xl font-bold mb-4 self-start ml-4">
          Samaya<span className="text-orange-400">.</span>
        </h1>
        <img src={watch} alt="watch" className="max-w-xs w-full object-contain" />
      </div>

      {/* Right Section */}
      <div className="w-full md:w-[50%] p-3 md:pl-1 flex flex-col items-center justify-center self-start">
        <h2 className="text-3xl font-bold mb-2 text-gray-800 text-center">Reset Password</h2>
        <p className="text-gray-500 text-center mb-6">Enter your new password below</p>

        <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-4">
          {/* New Password Input */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="New Password"
              className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              disabled={loading}
            />
            <div className="absolute inset-y-0 left-3 flex items-center text-gray-400 pointer-events-none">
              <FiLock size={20} />
            </div>
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-3 flex items-center text-gray-600 hover:text-gray-900 focus:outline-none"
              tabIndex={-1}
              disabled={loading}
            >
              {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
            </button>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full text-white font-semibold py-3 rounded-md ${
              loading ? "bg-blue-300 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {loading ? "Resetting..." : "Reset Password"}
          </button>
        </form>
      </div>
    </div>
  );
}
