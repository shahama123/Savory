import { useState } from "react";
import "./App.css";
import Header from "./components/Header";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import SearchItems from "./components/SearchItems";
import RecipeDetails from "./components/RecipeDetails";
import Footer from "./components/Footer";
import Favourites from "./components/Favourites";
import Category from "./components/Category";
import ScrollToTop from "./components/ScrollToTop";

function App() {
  return (
    <>
      <BrowserRouter>
      <ScrollToTop/>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/searchresults" element={<SearchItems />} />
          <Route path="/recipedetails" element={<RecipeDetails />} />
          <Route path="/categories" element={<Category />} />
          <Route path="/favourites" element={<Favourites />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
