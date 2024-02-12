import React from "react";
import RecipeCard from './RecipeCard';

function RecipeModal({ recipe, onClose }) {
    return (
      <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <RecipeCard
                    recipe={recipe}
                    onRecipeUpdate={() => { }}
                    onRecipeDelete={() => { }}
                />
            <button onClick={onClose}>Close</button>
        </div>
      </div>
    );
  }

  export default RecipeModal