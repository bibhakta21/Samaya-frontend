import { useState } from "react";
import { toast } from "react-hot-toast";
import { FiHelpCircle, FiMail, FiPhone } from "react-icons/fi";
import { Link } from "react-router-dom";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const submitForm = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3000/api/contact/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success(data.message);
        setFormData({ name: "", email: "", phone: "", message: "" });
      } else {
        toast.error(data.error);
      }
    } catch (error) {
      console.error("Error submitting the form:", error);
      toast.error("Failed to submit. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col md:flex-row items-center justify-center px-4 md:px-16 py-10 font-[Poppins]">

      {/* Left Section - Contact Form */}
      <div className="w-full md:w-1/2 bg-white rounded-xl shadow-md p-6 md:p-10 mb-10 md:mb-0">
        <h2 className="text-4xl font-bold text-black mb-2">
          Get in <span className="text-[#1d4ed8]">Touch</span>
        </h2>
        <p className="text-sm text-gray-700 mb-6">
          Send the message, ask question related to watch, we are always here for you!
        </p>

        <form className="space-y-4" onSubmit={submitForm}>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Name"
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Phone number"
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Message"
            rows="4"
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="w-full bg-[#1d4ed8] text-white py-3 rounded-md hover:bg-blue-700 font-semibold"
          >
            SEND
          </button>
        </form>

        {/* Contact Info */}
        <div className="mt-8 flex flex-col sm:flex-row sm:justify-between text-sm text-gray-700 space-y-4 sm:space-y-0 sm:space-x-6">
          <div className="flex items-center space-x-2">
            <FiPhone className="text-lg text-[#1d4ed8]" />
            <span>9813056161</span>
          </div>
          <div className="flex items-center space-x-2">
            <FiMail className="text-lg text-[#1d4ed8]" />
            <span>info@samaya.com</span>
          </div>
          <div className="flex items-center space-x-2">
            <FiHelpCircle className="text-lg text-[#1d4ed8]" />
            <a href="/faq" className="text-blue-600 hover:underline">FAQ</a>
          </div>
        </div>
      </div>

      {/* Right Section - Map */}
      <div className="w-full md:w-1/2 px-0 md:px-6">
        <iframe
          title="Location Map"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3532.387690830764!2d85.33623877531636!3d27.705102125358845!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb199e091c56a3%3A0x1468d146930b2c9b!2sBaba%20Oil%20Store!5e0!3m2!1sen!2snp!4v1685621302144!5m2!1sen!2snp"
          className="w-full h-96 md:h-[480px] rounded-xl border"
          loading="lazy"
        ></iframe>
      </div>
    </div>
  );
}
