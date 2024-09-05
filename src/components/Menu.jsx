import React, { useEffect, useState } from "react";
import { FaStar, FaStarHalfAlt } from "react-icons/fa";
import { IoSearch } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { IoMdHeart } from "react-icons/io";
import { IoIosHeartEmpty } from "react-icons/io";

const Menu = () => {
  const [menus, setMenus] = useState([]);
  const [category, setCategory] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [clicked, setClicked] = useState(false);
  const [favorites, setFavorites] = useState({});

  const navigate = useNavigate();

  function handleNavigate(item) {
    navigate("/recipedetails", { state: { item } });
  }

  function handleFilteredDish(item) {
    // alert("hi");
    navigate("/categories", { state: { item } });
  }

  const handleSearch = (e) => {
    e.preventDefault();
    setClicked(!clicked);
    navigate("/searchresults", { state: { searchTerm } });
  };

  useEffect(() => {
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchTerm}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.meals) {
          // Shuffle the array to get random dishes
          const shuffledMeals = data.meals.sort(() => 0.5 - Math.random());
          // Slice the first 8 random meals to display
          setMenus(shuffledMeals.slice(0, 8));
        }
      })
      .catch((err) => console.log(err));
  }, [clicked]);

  useEffect(() => {
    fetch("https://www.themealdb.com/api/json/v1/1/categories.php")
      .then((response) => response.json())
      .then((categoriesData) => setCategory(categoriesData.categories))
      .catch((err) => console.log(err));
  }, []);

  // console.log("category", category);

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || {};
    setFavorites(storedFavorites);
  }, []);

  function handleFavoriteToggle(id) {
    setFavorites((prevFavorites) => {
      const updatedFavorites = {
        ...prevFavorites,
        [id]: !prevFavorites[id],
      };

      localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
      return updatedFavorites;
    });
  }

  return (
    <>
      <div className="bg-blue-gray-100 px-10 md:px-16 lg:px-36 xl:px-64 py-1">
        <div>
          <form className="my-10" onSubmit={handleSearch}>
            <div className="flex justify-center items-center gap-2 py-2 lg:py-0">
              <input
                className="border rounded-full px-5 py-2 text-black"
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
          <h1 className="text-stone-900 text-2xl md:text-4xl text-center font-extrabold mt-10 mb-6">
            Featured Recipies
          </h1>
          {/* <p className="text-sm md:text-base mb-6">
            Discover our Special Recipe of the Week. Enjoy the burst of flavors
            and the ease of preparation with the standout recipies. Treat
            yourself and your loved ones to exceptional recipe that’s sure to
            impress!
          </p> */}
          <p className="text-center text-stone-900 text-lg md:text-xl">
            {" "}
            Recommended
          </p>

          <div className="pt-10 pb-16">
            <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4  gap-4">
              {menus.map((item, index) => (
                <li
                  key={index}
                  className="bg-white rounded-lg shadow-lg overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-xl"
                >
                  <img
                    className="w-full h-48 object-cover"
                    src={item.strMealThumb}
                    alt={item.strMeal}
                  />
                  <div className="">
                    {favorites[item.idMeal] ? (
                      <IoMdHeart
                        className="absolute top-1 w-9 h-9 bg-blue-gray-50 rounded-full p-2 text-red-700 text-bold text-base  right-3  mt-4"
                        onClick={() => handleFavoriteToggle(item.idMeal)}
                      />
                    ) : (
                      <IoIosHeartEmpty
                        className="absolute top-1 w-9 h-9 bg-blue-gray-50 rounded-full p-2 text-red-700  text-bold text-base right-3  mt-4"
                        onClick={() => handleFavoriteToggle(item.idMeal)}
                      />
                    )}
                  </div>

                  <div className="p-4 text-center">
                    <h4 className="text-sm min-h-12 md:text-base font-semibold text-stone-900">
                      {item.strMeal}
                    </h4>
                  </div>
                  <div className="items-center bottom-0 grid grid-cols-3 mb-2">
                    <div className="flex items-center space-x-3">
                      <div className="flex">
                        <FaStar className="text-yellow-700 ml-3" />
                        <FaStar className="text-yellow-700" />
                        <FaStar className="text-yellow-700" />
                        <FaStar className="text-yellow-700" />
                        <FaStarHalfAlt className="text-yellow-700" />
                      </div>
                      <button
                        onClick={() => handleNavigate(item)}
                        className="border mr-2 rounded-full px-6 py-1  border-blue-gray-500 hover:bg-black hover:text-white"
                      >
                        View
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="px-10  md:px-16  lg:px-32 xl:px-60 pt-10 md:pt-20 pb-20  bg-blue-gray-50">
        <h1 className="text-stone-900 text-2xl md:text-4xl text-center  font-extrabold mb-4">
          Choose Your Category
        </h1>
        {/* <p className="text-sm md:text-base mb-6">
          Choose category for your favourite recipe.
        </p> */}
        <div className="pt-10 pb-12">
          <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {category.map((item, index) => (
              <li
                onClick={() => handleFilteredDish(item)}
                key={index}
                className="text-center transform transition duration-300 hover:scale-105"
              >
                <img
                  className="my-5 rounded-md w-full max-w-xs mx-auto"
                  src={item.strCategoryThumb}
                  alt={item.strCategory}
                />
                <h4 className="text-sm md:text-base font-semibold">
                  {item.strCategory}
                </h4>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Menu;
