import React, { useState, useEffect } from "react";
// import RecipeCard from "../components/RecipeCard";
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
    const updatedRecipes = recipes.map((recipe) =>
      recipe.id === updatedRecipe.id ? updatedRecipe : recipe
    );
    setRecipes(updatedRecipes);

    if (selectedRecipe && selectedRecipe.id === updatedRecipe.id) {
      setSelectedRecipe(updatedRecipe);
    }
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
      const selectedMealType = mealTypes.find(
        (type) => type.id === parseInt(selectedMealTypeId)
      );
      if (selectedMealType) {
        endpoint = `/api/recipes/mealtype/${selectedMealType.type}`;
      }
    }

    fetch(endpoint)
      .then((response) => response.json())
      .then((data) => {
        setRecipes(data);
        console.log(data); 
      })
      .catch((error) => console.error("Error fetching recipes:", error));
  }, [viewMode, selectedMealTypeId, mealTypes]);

  const handleRecipeDelete = (recipeId) => {
    const isConfirmed = window.confirm("Are you sure you want to delete the recipe?");

    if (isConfirmed) {
    console.log("attempting to delete Recipe ID:", recipeId);
    fetch(`/api/recipes/${recipeId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Failed to delete recipe with status: ${response.status}`);
        }
        setRecipes(prevRecipes => prevRecipes.filter(recipe => recipe.id !== recipeId))
      })
      .catch((error) => {
        console.error("Error deleting recipe:", error);
      });}
  };



  const handleMealTypeChange = (e) => {
    setSelectedMealTypeId(e.target.value);
    setViewMode("all"); 
  };

  // to open the modal
  const openRecipeModal = (recipe) => {
    setSelectedRecipe(recipe);
  };

  //To close modal
  const closeRecipeModal = () => {
    setSelectedRecipe(null);
  };

  console.log(selectedRecipe);

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
        {user && (
          <>
            <button className="button" onClick={handleNavigateToRecipeForm}>
              Add New Recipe
            </button>
            <button
              className="button"
              onClick={() => {
                setViewMode("all");
                setSelectedMealTypeId("");
              }}>
              Show All Recipes
            </button>
            <button className="button" onClick={() => setViewMode("favorites")}>
              Show Favorites
            </button>
            <button className="button" onClick={() => setViewMode("authored")}>
              My Recipes
            </button>
          </>
        )}

        <select className='inputdropdown' onChange={handleMealTypeChange} value={selectedMealTypeId}>
          <option value="">Filter by Meal Type</option>
          {mealTypes.map((type) => (
            <option key={type.id} value={type.id}>
              {type.type}
            </option>
          ))}
        </select>
      </div>
      <div id="recipe-container">
        {recipes.map((recipe) => (
          <RecipeSummaryCard
            key={recipe.id}
            recipe={recipe}
            openRecipeModal={openRecipeModal}
          />
        ))}
      </div>
      {selectedRecipe && (
        <RecipeModal
          recipe={selectedRecipe}
          onClose={closeRecipeModal}
          onRecipeUpdate={handleRecipeUpdate}
          onRecipeDelete={handleRecipeDelete}
        />
      )}
    </div>
  );
}

export default Recipes;
