import React from "react";
import greenWatch from "../../assets/about1.png";
import blueWatch from "../../assets/about2.png";

export default function About() {
  return (
    <div className="min-h-screen bg-white font-[Poppins] px-4 md:px-10 py-16 flex items-center justify-center">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 w-full max-w-6xl justify-items-center">
        {/* Who We Are - Left */}
        <div className="flex flex-col md:items-start items-center text-center md:text-left px-4">
          <h2 className="text-4xl font-extrabold text-[#444444] mb-6 w-full">Who We Are</h2>
          <p className="text-[#6c6c6c] mb-8 text-lg max-w-md text-justify">
            Established in <strong>2025</strong>, <strong>Samaya</strong> has been dedicated to creating unforgettable experiences. Our journey started with a simple idea: to make time extraordinary. Today, we continue to turn dreams into reality.
          </p>
          <img
            src={greenWatch}
            alt="Green Watch"
            className="w-64 md:w-80 object-contain"
          />
        </div>

        {/* Why Us - Right */}
        <div className="flex flex-col md:items-start items-center text-center md:text-left px-4 mt-10 md:mt-24">
          <h2 className="text-4xl font-extrabold text-[#444444] mb-6 w-full">Why Us</h2>
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
    </div>
  );
}
