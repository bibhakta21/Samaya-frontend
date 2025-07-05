import { useState } from "react";
import { toast } from "react-hot-toast";
import { FiHelpCircle, FiMail, FiPhone } from "react-icons/fi";
import { Link } from "react-router-dom";

export default function Contact() {
 

  return (
    <div className="min-h-screen bg-white flex flex-col md:flex-row items-center justify-center px-4 md:px-16 py-10 font-[Poppins]">

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

  
      </div>

    </div>
  );
}
