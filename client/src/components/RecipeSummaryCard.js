import React, { useEffect, useState } from "react";
import defaultImage from "../assets/pexels-karolina-grabowska-4033639.jpg";
import { useAuth } from "../components/AuthContext";
import EditRecipeForm from "./EditRecipe";
import { useNavigate } from "react-router-dom";

function RecipeSummaryCard({ recipe, onToggleFavorite, openRecipeModal }) {
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


  console.log('openRecipeModal prop:', openRecipeModal); 

  return (
    <div className="card" >
      <img
        className="recipe-image"
        src={recipe.image_url}
        alt={recipe.title}
        style={{ width: "100%", height: "200px", objectFit: "cover" }}
      />
      <div className="card-body">
        <h2>{recipe.title}   {isFavorited && <span style={{ color: 'red' }}>❤️</span>}</h2>
        <div className="recipe-info">
        <p>Meal Type: {getMealTypeName(recipe.meal_type_id)}</p>
        <p>Author: {recipe.author_username}</p>
        </div>
        <div className="recipe-actions">
        <button className='recipecardbutton button' onClick={() => openRecipeModal(recipe)}>Open Recipe</button>
        {authenticated && (
          <button
            className="recipecardbutton favorite-button button"
            onClick={(e) => {
              e.stopPropagation(); 
              toggleFavorite();
            }}
          >
            {isFavorited ? "❤️" : "♡ Favorite Me"}
          </button>
        )}
        </div>
        </div>
    </div>
  );
}

export default RecipeSummaryCard;