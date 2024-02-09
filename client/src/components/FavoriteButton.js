import React, { useState, useEffect } from "react";

function FavoriteButton({ recipeId, isInitiallyFavorite }) {
  const [isFavorite, setIsFavorite] = useState(isInitiallyFavorite);

  const toggleFavorite = async () => {
    try {
      const response = await fetch("/api/favorites", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ recipe_id: recipeId }),
      });

      if (!response.ok) {
        throw new Error("Failed to update favorite status");
      }

      setIsFavorite(!isFavorite); // Toggle local state
    } catch (error) {
      console.error("Error toggling favorite status:", error);
    }
  };

  useEffect(() => {
    setIsFavorite(isInitiallyFavorite);
  }, [isInitiallyFavorite]);

  return (
    <button onClick={toggleFavorite} className="button">
      {isFavorite ? "♥️" : "♡"}{" "}
      {/* Solid heart for "favorited", empty heart for "not favorited" */}
    </button>
  );
}

export default FavoriteButton;
