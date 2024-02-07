import React, { useState } from "react";
import defaultImage from '../assets/pexels-karolina-grabowska-4033639.jpg';
import { useAuth } from '../components/AuthContext';
import EditRecipeForm from './EditRecipe'


function RecipeCard({ recipe, onRecipeUpdate }) {
    const { user } = useAuth()
    const isAuthor = user && recipe.author_id === user.id
    const [isEditing, setIsEditing] = useState(false);

    const toggleEdit = () => {
        setIsEditing(!isEditing);
    };

    const handleRecipeUpdate = (updatedRecipe) => {
        onRecipeUpdate(updatedRecipe);
        setIsEditing(false);
    }


    return (
        <div className="card">
            {isEditing ? (
                <EditRecipeForm recipe={recipe} onCancel={() => setIsEditing(false)} onUpdate={handleRecipeUpdate} />
            ) : (
                <>
                    <h2>{recipe.title}</h2>
                    <div className="image-container">
                        <img className="recipe-image" src={recipe.image_url || defaultImage} alt={recipe.title} />
                    </div>
                    <p>{recipe.mealType}</p>
                    <p>{recipe.cooking_time}</p>
                    <p>{recipe.author_username}</p>
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
                            <button className="button" onClick={() => {}}>Delete Recipe</button>
                            <button className="button" onClick={toggleEdit}>Edit Recipe</button>
                        </>
                    )}
                </>
            )}
        </div>
    );
}

export default RecipeCard