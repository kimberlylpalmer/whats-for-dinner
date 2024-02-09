//FavoriteButton.js

import React, { useState, useEffect, useContext } from "react";
import { useAuth } from '../components/AuthContext';

function FavoriteButton({ recipeId, isFavorited }) {
  const { toggleFavorite, userFavorites, updateUserFavorites } = useAuth();
  const isInitiallyFavorite = userFavorites.includes(recipeId);
  const [isFavorite, setIsFavorite] = useState(isInitiallyFavorite);

  useEffect(() => {
    setIsFavorite(userFavorites.includes(recipeId));
  }, [userFavorites, recipeId])

  const handleToggleFavorite = async () => {
    try {
      await toggleFavorite(recipeId);
      updateUserFavorites(recipeId, !isFavorite);
      setIsFavorite(!isFavorite);
    } catch (error) {
      console.error("Error toggling favorite status:", error);
    } 
  };


  return (
    <button onClick={toggleFavorite} className="button">
      {isFavorite ? "♥️" : "♡"}{" "}
      {/* Solid heart for "favorited", empty heart for "not favorited" */}
    </button>
  );
}

export default FavoriteButton;
