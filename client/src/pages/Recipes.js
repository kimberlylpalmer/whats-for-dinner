import React, { useState, useEffect } from "react";
import RecipeCard from "../components/RecipeCard";
import NavBar from "../components/NavBar";
import { useNavigate } from "react-router-dom";
import "../styles.css";
import { useAuth } from "../components/AuthContext";

function Recipes() {
  const [recipes, setRecipes] = useState([]);
  const [viewMode, setViewMode] = useState("all");
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleNavigateToUser = () => {
    navigate("/user");
  };

  const handleNavigateToRecipeForm = () => {
    navigate("/submit-recipe");
  };

  const handleRecipeUpdate = (updatedRecipe) => {
    const updatedRecipes = recipes.map((recipe) => {
      if (recipe.id === updatedRecipe.id) {
        return updatedRecipe;
      }
      return recipe;
    });
    setRecipes(updatedRecipes);
  };

  useEffect(() => {
    let endpoint = "api/recipes";
    if (viewMode === "favorites") {
      endpoint = "api/favorites";
    } else if (viewMode === "authored") {
      endpoint = "api/authored";
    }

    fetch(endpoint)
      .then((response) => response.json())
      .then((data) => {
        setRecipes(data);
        console.log(data); // Log to see the fetched data
      })
      .catch((error) => console.error("Error fetching recipes:", error));
  }, [viewMode]);

  const handleRecipeDelete = (recipeId) => {
    setRecipes((prevRecipes) =>
      prevRecipes.filter((recipe) => recipe.id !== recipeId)
    );
  };

  const testClick = () => {
    console.log("Show Favorites was clicked");
  };

  return (
    <div>
      <header>
        <NavBar />
      </header>
      <h1> Recipes </h1>
      <div>
        <button className="button" onClick={handleNavigateToUser}>
          Back to User Page
        </button>
        <button className="button" onClick={handleNavigateToRecipeForm}>
          Add New Recipe
        </button>
        <button className="button" onClick={() => setViewMode("all")}>
          Show All Recipes
        </button>
        <button className="button" onClick={() => setViewMode("favorites")}>
          Show Favorites
        </button>
        <button className="button" onClick={() => setViewMode("authored")}>
          My Recipes
        </button>
      </div>
      <div id="recipe-container">
        {recipes.map((recipe) => (
          <RecipeCard
            key={recipe.id}
            recipe={recipe}
            onRecipeUpdate={handleRecipeUpdate}
            onRecipeDelete={handleRecipeDelete}
            // isFavorited={favoriteRecipes.includes(recipe.id)}
          />
        ))}
      </div>
    </div>
  );
}

export default Recipes;
