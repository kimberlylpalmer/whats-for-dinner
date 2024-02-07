// import React, {useState, useEffect} from "react";
// import RecipeCard from "./RecipeCard";

// function RecipeContainer() {
//     const [recipes, setRecipes] = useState([]);

//     useEffect(() => {
//         fetch("http://localhost:5555/recipes")
//             .then(r =.r.json())
//             .then(data => setRecipes(data))
//             .catch((error) => console.error('Error fetching recipes:', error));
//             console.log(data)
//     }, [])

//     return (
//         <div>
//             <h1> Recipes </h1>
//             <div id="recipe-container">{recipes.map((recipe) => (
//             <RecipeCard key={recipe.id} recipe={recipe} />
//         ))}
//             </div>
//         </div>
//     );
// }

// export default RecipeContainer;