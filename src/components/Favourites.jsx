import React, { useEffect, useState } from "react";
import { FaStar, FaStarHalfAlt } from "react-icons/fa";
import { IoMdHeart, IoIosHeartEmpty } from "react-icons/io";
import { useNavigate } from "react-router-dom";

const Favorites = () => {
  const [favorites, setFavorites] = useState({});
  const [favoriteItems, setFavoriteItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || {};
    setFavorites(storedFavorites);
    fetchFavoriteItems(storedFavorites);
  }, []);

  useEffect(() => {
    fetchFavoriteItems(favorites);
  }, [favorites]);

  const fetchFavoriteItems = (favorites) => {
    fetch("https://www.themealdb.com/api/json/v1/1/search.php?s=")
      .then((response) => response.json())
      .then((data) => {
        const items = data.meals.filter((item) => favorites[item.idMeal]);
        setFavoriteItems(items);
      })
      .catch((err) => console.log(err));
  };

  const handleFavoriteToggle = (id) => {
    const updatedFavorites = { ...favorites, [id]: !favorites[id] };
    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    fetchFavoriteItems(updatedFavorites);
  };

  const handleNavigate = (item) => {
    navigate("/recipedetails", { state: { item } });
  };

  return (
    <div className="min-h-screen bg-blue-gray-50 pt-40 pb-20 px-16">
      <h1 className="md:text-4xl text-2xl font-semibold text-center mb-8">
        My Favorites
      </h1>
      {favoriteItems.length === 0 ? (
        <p className="text-center text-lg md:text-2xl mt-36 text-gray-500">
          No Favorites Yet
        </p>
      ) : (
        <div className="mt-14">
          <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 px-4 sm:px-8 md:px-12 lg:px-20 xl:px-32 gap-6">
            {favoriteItems.map((item, index) => (
              <li
                key={index}
                className="bg-white rounded-lg min-h-56 shadow-lg overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-xl"
              >
                <img
                  className="w-full h-48 object-cover"
                  src={item.strMealThumb}
                  alt={item.strMeal}
                />
                <div>
                  {favorites[item.idMeal] ? (
                    <IoMdHeart
                      className="absolute top-1 w-9 h-9 bg-blue-gray-50 p-2 rounded-full text-red-700 right-3"
                      onClick={() => handleFavoriteToggle(item.idMeal)}
                    />
                  ) : (
                    <IoIosHeartEmpty
                      className="absolute top-1 w-9 h-9 bg-blue-gray-50 p-2 rounded-full right-3 text-red-700"
                      onClick={() => handleFavoriteToggle(item.idMeal)}
                    />
                  )}
                </div>
                <div className="p-4 text-center">
                  <h4 className="text-sm min-h-12 md:text-base font-semibold text-stone-900">
                    {item.strMeal}
                  </h4>
                  <h2>{item.strCategory}</h2>
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
                    onClick={() => handleNavigate(item)}
                    className="border rounded-full px-6 py-1 border-blue-gray-500 hover:bg-black hover:text-white"
                  >
                    View
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Favorites;
