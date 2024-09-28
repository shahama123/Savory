import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Favorites from "./Favourites";

const Category = () => {
  const location = useLocation();
  const categoryDetails = location.state?.item || [];
  const [menus, setMenus] = useState([]);

  const navigate = useNavigate();

  function handleNavigate(item) {
    navigate("/recipedetails", { state: { item } });
  }

  useEffect(() => {
    fetch(
      `https://www.themealdb.com/api/json/v1/1/search.php?s=${categoryDetails?.strCategory}`
    )
      .then((response) => response.json())
      .then((data) => setMenus(data.meals || []))
      .catch((err) => console.log(err));
  }, [categoryDetails]);

  return (
    <div className="">
      <div className=" pt-32 pb-10 min-h-screen bg-blue-gray-50   ">
        <h1 className="text-2xl font-semibold text-center mb-8"></h1>
        {menus.length === 0 ? (
          <p className="text-center text-xl mt-60">Item not found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8 px-4 sm:px-8 md:px-12 lg:px-20 xl:px-32">
            {menus.map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-xl w-full max-w-xs shadow-lg mx-auto min-h-56"
              >
                <img
                  className="rounded-lg w-full h-40 object-cover"
                  src={item.strMealThumb}
                  alt={item.strMeal}
                />
                <div className="flex items-center justify-center">
                  <h1 className="mt-3 text-base text-center">{item.strMeal}</h1>
                </div>
                <div className="bottom-0 ">
                  <div className="flex justify-center items-center gap-4 py-6">
                    <div className="bg-blue-gray-50 rounded text-xs px-2 py-1">
                      <h4>{item.strArea}</h4>
                    </div>
                    <div className="bg-blue-gray-50 rounded text-xs px-2 py-1">
                      <h4>{item.strCategory}</h4>
                    </div>
                  </div>
                  <div className="flex items-center justify-center pb-7">
                    <button
                      onClick={() => handleNavigate(item)}
                      className="border border-blue-gray-500 rounded-full px-6 py-1 hover:bg-black hover:text-white"
                    >
                      View
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Category;
