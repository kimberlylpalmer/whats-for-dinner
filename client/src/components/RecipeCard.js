import React, { useState } from "react";
import defaultImage from "../assets/pexels-karolina-grabowska-4033639.jpg";
import { useAuth } from "../components/AuthContext";
import EditRecipeForm from "./EditRecipe";
import { useNavigate } from "react-router-dom";

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
          throw new Error(`Failed to delete recipe with status: ${response.status}`);
        }
        return response.json(); // Assuming the server sends back a JSON response
      })
      .then(() => {
        // Call the onRecipeDelete function passed from the parent component
        onRecipeDelete(recipe.id);
    })
    //   .then((data) => {
    //       console.log("Recipe deleted successfully:", data);
    //       console.log("Redirecting to recipes page");
    //     navigate("/recipes"); // Redirect to recipes page
    //   })
      .catch((error) => {
        console.error("Error deleting recipe:", error);
      });
  };
    
//   const handleRecipeDelete = () => {
//     console.log("attempting to delete Recipe ID:", recipe.id);
//     fetch(`/api/recipes/${recipe.id}`, {
//       method: "DELETE",
//       headers: {
//         "Content-Type": "application/json",
//       },
//     })
//       .then((response) => {
//         console.log("Fetch response:", response); // Log the response object to see its status and other properties
//         if (response.ok) {
//           console.log(`Recipe ID ${recipe.id} deleted successfully.`);
          
//           onRecipeUpdate(); 
//         } else {
//           console.error("Failed to delete recipe with response:", response);
//         }
//         return response.json(); // Parse JSON body of the response (if any)
//       })
//       .then((data) => {
//         console.log("Response data:", data);
//       })
//       .catch((error) => console.error("Error deleting recipe:", error));
//   };

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
          <p>{recipe.directions}</p>
          {isAuthor && (
            <>
              <button className="button" onClick={handleRecipeDelete}>
                Delete Recipe
              </button>
              <button className="button" onClick={toggleEdit}>
                Edit Recipe
              </button>
            </>
          )}
        </>
      )}
    </div>
  );
}

export default RecipeCard;
