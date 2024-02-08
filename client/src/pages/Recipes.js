import React, { useState, useEffect } from "react";
import RecipeCard from "../components/RecipeCard";
import NavBar from "../components/NavBar";
import { useNavigate } from "react-router-dom";
import "../styles.css";

function Recipes() {
  const [recipes, setRecipes] = useState([]);
  const navigate = useNavigate();
  const [showFavorites, setShowFavorites] = useState(false);

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
    const endpoint = showFavorites ? 'api/favorites' : 'api/recipes';
    fetch(endpoint)
      .then((response) => response.json())
      .then((data) => {
        setRecipes(data);
        console.log(data); // Log to see the fetched data
      })
      .catch((error) => console.error("Error fetching recipes:", error));
  }, [showFavorites]);

  const handleRecipeDelete = (recipeId) => {
    setRecipes((prevRecipes) =>
      prevRecipes.filter((recipe) => recipe.id !== recipeId)
    );
  };
  return (
    <div>
      <header>
        <NavBar />
      </header>
      <h1> Recipes </h1>
      <div>
        <button className='button' onClick={handleNavigateToUser}>Back to User Page</button>
        <button className='button' onClick={handleNavigateToRecipeForm}>Add New Recipe</button>
        <button className='button' onClick={() => setShowFavorites(!showFavorites)}>
          {showFavorites ? 'Show All Recipes' : 'Show Favorites'}
        </button>
      </div>
      <div id="recipe-container">
        {recipes.map((recipe) => (
          <RecipeCard
            key={recipe.id}
            recipe={recipe}
            onRecipeUpdate={handleRecipeUpdate}
            onRecipeDelete={handleRecipeDelete}
          />
        ))}
      </div>
    </div>
  );
}

export default Recipes;
