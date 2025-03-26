import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Favorites from "./Favourites";
import { IoIosHeartEmpty, IoMdArrowRoundBack, IoMdHeart } from "react-icons/io";
import { FaStar, FaStarHalfAlt } from "react-icons/fa";

const Category = () => {
  const location = useLocation();
  const categoryDetails = location.state?.item || [];
  const [menus, setMenus] = useState([]);
  const [favorites, setFavorites] = useState({});
  const navigate = useNavigate();

  const handleGoBack = () => navigate(-1);
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
      <div className=" pt-20 pb-10 min-h-screen bg-blue-gray-50   ">
        <h1 className="text-2xl font-semibold text-center mb-8"></h1>
        {menus.length === 0 ? (
          <p className="text-center text-xl mt-60">Item not found.</p>
        ) : (
          <div>
            <div className="flex item-center justify-start mx-32 mb-10  ">
              <div className="flex gap-1 items-center">
                <IoMdArrowRoundBack />
                <button onClick={handleGoBack}>BACK</button>
              </div>
            </div>
            
            <div className="pt-10 pb-16">
              <ul className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8 px-4 sm:px-8 md:px-12 lg:px-20 xl:px-32">
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

                    <div className="pt-2 text-center">
                      <h4 className="text-sm min-h-12 md:text-base font-semibold text-stone-900">
                        {item.strMeal}
                      </h4>
                    </div>
                    <div className="items-center bottom-0 mb-5 mx-5">
                      <div className=" items-center grid grid-cols-2 space-x-3">
                        <div className="flex">
                          <FaStar className="text-yellow-700 ml-3" />
                          <FaStar className="text-yellow-700" />
                          <FaStar className="text-yellow-700" />
                          <FaStar className="text-yellow-700" />
                          <FaStarHalfAlt className="text-yellow-700" />
                        </div>

                        <button
                          onClick={() => handleNavigate(item)}
                          className="border mr-2 rounded-full md:px-4 py-1 border-blue-gray-500 hover:bg-black hover:text-white"
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
        )}
      </div>
    </div>
  );
};

export default Category;

// import React, { useEffect, useState } from "react";
// import { useLocation, useNavigate } from "react-router-dom";

// const Category = () => {
//   const location = useLocation();
//   const categoryDetails = location.state?.item || {};
//   const [menus, setMenus] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);  // For loading state
//   const [error, setError] = useState("");  // For any error in fetching data

//   const navigate = useNavigate();

//   function handleNavigate(item) {
//     navigate("/recipedetails", { state: { item } });
//   }

//   useEffect(() => {
//     if (categoryDetails?.strCategory) {
//       setIsLoading(true);  // Set loading state when fetching starts
//       fetch(
//         `https://www.themealdb.com/api/json/v1/1/filter.php?c=${categoryDetails.strCategory}`
//       )
//         .then((response) => response.json())
//         .then((data) => {
//           // Check if data.meals exists and has items
//           if (data.meals && data.meals.length > 0) {
//             setMenus(data.meals);
//           } else {
//             setMenus([]);  // If no meals found, clear the menus state
//           }
//           setIsLoading(false);  // Set loading to false after the response
//           console.log(data.meals);
//         })

//         .catch((err) => {
//           setError("Failed to load data.");
//           setIsLoading(false);
//           console.log(err);
//         });
//     }
//   }, [categoryDetails]);

//   return (
//     <div className="pt-32 pb-10 min-h-screen bg-blue-gray-50">
//       <h1 className="text-2xl font-semibold text-center mb-8">{categoryDetails.strCategory}</h1>

//       {/* Show loading spinner when fetching data */}
//       {isLoading ? (
//         <p className="text-center text-xl mt-60">Loading...</p>
//       ) : error ? (
//         // Show error message if there's an issue with the fetch
//         <p className="text-center text-xl mt-60">{error}</p>
//       ) : menus.length === 0 ? (
//         // Show "Item not found" if there are no items in the category
//         <p className="text-center text-xl mt-60">Item not found.</p>
//       ) : (
//         <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8 px-4 sm:px-8 md:px-12 lg:px-20 xl:px-32">
//           {menus.map((item, index) => (
//             <div
//               key={index}
//               className="bg-white rounded-xl w-full max-w-xs shadow-lg mx-auto min-h-56"
//             >
//               <img
//                 className="rounded-lg w-full h-40 object-cover"
//                 src={item.strMealThumb}
//                 alt={item.strMeal}
//               />
//               <div className="flex items-center justify-center">
//                 <h1 className="mt-3 text-base text-center">{item.strMeal}</h1>
//               </div>
//               <div className="bottom-0">
//                 <div className="flex justify-center items-center gap-4 py-6">
//                   <div className="bg-blue-gray-50 rounded text-xs px-2 py-1">
//                     <h4>{item.strArea}</h4>
//                   </div>
//                   <div className="bg-blue-gray-50 rounded text-xs px-2 py-1">
//                     <h4>{item.strCategory}</h4>
//                   </div>
//                 </div>
//                 <div className="flex items-center justify-center pb-7">
//                   <button
//                     onClick={() => handleNavigate(item)}
//                     className="border border-blue-gray-500 rounded-full px-6 py-1 hover:bg-black hover:text-white"
//                   >
//                     View
//                   </button>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default Category;
