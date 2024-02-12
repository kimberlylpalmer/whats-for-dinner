import React, { useEffect, useState } from "react";
import defaultImage from "../assets/pexels-karolina-grabowska-4033639.jpg";
import { useAuth } from "../components/AuthContext";
import EditRecipeForm from "./EditRecipe";
import { useNavigate } from "react-router-dom";

function RecipeCard({ recipe, onRecipeUpdate, onRecipeDelete }) {
  const { user, authenticated } = useAuth();
  const isAuthor = user && recipe.author_id === user.id;
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();
  const [isFavorited, setIsFavorited] = useState(false);
  const [mealTypes, setMealTypes] = useState([])

  useEffect(() => {
    if (authenticated) {
      fetch(`/api/favorites`, {
        method: 'GET',
        credentials: 'include',
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then(response => {
          if (!response.ok) {
            throw new Error("failed to fetch favorite recipes");
          }
          return response.json();
        })
        .then(favoriteRecipes => {
          const isFavorite = favoriteRecipes.some((favRecipe) => favRecipe.id === recipe.id);
          setIsFavorited(isFavorite);
        })
        .catch(error => {
          console.error("Error fetching favorite recipes:", error);
        });
    }

  }, [recipe.id, authenticated]);

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

  const toggleFavorite = () => {
    if (user) {
      console.log("1. Toggling favorite for recipe_id:", recipe.id);

      fetch(`/api/favorites`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // "Authorization": `Bearer ${user.token}`, // Assuming you have a token for authorization
        },
        body: JSON.stringify({ recipe_id: recipe.id }),
      })
        .then(response => {
          if (!response.ok) {
          console.error("2. Response not OK, status:", response.status);
          return response.text();
        }
         return response.json();
        })
        .then(data => {
          console.log("3. Toggle favorite response data:", data);
          // setIsFavorited(data.isFavorited);
          setIsFavorited(prevState => !prevState);
      })
      .catch(error => console.error("4. Error toggling favorite:", error));
    }
  };

  useEffect(() => {
    fetch('/api/meal_type')
      .then(r => r.json())
      .then(data => {
        setMealTypes(data.meal_types || []);
      })
      .catch(error => console.error('failed to fetch meal type', error));
  }, []);

  const getMealTypeName = (mealTypeId) => {
    const mealType = mealTypes.find(type => type.id === mealTypeId);
    return mealType ? mealType.type : 'Unknown';
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
          <h2>{recipe.title}  {isFavorited && <span style={{color: 'red'}}>❤️</span>}</h2>
                {/* {authenticated && (
          <button className="button favorite-button" onClick={toggleFavorite} style={{margin: "10px 0"}}>
            {isFavorited ? "❤️" : "♡ Favorite Me!"}
          </button>
            )} */}
            
          <div className="image-container">
            <img
              className="recipe-image"
              src={recipe.image_url || defaultImage}
              alt={recipe.title}
            />
          </div>
            {/* <p>Meal Type: {recipe.meal_type_id}</p> */}
            
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
