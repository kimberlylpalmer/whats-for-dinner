import React, { useState, useEffect, useRef } from "react";
import { useFormik } from "formik";
import { useAuth } from "./AuthContext";
import NavBar from "../components/NavBar";
import { useNavigate } from "react-router-dom";

const RecipeForm = () => {
  const { user } = useAuth();
  const [mealTypes, setMealTypes] = useState([]);
  const navigate = useNavigate();
  const measurementInputRef = useRef(null);

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
      cookingHours: "",
      cookingMinutes: "",
      author_id: user ? user.id : null,
      directions: "",
      image_url: "",
      ingredients: [{ name: "", measurement: "" }],
    },

    onSubmit: (values) => {
      //Fliter out blank ingredients
      const filteredIngredients = values.ingredients.filter((ingredient, index) => {
        // Keep all but the last ingredient OR any ingredient that is not blank
        return index < values.ingredients.length - 1 || (ingredient.name.trim() && ingredient.measurement.trim());
      });


      const { cookingHours, cookingMinutes, ...rest } = values;
      const cookingTime = `${cookingHours ? `${cookingHours} hour(s)` : ""} ${
        cookingMinutes ? `${cookingMinutes} minute(s)` : ""
      }`.trim();

      console.log(values);
      if (!user) {
        alert("Please log in to submit a recipe.");
        return;
      }
      const recipeData = {
        ...rest,
        cooking_time: cookingTime,
        ingredients: filteredIngredients, //filtered ingredients to remove blanks
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
        .then((r) => r.json())
        .then((data) => {
          console.log("Recipe submitted:", data);
          navigate("/recipes");
        })
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

    if (measurementInputRef.current) {
      measurementInputRef.current.focus();
    }
    // Optionally, focus the next input field if desired
  };

  const removeIngredient = (index) => {
    const newIngredients = formik.values.ingredients.filter(
      (_, idx) => idx !== index
    );
    formik.setFieldValue("ingredients", newIngredients);
  };

  const handleNavigateToUser = () => {
    navigate("/user");
  };
  const handleNavigateToRecipes = () => {
    navigate("/recipes");
  };

  return (
    <form onSubmit={formik.handleSubmit}>
      <header>
        <NavBar />
      </header>

      <div>
        <button className="button" onClick={handleNavigateToUser}>
          Back to User Page
        </button>
        <button className="button" onClick={handleNavigateToRecipes}>
          Back to Recipes
        </button>
      </div>
      <div className="NewRecipeContainer">
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
        </select>
        <div className="time-section ">
          <h4 className="form-label">Prep/Cooking Time:</h4>
          <div className="time-inputs">
            <div className="time-input">
              <label htmlFor="cookingHours">Hours: </label>
              <input
                id="cookingHours"
                name="cookingHours"
                type="number"
                onChange={formik.handleChange}
                value={formik.values.cookingHours}
              />
            </div>
            <div className="time-input">
              <label htmlFor="cookingMinutes">Minutes:</label>
              <input
                id="cookingMinutes"
                name="cookingMinutes"
                type="number"
                onChange={formik.handleChange}
                value={formik.values.cookingMinutes}
              />
            </div>
          </div>
        </div>

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

        <div>
          <lable htmlFor="Ingredients">Ingredients: </lable>
          {formik.values.ingredients.slice(0, -1).map((ingredient, index) => (
            <div key={index}>
              <span>
                {ingredient.measurement} - {ingredient.name}
              </span>
              <button
                className="ingredient-button"
                type="button"
                onClick={() => removeIngredient(index)}>
                X
              </button>
            </div>
          ))}

          <div>
            <label
              htmlFor={`measurement-${formik.values.ingredients.length - 1}`}>
              Measurement:  
            </label>
            <input
              ref={measurementInputRef}
              name={`ingredients[${
                formik.values.ingredients.length - 1
              }].measurement`}
              placeholder="Measurement"
              value={
                formik.values.ingredients[formik.values.ingredients.length - 1]
                  .measurement
              }
              onChange={formik.handleChange}
            />
            <label
              htmlFor={`ingredient-name-${
                formik.values.ingredients.length - 1
              }`}>
              Ingredient Name:  
            </label>
            <input
              name={`ingredients[${formik.values.ingredients.length - 1}].name`}
              placeholder="Ingredient Name"
              value={
                formik.values.ingredients[formik.values.ingredients.length - 1]
                  .name
              }
              onChange={formik.handleChange}
              onKeyDown={(e) => {
                if (e.key === "Enter" && e.currentTarget.value) {
                  e.preventDefault();
                  addIngredient();
                }
              }}
            />
          </div>
          <button type="button" className="button" onClick={addIngredient}>
            Add Another Ingredient
          </button>
        </div>
        <label htmlFor="directions">Directions</label>
        <p>Please enter each step on a new line. Example:</p>
        <div className="directions-example">
          Step 1: Mix the ingredients.
          <br />
          Step 2: Bake for 50 minutes.
          <br />
          Step 3: Let it cool.
        </div>
        <textarea
          id="directions"
          name="directions"
          onChange={formik.handleChange}
          value={formik.values.directions}
          className="form-input"
          rows="10"
        />
      </div>
      <button type="submit" className="button">
        Submit Recipe
      </button>
    </form>
  );
};

export default RecipeForm;
