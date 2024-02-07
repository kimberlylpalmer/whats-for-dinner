import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import { useAuth } from "./AuthContext";




const EditRecipeForm = ({recipe, onCancel, onUpdate}) => {
    const { user } = useAuth();
    const [mealTypes, setMealTypes] = useState([]);

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
      title: recipe.title,
      meal_type_id: recipe.meal_type_id,
      cooking_time: recipe.cooking_time,
      author_id: recipe.author_id,
      directions: recipe.directions,
      image_url: recipe.image_url,
          ingredients: recipe.ingredients.map(ingredient => ({
              name: ingredient.name,
              measurement: ingredient.measurement,
          })),
    },

    onSubmit: (values) => {
      console.log("Updated values:", values);
      if (!user) {
        alert("Please log in to submit a recipe.");
        console.log("User not logged in");
        return;
      }        
      const recipeData = {
        ...values,
        author_id: user.id,
      };
      console.log("Editing recipe:", recipeData);

      fetch(`/api/recipes/${recipe.id}`, {
          method: "PATCH",
          // credentials: 'include',
        headers: {
            "Content-Type": "application/json",
          },
            body: JSON.stringify(recipeData),
      })
          .then((response) => {
              console.log("Raw fetch response:", response);
              if (!response.ok) {
                  console.error("Fetch response was not OK:", response.statusText);
              }
              return response.json();
          })
          .then((data) => {
            console.log("Recipe updated:", data);
            onUpdate(data);
            onCancel();
        })
            .catch((error) => console.error("Error updating recipe:", error));
    },
  });
  if (!user) {
    return <div>Please log in to edit recipe.</div>;
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

  return (
    <form onSubmit={formik.handleSubmit}>
      <div>
        <h1>Edit Recipe</h1>
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
      </select>
      <br></br>
      <p>space between here please</p>
      <label htmlFor="cooking_time" className="form-label">
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
            <button className="button" type="button" onClick={() => removeIngredient(index)}>
              Remove
            </button>
          </div>
        ))}
        <button className="button" type="button" onClick={addIngredient}>
          Add Another Ingredient
        </button>
      </div>
      <button type="submit" className="button">
        Edit Recipe
          </button>
          <button className="button" type="button" onClick={onCancel}>Cancel</button>

    </form>
  );
};

export default EditRecipeForm;
