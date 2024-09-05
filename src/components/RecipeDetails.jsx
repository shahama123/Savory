import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { IoMdHeart, IoIosHeartEmpty } from "react-icons/io";

const RecipeDetails = () => {
  const location = useLocation();
  const ingredientsDetails = location.state?.item;
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    if (ingredientsDetails) {
      const storedFavorites =
        JSON.parse(localStorage.getItem("favorites")) || {};
      setIsFavorite(!!storedFavorites[ingredientsDetails.idMeal]);
    }
  }, [ingredientsDetails]);

  const toggleFavorite = () => {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || {};

    if (isFavorite) {
      delete storedFavorites[ingredientsDetails.idMeal];
    } else {
      storedFavorites[ingredientsDetails.idMeal] = ingredientsDetails;
    }

    localStorage.setItem("favorites", JSON.stringify(storedFavorites));
    setIsFavorite(!isFavorite);
  };

  if (!ingredientsDetails) {
    return (
      <div className="pt-32 pb-5 bg-blue-gray-50">
        <h2 className="text-center font-bold text-4xl mb-10">
          Recipe Not Found
        </h2>
        <p className="text-center">Please select a recipe from the menu.</p>
      </div>
    );
  }

  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    const ingredient = ingredientsDetails[`strIngredient${i}`];
    const measure = ingredientsDetails[`strMeasure${i}`];
    if (ingredient) {
      ingredients.push(`${measure} ${ingredient}`);
    }
  }

  return (
    <div className="pt-32 pb-16 bg-blue-gray-50">
      <h2 className="text-center font-bold text-4xl mb-10">
        {ingredientsDetails.strMeal}
      </h2>
      <div className="flex items-center flex-wrap gap-20 justify-center">
        <img
          className="rounded-lg w-72"
          src={ingredientsDetails.strMealThumb}
          alt={ingredientsDetails.strMeal}
        />

        <div>
          <h2 className="text-2xl underline font-semibold">Ingredients</h2>
          <ul className="mt-3 list-item list-disc">
            {ingredients.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
      <div className="px-20 py-10">
        <h2 className="text-2xl underline font-semibold">Preparations</h2>
        <p className="mt-3">{ingredientsDetails.strInstructions}</p>
      </div>
      <div className="flex items-center gap-3 mt-8 mb-8 justify-center">
        {ingredientsDetails.strSource && (
          <a
            target="_blank"
            rel="noopener noreferrer"
            href={ingredientsDetails.strSource}
            className="border border-black  py-2 px-4 bg-green-800 text-white rounded hover:text-white hover:bg-green-700"
          >
            Get Recipe
          </a>
        )}
        {ingredientsDetails.strYoutube && (
          <a
            target="_blank"
            rel="noopener noreferrer"
            href={ingredientsDetails.strYoutube}
            className="border border-black bg-green-800 text-white px-4 py-2 rounded   hover:text-white  hover:bg-green-700"
          >
            Watch Video
          </a>
        )}
      </div>

      <div className="flex justify-center mt-4">
        <button
          onClick={toggleFavorite}
          className="flex items-center border border-red-700 bg-red-600 text-white py-2 px-4 rounded hover:bg-red-500"
        >
          {isFavorite ? (
            <IoMdHeart className="text-white mr-2" />
          ) : (
            <IoIosHeartEmpty className="text-white mr-2" />
          )}
          {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
        </button>
      </div>
    </div>
  );
};

export default RecipeDetails;
