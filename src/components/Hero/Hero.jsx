import React from "react";
import watchImage from "../../assets/landing.png";
import { Link, useNavigate } from "react-router-dom";

const Hero = () => {
  return (
    <section className="py-16 px-6 bg-white">
      <div
        className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between"
        style={{ gap: "20px" }} // Custom inline gap here
      >
        {/* Left content */}
        <div className="flex-1 text-center md:text-left ml-10">
          <p className="text-gray-600 text-lg mb-2">Watch Collection</p>
          <h1 className="text-5xl md:text-6xl font-bold leading-tight text-black mb-6">
            GOOD WATCH <br />
            TAKE YOU <br />
            GOOD PLACES
          </h1>
          <Link to="/product">
          <button className="px-6 py-3 border border-black text-black hover:bg-black hover:text-white transition-all duration-300">
            Shop Now
          </button>
          </Link>
        </div>

        {/* Right image */}
        <div className="flex-1">
          <img
            src={watchImage}
            alt="Watch"
            className="w-full max-w-md mx-auto"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
