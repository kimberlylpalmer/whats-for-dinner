import React, { useState, useEffect } from "react";
import RecipeCard from "../components/RecipeCard";
import NavBar from "../components/NavBar";
import { useNavigate } from "react-router-dom";
import "../styles.css";
import { useAuth } from "../components/AuthContext";
import RecipeSummaryCard from "../components/RecipeSummaryCard"; // Corrected path
import RecipeModal from "../components/RecipeModal"; // This is your full recipe modal component



function Recipes() {
  const [recipes, setRecipes] = useState([]);
  const [mealTypes, setMealTypes] = useState([]);
  const [selectedMealTypeId, setSelectedMealTypeId] = useState("");
  const [viewMode, setViewMode] = useState("all");
  const [selectedRecipe, setSelectedRecipe] = useState(null);
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
    fetch("/api/meal_type")
      .then((response) => response.json())
      .then((data) => setMealTypes(data.meal_types || []))
      .catch((error) => console.error("Error fetching meal types:", error));
  }, []);
  

  useEffect(() => {
    let endpoint = "api/recipes";
    if (viewMode === "favorites") {
      endpoint = "api/favorites";
    } else if (viewMode === "authored") {
      endpoint = "api/authored";
    }

    if (selectedMealTypeId) {
      const selectedMealType = mealTypes.find(type => type.id === parseInt(selectedMealTypeId));
      if (selectedMealType) {
        endpoint = `/api/recipes/mealtype/${selectedMealType.type}`;
      }
    }

    fetch(endpoint)
      .then((response) => response.json())
      .then((data) => {
        setRecipes(data);
        console.log(data); // Log to see the fetched data
      })
      .catch((error) => console.error("Error fetching recipes:", error));
  }, [viewMode, selectedMealTypeId, mealTypes]);

  const handleRecipeDelete = (recipeId) => {
    setRecipes((prevRecipes) =>
      prevRecipes.filter((recipe) => recipe.id !== recipeId)
    );
  };
  
  const handleMealTypeChange = (e) => {
    setSelectedMealTypeId(e.target.value);
    setViewMode("all"); // Reset view mode to show all when filtering by meal type
  };

// to open the modal
  const openRecipeModal = recipe => {
    setSelectedRecipe(recipe);
  };

  //To close modal
  const closeRecipeModal = () => {
    setSelectedRecipe(null)
  }

  const toggleFavorite = (recipeId, isFavorited) => {
    const updatedRecipes = recipes.map(recipe => {
      if (recipe.id === recipeId) {
        return { ...recipe, isFavorited: !isFavorited };
      }
      return recipe;
    });
    setRecipes(updatedRecipes);
  };

  console.log(selectedRecipe)
  
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
        {user &&
       <>
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
        </>
        }
        {/* <button className="button" onClick={handleNavigateToMealPlanner}>
          Meal Planner
        </button> */}
        <select onChange={handleMealTypeChange} value={selectedMealTypeId}>
          <option value="">Filter by Meal Type</option>
          {mealTypes.map((type) => (
            <option key={type.id} value={type.id}>{type.type}</option>
          ))}
        </select>
      </div>
      <div id="recipe-container">
        {recipes.map((recipe) => (
          <RecipeSummaryCard
            key={recipe.id}
            recipe={recipe}
            openRecipeModal={openRecipeModal}
            // onClick={() => openRecipeModal(recipe)}
            // onRecipeUpdate={handleRecipeUpdate}
            // onRecipeDelete={handleRecipeDelete}
            // isFavorited={favoriteRecipes.includes(recipe.id)}
          />
        ))}
      </div>
      {selectedRecipe && (
        <RecipeModal
          recipe={selectedRecipe}
          onClose={closeRecipeModal}
        />
      )}
    </div>
  );
}

export default Recipes;
