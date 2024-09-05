import React, { useEffect, useState } from "react";
import { FaStar, FaStarHalfAlt } from "react-icons/fa";
import { IoIosHeartEmpty, IoMdHeart } from "react-icons/io";
import { IoSearch } from "react-icons/io5";
import { useLocation, useNavigate } from "react-router-dom";

const SearchItems = () => {
  const location = useLocation();
  const receivedSearchQuery = location.state?.searchTerm || "";

  const [menus, setMenus] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [favorites, setFavorites] = useState({});

  const navigate = useNavigate();

  useEffect(() => {
    if (receivedSearchQuery) {
      setSearchTerm(receivedSearchQuery);
    }
  }, [receivedSearchQuery]);

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || {};
    setFavorites(storedFavorites);
  }, []);

  useEffect(() => {
    if (receivedSearchQuery) {
      fetch(
        `https://www.themealdb.com/api/json/v1/1/search.php?s=${receivedSearchQuery}`
      )
        .then((response) => response.json())
        .then((data) => {
          setMenus(data.meals || []);
        })
        .catch((err) => console.log(err));
    }
  }, [receivedSearchQuery]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm) {
      fetch(
        `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchTerm}`
      )
        .then((response) => response.json())
        .then((data) => {
          setMenus(data.meals || []);
        })
        .catch((err) => console.log(err));
    }
  };

  const handleFavoriteToggle = (id, item) => {
    const updatedFavorites = { ...favorites };

    if (updatedFavorites[id]) {
      delete updatedFavorites[id];
    } else {
      updatedFavorites[id] = item;
    }

    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  return (
    <div className="min-h-screen bg-blue-gray-50 pt-32 pb-10 px-20 sm:px-20 md:px-32 lg:px-40">
      <form onSubmit={handleSearch} className="mb-8">
        <div className="flex justify-center items-center py-5 gap-2">
          <input
            className="border rounded-full px-5 py-2 w-full max-w-xs sm:max-w-md text-black"
            type="text"
            placeholder="Search your recipe..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button
            type="submit"
            className="border border-gray-400 bg-white p-3 rounded-full"
          >
            <IoSearch className="text-black" />
          </button>
        </div>
      </form>

      <div className="mt-8">
        {searchTerm === "" ? (
          <p className="text-center mt-36 text-gray-500 text-lg md:text-2xl">
            Enter something to search
          </p>
        ) : menus.length === 0 ? (
          <p className="mt-40 text-center text-gray-500 text-lg md:text-2xl">
            No results found!
          </p>
        ) : (
          <ul className="grid grid-cols-1 mt-20 mb-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {menus.map((item, index) => (
              <li
                key={index}
                className="relative bg-white rounded-lg shadow-lg overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-xl"
              >
                <img
                  className="w-full h-48 object-cover"
                  src={item.strMealThumb}
                  alt={item.strMeal}
                />
                <div className="absolute top-1 right-3 mt-4">
                  {favorites[item.idMeal] ? (
                    <IoMdHeart
                      className="w-9 h-9 bg-blue-gray-50 rounded-full p-2 text-red-700"
                      onClick={() => handleFavoriteToggle(item.idMeal, item)}
                    />
                  ) : (
                    <IoIosHeartEmpty
                      className="w-9 h-9 bg-blue-gray-50 rounded-full p-2 text-red-700"
                      onClick={() => handleFavoriteToggle(item.idMeal, item)}
                    />
                  )}
                </div>
                <div className="p-4 text-center">
                  <h4 className="text-sm min-h-12 md:text-base font-semibold text-stone-900">
                    {item.strMeal}
                  </h4>
                </div>
                <div className="flex justify-between items-center px-4 pb-4">
                  <div className="flex">
                    <FaStar className="text-yellow-700" />
                    <FaStar className="text-yellow-700" />
                    <FaStar className="text-yellow-700" />
                    <FaStar className="text-yellow-700" />
                    <FaStarHalfAlt className="text-yellow-700" />
                  </div>
                  <button
                    onClick={() =>
                      navigate("/recipedetails", { state: { item } })
                    }
                    className="border rounded-full px-6 py-1 border-blue-gray-500 hover:bg-black hover:text-white"
                  >
                    View
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default SearchItems;
