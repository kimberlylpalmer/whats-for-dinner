import React, { useState, useEffect } from 'react';

function MealPlanner() {
  const [mealTypes, setMealTypes] = useState([]);
  const [selectedMealTypes, setSelectedMealTypes] = useState([]);
  const [numRecipes, setNumRecipes] = useState(3);
  const [plannedMeals, setPlannedMeals] = useState({});

  useEffect(() => {
    // Fetch meal types from your API
    fetch('/api/meal_type')
      .then(response => response.json())
      .then(data => setMealTypes(data.meal_types || []))
      .catch(error => console.error("Error fetching meal types:", error));
  }, []);

  const handleMealTypeChange = (event) => {
    const value = Array.from(event.target.selectedOptions, option => option.value);
    setSelectedMealTypes(value);
  };

  const handleNumRecipesChange = (event) => {
    setNumRecipes(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    fetch(`/api/meal-planner?${selectedMealTypes.map(mealType => `mealType=${mealType}`).join('&')}&numRecipes=${numRecipes}`)
      .then(response => response.json())
      .then(data => {
        setPlannedMeals(data);
      })
      .catch(error => console.error("Error fetching planned meals:", error));
  };

  return (
    <div>
      <h1>Meal Planner</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="mealType">Select Meal Types:</label>
          <select id="mealType" multiple value={selectedMealTypes} onChange={handleMealTypeChange}>
            {mealTypes.map((type) => (
              <option key={type.id} value={type.id}>{type.type}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="numRecipes">Number of Recipes:</label>
          <input type="number" id="numRecipes" value={numRecipes} onChange={handleNumRecipesChange} min="1" />
        </div>
        <button type="submit">Plan Meals</button>
      </form>

      <h2>Planned Meals</h2>
      <div>
        {Object.entries(plannedMeals).map(([mealType, recipes]) => (
          <div key={mealType}>
            <h3>{mealType}</h3>
            <ul>
              {recipes.map((recipe, index) => (
                <li key={index}>{recipe.title}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MealPlanner;
