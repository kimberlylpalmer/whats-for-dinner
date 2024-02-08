import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import { useAuth } from "./AuthContext";
import NavBar from "../components/NavBar"
import { useNavigate } from 'react-router-dom'

const RecipeForm = () => {
  const { user } = useAuth();
  const [mealTypes, setMealTypes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("/api/meal_type")
      .then((r) => {
        if (!r.ok) {
          throw new Error(`HTTP error! status: ${r.status}`);
        }
        return r.json();
      })
      .then((data) => {
        console.log("Fetched meal types:", data.meal_types); // Log the meal types data
        setMealTypes(data.meal_types);
      })
      .catch((error) => console.error("Error fetching meal types: ", error));
  }, []);

  const formik = useFormik({
    initialValues: {
      title: "",
      meal_type_id: "",
      cooking_time: "",
      author_id: user ? user.id : null,
      directions: "",
      image_url: "",
      ingredients: [{ name: "", measurement: "" }],
    },

    onSubmit: (values) => {
      console.log(values);
      if (!user) {
        alert("Please log in to submit a recipe.");
        // console.log("User not logged in");
        return;
      }
      const recipeData = {
        ...values,
        author_id: user.id,
      };

      // Log the final JSON payload
      console.log("Final JSON payload being sent:", JSON.stringify(recipeData));
      console.log("Headers being sent:", {
        "Content-Type": "application/json",
      });

      fetch("/api/recipes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(recipeData),
      })
        .then((response) => response.json())
        .then((data) => console.log("Recipe submitted:", data))
        .catch((error) => console.error("Error:", error));
    },
  });
  if (!user) {
    return <div>Please log in to submit a recipe.</div>;
  }
  // Function to handle adding new ingredient input
  const addIngredient = () => {
    const newIngredients = [
      ...formik.values.ingredients,
      { name: "", measurement: "" },
    ];
    formik.setFieldValue("ingredients", newIngredients);
  };

  // Function to handle removing an ingredient input
  const removeIngredient = (index) => {
    const newIngredients = formik.values.ingredients.filter(
      (_, idx) => idx !== index
    );
    formik.setFieldValue("ingredients", newIngredients);
  };
  
  const handleNavigateToUser = () => {
    navigate('/user');
}
  const handleNavigateToRecipes = () => {
    navigate('/recipes');
}


  return (
    
    <form onSubmit={formik.handleSubmit}>
      <header>
          <NavBar />
      </header>
      <div>
                <button onClick={handleNavigateToUser}>Back to User Page</button>
                <button onClick={handleNavigateToRecipes}>Back to Recipes Page</button>
            </div>
      <div>
        <h1>New Recipe</h1>
      </div>
      <label htmlFor="title" className="form-label">
        Recipe Title
      </label>
      <input
        id="title"
        name="title"
        type="text"
        onChange={formik.handleChange}
        value={formik.values.title}
        className="form-input"
      />
      <label htmlFor="meal_type_id" className="form-label">
        Meal Type
      </label>
      <br></br>
      <select
        id="meal_type_id"
        name="meal_type_id"
        onChange={formik.handleChange}
        value={formik.values.meal_type_id}
        className="form-input">
        <option value="">Select a Meal Type</option>
        {mealTypes.map((mealType) => (
          <option key={mealType.id} value={mealType.id}>
            {mealType.type}
          </option>
        ))}

        <br></br>
      </select>
      <br></br>
      <p>space between here please</p>
      <label htmlFor="title" className="form-label">
        Cooking Time
      </label>
      <br></br>
      <input
        id="cooking_time"
        name="cooking_time"
        type="time"
        onChange={formik.handleChange}
        value={formik.values.cooking_time}
        className="form-input"
      />
      <br></br>
      <label htmlFor="image_url" className="form-label">
        Image URL
      </label>
      <input
        id="image_url"
        name="image_url"
        type="text"
        onChange={formik.handleChange}
        value={formik.values.image_url}
        className="form-input"
        placeholder="Enter image URL"
      />
      <br></br>

      <label htmlFor="directions">Directions</label>
      <br></br>
      <textarea
        id="directions"
        name="directions"
        onChange={formik.handleChange}
        value={formik.values.directions}
        className="form-input"
      />
      <div>
        <label htmlFor="directions">Ingredients</label>
        {formik.values.ingredients.map((ingredient, index) => (
          <div key={index}>
            <input
              name={`ingredients[${index}].measurement`}
              value={ingredient.measurement}
              onChange={formik.handleChange}
              placeholder="Measurement"
            />
            <input
              name={`ingredients[${index}].name`}
              value={ingredient.name}
              onChange={formik.handleChange}
              placeholder="Ingredient Name"
            />
            <button type="button" onClick={() => removeIngredient(index)}>
              Remove
            </button>
          </div>
        ))}
        <button type="button" onClick={addIngredient}>
          Add Another Ingredient
        </button>
      </div>
      <button type="submit" className="button">
        Submit Recipe
      </button>
    </form>
  );
};

export default RecipeForm;
