import React from "react";
import watchImage from "../../assets/landing.png";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="py-12 px-4 sm:px-6 bg-white">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-10">
      
        <div className="flex-1 text-center md:text-left">
          <p className="text-gray-600 text-base sm:text-lg mb-2">Watch Collection</p>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight text-black mb-6">
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

        
        <div className="flex-1 flex justify-center">
          <img
            src={watchImage}
            alt="Watch"
            className="w-full max-w-xs sm:max-w-sm md:max-w-md object-contain"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
