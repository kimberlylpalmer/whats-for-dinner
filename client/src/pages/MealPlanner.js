// import React, { useState, useEffect } from 'react';
// import NavBar from "../components/NavBar";
// import { useNavigate } from "react-router-dom";
// // import { useDrag } from 'react-dnd';
// // import { ItemTypes } from './Constants'

// function MealPlanner() {
//   const [recipes, setRecipes] = useState([]);
//   const navigate = useNavigate();
  
//   const handleNavigateToUser = () => {
//     navigate("/user");
//   };
  
//   useEffect(() => {
//     const endpoint = "api/recipes";
//     fetch(endpoint)
//     .then((response) => response.json())
//     .then((data) => {
//       setRecipes(data); 
//     })
//     .catch((error) => console.error("Error fetching recipes:", error));
//   }, []);



//   return (
//     <div>
//       <header>
//         <NavBar />
//       </header>
//       <button className="button" onClick={handleNavigateToUser}>
//           Back to User Page
//         </button>
//       <h1>Meal Planner</h1>
//       <div>
//         buttons will go here
//       </div>
      
//       <div>
//         <h2>Recipes</h2>
//         <ul>
//         {recipes.map(recipe => (
//             <li key={recipe.id}>{recipe.title}</li>
//           ))}
//         </ul>
//       </div>
     
//     </div>
//   );
// }

// export default MealPlanner;





// // import React, { useState, useEffect } from 'react';
// // import NavBar from "../components/NavBar";
// // import { useNavigate } from "react-router-dom";

// // function MealPlanner() {
// //   const [mealTypes, setMealTypes] = useState([]);
// //   const [selectedMealTypes, setSelectedMealTypes] = useState([]);
// //   const [numRecipes, setNumRecipes] = useState(3);
// //   const [plannedMeals, setPlannedMeals] = useState({});
// //   const navigate = useNavigate();

// //   useEffect(() => {
// //     // Fetch meal types from your API
// //     fetch('/api/meal_type')
// //       .then(response => response.json())
// //       .then(data => setMealTypes(data.meal_types || []))
// //       .catch(error => console.error("Error fetching meal types:", error));
// //   }, []);

// //   const handleMealTypeChange = (event) => {
// //     const value = Array.from(event.target.selectedOptions, option => option.value);
// //     setSelectedMealTypes(value);
// //   };

// //   const handleNumRecipesChange = (event) => {
// //     setNumRecipes(event.target.value);
// //   };

// //   const handleSubmit = (event) => {
// //     event.preventDefault();
// //       fetch(`/api/recipes/meal-planner?${selectedMealTypes.map(mealType => `mealType=${mealType}`).join('&')}&numRecipes=${numRecipes}`)
// //     // fetch(`/api/recipes/meal-planner?${selectedMealTypes.map(mealType => `mealType=${mealType}`).join('&')}&numRecipes=${numRecipes}`)

// //       .then(response => response.json())
// //         .then(data => {
// //           console.log(data);
// //         setPlannedMeals(data)
// //       })
// //       .catch(error => console.error("Error fetching planned meals:", error));
// //   };

// //   return (
// //     <div>
// //       <h1>Meal Planner</h1>
// //       <header>
// //         <NavBar />
// //       </header>
// //       <div>
// //         <button className="button" onClick={() => navigate('/recipes')}>View Recipes</button>
// //         <button className="button" onClick={() => navigate('/user')}>
// //           Back to User Page
// //         </button>  
// //       </div>
// //       <form onSubmit={handleSubmit}>
// //         <div>
// //           <label htmlFor="mealType">Select Meal Types:</label>
// //           <select id="mealType" multiple value={selectedMealTypes} onChange={handleMealTypeChange}>
// //             {mealTypes.map((type) => (
// //               <option key={type.id} value={type.id}>{type.type}</option>
// //             ))}
// //           </select>
// //         </div>
// //         <div>
// //           <label htmlFor="numRecipes">Number of Recipes:</label>
// //           <input type="number" id="numRecipes" value={numRecipes} onChange={handleNumRecipesChange} min="1" />
// //         </div>
// //         <button type="submit">Plan Meals</button>
// //       </form>

// //       <h2>Planned Meals</h2>
// //       <div>
// //         {Object.entries(plannedMeals).map(([mealType, recipes]) => (
// //           <div key={mealType}>
// //             <h3>{mealType}</h3>
// //             <ul>
// //               {recipes.map((recipe, index) => (
// //                 <li key={index}>{recipe.title}</li>
// //               ))}
// //             </ul>
// //           </div>
// //         ))}
// //       </div>
// //     </div>
// //   );
// // }

// // export default MealPlanner;
