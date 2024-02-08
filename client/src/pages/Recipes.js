import React, {useState, useEffect} from "react";
import RecipeCard from "../components/RecipeCard";
import NavBar from "../components/NavBar";
import { useNavigate } from 'react-router-dom'
import "../styles.css"


function Recipes() {
    const [recipes, setRecipes] = useState([]);
    const navigate = useNavigate();

    const handleNavigateToUser = () => {
        navigate('/user');
    }

    const handleNavigateToRecipeForm = () => {
        navigate('/submit-recipe')
    }

    const handleRecipeUpdate = (updatedRecipe) => {
        const updatedRecipes = recipes.map(recipe => {
            if (recipe.id === updatedRecipe.id) {
                return updatedRecipe;
            }
            return recipe;
        });
        setRecipes(updatedRecipes);
    }

    useEffect(() => {
        fetch("api/recipes")
            .then(response => response.json())
            .then(data => {
                setRecipes(data);
                console.log(data); // Log to see the fetched data
            })
            .catch(error => console.error('Error fetching recipes:', error));
    }, []);

    return (
        
        <div>
            <header>
                <NavBar />
            </header>
            <h1> Recipes </h1>
            <div>
                <button onClick={handleNavigateToUser}>Back to User Page</button>
                <button onClick={handleNavigateToRecipeForm}>Add New Recipe</button>
            </div>
            <div id="recipe-container">{recipes.map(recipe => (
            <RecipeCard key={recipe.id} recipe={recipe} onRecipeUpdate={handleRecipeUpdate} />
        ))}
            </div>
        </div>
    );
}

export default Recipes;