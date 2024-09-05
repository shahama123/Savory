import React, { useState } from "react";
import { IoFastFoodOutline, IoMenu, IoClose } from "react-icons/io5";

import { Link } from "react-router-dom";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="bg-white fixed top-0 flex justify-between items-center w-full h-20 px-5 lg:px-8 z-50">
      <div className="flex items-center">
        <h2 className="text-3xl font-bold text-black">Savory </h2>
      </div>
      {/* Burger Icon for small screens */}
      <div className="lg:hidden">
        <button
          onClick={toggleMenu}
          className="text-black text-3xl focus:outline-none"
        >
          {isMenuOpen ? <IoClose /> : <IoMenu />}
        </button>
      </div>
      {/* Menu Items */}
      <ul
        className={`lg:flex lg:items-center lg:gap-5 text-xl cursor-pointer 
                      ${
                        isMenuOpen
                          ? "flex flex-col items-center absolute top-20 left-0 w-full bg-white z-50"
                          : "hidden"
                      } lg:static lg:flex-row`}
      >
        <div className="flex items-center gap-x-14">
          <Link to={"/"} className="py-2 lg:py-0 text-black">
            Home
          </Link>
          <Link to={"/searchresults"} className="py-2 lg:py-0 text-black">
            Explore
          </Link>

          <Link
            to={"/favourites"}
            className="flex items-center gap-2 py-2 lg:py-0"
          >
            <li className="text-black">Favorites</li>
            <IoFastFoodOutline className="text-black" />
            {/* <BsFill0CircleFill className="text-black w-3 mb-6 " /> */}
          </Link>
        </div>
      </ul>
    </div>
  );
};

export default Header;
