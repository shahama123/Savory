import React from "react";
import heroImage from "../assets/hero.jpg";

const Hero = () => {
  return (
    <div
      style={{ backgroundImage: `url(${heroImage})` }}
      className="bg-cover w-full bg-center h-[110vh] flex items-center justify-center"
    >
      <div className="text-center px-4 md:px-8 lg:px-20">
        <h1 className="text-3xl md:text-5xl lg:text-6xl  font-bold text-black mb-4">
          Discover Delicious Recipes
        </h1>
        <p className="text-base md:text-lg lg:text-xl text-black mb-4">
          Explore a world of culinary delights with easy-to-follow recipes,
        </p>
        <p className="text-base md:text-lg lg:text-xl text-black">
          fresh ingredients, and tips from top chefs.
        </p>
      </div>
    </div>
  );
};

export default Hero;
