import React from "react";
import greenWatch from "../../assets/about1.png";
import blueWatch from "../../assets/about2.png";
import missionImg from "../../assets/mission.png";
import visionImg from "../../assets/vision.png";
import {
  FaStar,
  FaClock,
  FaHandshake,
  FaShieldAlt,
  FaBolt,
  FaLeaf,
} from "react-icons/fa";

export default function About() {
  return (
    <div className="min-h-screen bg-white font-[Poppins] px-4 md:px-10 py-16 flex flex-col items-center justify-center">
      {/* Who We Are & Why Us */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 w-full max-w-6xl justify-items-center">
        {/* Who We Are */}
        <div className="flex flex-col md:items-start items-center text-center md:text-left px-4">
          <h2 className="text-4xl font-extrabold text-[#444444] mb-6 w-full">
            Who We Are
          </h2>
          <p className="text-[#6c6c6c] mb-8 text-lg max-w-md text-justify">
            Established in <strong>2025</strong>, <strong>Samaya</strong> has been dedicated to creating unforgettable experiences. Our journey started with a simple idea: to make time extraordinary. Today, we continue to turn dreams into reality.
          </p>
          <img
            src={greenWatch}
            alt="Green Watch"
            className="w-64 md:w-80 object-contain"
          />
        </div>

        {/* Why Us */}
        <div className="flex flex-col md:items-start items-center text-center md:text-left px-4 mt-10 md:mt-24">
          <h2 className="text-4xl font-extrabold text-[#444444] mb-6 w-full">
            Why Us
          </h2>
          <p className="text-[#6c6c6c] mb-8 text-lg max-w-md text-justify">
            What makes us unique is our unwavering commitment to excellence. We’re not just a brand; we’re your trusted time companion. Discover why watch lovers choose us for their timeless style and quality.
          </p>
          <img
            src={blueWatch}
            alt="Blue Watch"
            className="w-64 md:w-80 object-contain"
          />
        </div>
      </div>

      {/* Our Core Values */}
      <div className="mt-24 w-full max-w-6xl px-4">
        <h2 className="text-4xl font-extrabold text-[#444444] text-center mb-12">
          Our Core Values
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {[
            {
              icon: <FaStar className="text-yellow-500 text-3xl mb-3" />,
              title: "Quality",
              desc: "Premium craftsmanship in every watch we deliver.",
            },
            {
              icon: <FaClock className="text-purple-500 text-3xl mb-3" />,
              title: "Timeliness",
              desc: "We value your time by ensuring quick, on-time service.",
            },
            {
              icon: <FaHandshake className="text-green-500 text-3xl mb-3" />,
              title: "Trust",
              desc: "Long-lasting customer relationships built on honesty.",
            },
            {
              icon: <FaShieldAlt className="text-blue-500 text-3xl mb-3" />,
              title: "Integrity",
              desc: "We maintain transparency in every aspect of our brand.",
            },
            {
              icon: <FaBolt className="text-red-500 text-3xl mb-3" />,
              title: "Innovation",
              desc: "Constantly evolving with modern designs and tech.",
            },
            {
              icon: <FaLeaf className="text-emerald-600 text-3xl mb-3" />,
              title: "Sustainability",
              desc: "Eco-conscious practices to support a greener future.",
            },
          ].map((val, i) => (
            <div
              key={i}
              className="bg-gray-50 rounded-2xl p-6 shadow-md hover:shadow-lg transition duration-300 text-center"
            >
              {val.icon}
              <h4 className="text-xl font-semibold text-[#333] mb-2">
                {val.title}
              </h4>
              <p className="text-[#6c6c6c] text-sm">{val.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Mission and Vision */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 w-full max-w-6xl justify-items-center mt-24">
        {/* Our Mission */}
        <div className="flex flex-col md:items-start items-center text-center md:text-left px-4">
          <h2 className="text-4xl font-extrabold text-[#444444] mb-6 w-full">
            Our Mission
          </h2>
          <p className="text-[#6c6c6c] mb-8 text-lg max-w-md text-justify">
            Our mission is to redefine the perception of time by offering stylish, reliable, and customizable watches that empower individuals to express their identity.
          </p>
          <img
            src={missionImg}
            alt="Mission"
            className="w-64 md:w-80 object-contain"
          />
        </div>

        {/* Our Vision */}
        <div className="flex flex-col md:items-start items-center text-center md:text-left px-4 mt-10 md:mt-24">
          <h2 className="text-4xl font-extrabold text-[#444444] mb-6 w-full">
            Our Vision
          </h2>
          <p className="text-[#6c6c6c] mb-8 text-lg max-w-md text-justify">
            We envision becoming a global icon for personalized timepieces  where innovation, heritage, and artistry blend to inspire generations.
          </p>
          <img
            src={visionImg}
            alt="Vision"
            className="w-64 md:w-80 object-contain"
          />
        </div>
      </div>
    </div>
  );
}
