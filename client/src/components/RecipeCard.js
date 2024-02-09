import React, { useState } from "react";
import defaultImage from "../assets/pexels-karolina-grabowska-4033639.jpg";
import { useAuth } from "../components/AuthContext";
import EditRecipeForm from "./EditRecipe";
import { useNavigate } from "react-router-dom";
import FavoriteButton from './FavoriteButton';

function RecipeCard({ recipe, onRecipeUpdate, onRecipeDelete }) {
  const { user } = useAuth();
  const isAuthor = user && recipe.author_id === user.id;
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();

  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  const handleRecipeUpdate = (updatedRecipe) => {
    onRecipeUpdate(updatedRecipe);
    setIsEditing(false);
  };

  const handleRecipeDelete = () => {
    console.log("attempting to delete Recipe ID:", recipe.id);
    fetch(`/api/recipes/${recipe.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            `Failed to delete recipe with status: ${response.status}`
          );
        }
        return response.json();
      })
      .then(() => {
        onRecipeDelete(recipe.id);
      })

      .catch((error) => {
        console.error("Error deleting recipe:", error);
      });
  };



  return (
    <div className="card">
      {isEditing ? (
        <EditRecipeForm
          recipe={recipe}
          onCancel={() => setIsEditing(false)}
          onUpdate={handleRecipeUpdate}
        />
      ) : (
        <>
          <h2>{recipe.title}</h2>
          <div className="image-container">
            <img
              className="recipe-image"
              src={recipe.image_url || defaultImage}
              alt={recipe.title}
            />
          </div>
          <p>Meal Type: {recipe.mealType}</p>
          <p>Cooking Time: {recipe.cooking_time}</p>
          <p>Author: {recipe.author_username}</p>
          <div>
            <p>Ingredients:</p>
            <ul>
              {recipe.ingredients.map((ingredient, index) => (
                <li key={index}>
                  {ingredient.measurement} - {ingredient.name}
                </li>
              ))}
            </ul>
          </div>
          <div className="recipe-directions">
            <h3>Directions:</h3>
            {recipe.directions.split("\n").map((line, index) => (
              <p key={index}>{line}</p>
            ))}
          </div>
                <div>
                  <FavoriteButton  recipeId={recipe.id} className="button" />
                </div>
          {isAuthor && (
            <>
              <button className="button" onClick={handleRecipeDelete}>
                Delete Recipe
              </button>
              <button className="button" onClick={toggleEdit}>
                Update Recipe
                </button>
            </>
          )}
        </>
      )}
    </div>
  );
}

export default RecipeCard;
