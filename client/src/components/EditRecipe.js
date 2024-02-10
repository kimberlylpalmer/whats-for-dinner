import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import { useAuth } from "./AuthContext";

const EditRecipeForm = ({ recipe, onCancel, onUpdate }) => {
  const { user } = useAuth();
  const [mealTypes, setMealTypes] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);

  const parseCookingTime = (cookingTime) => {
    const hoursMatch = cookingTime.match(/(\d+)\s*hour/);
    const minutesMatch = cookingTime.match(/(\d+)\s*minute/);
    return {
      cookingHours: hoursMatch ? hoursMatch[1] : "",
      cookingMinutes: minutesMatch ? minutesMatch[1] : "",
    };
  };
  const { cookingHours, cookingMinutes } = parseCookingTime(
    recipe.cooking_time
  );

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
      meal_type_id: recipe.meal_type_id.toString(),
      cookingHours,
      cookingMinutes,
      author_id: recipe.author_id,
      directions: recipe.directions,
      image_url: recipe.image_url,
      ingredients:
        recipe.ingredients.length > 0
          ? recipe.ingredients.map((ingredient) => ({ ...ingredient }))
          : [{ name: "", measurement: "" }],
    },

    onSubmit: (values) => {
      const cookingTime = `${
        values.cookingHours ? `${values.cookingHours} hour(s) ` : ""
      }${
        values.cookingMinutes ? `${values.cookingMinutes} minute(s)` : ""
      }`.trim();

      console.log("Updated values:", values);

      if (!user) {
        alert("Please log in to submit a recipe.");
        console.log("User not logged in");
        return;
      }
      const recipeData = {
        ...values,
        cooking_time: cookingTime,
        author_id: user.id,
      };

      delete recipeData.cookingHours;
      delete recipeData.cookingMinutes;

      console.log("Editing recipe:", recipeData);

      fetch(`/api/recipes/${recipe.id}`, {
        method: "PATCH",
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

  const toggleEditIngredient = (index) => {
    setEditingIndex(index);
  };

  const handleIngredientChange = (index, field, value) => {
    // Directly update the ingredient within formik's state
    const updatedIngredients = formik.values.ingredients.map(
      (ingredient, i) => {
        if (i === index) {
          return { ...ingredient, [field]: value };
        }
        return ingredient;
      }
    );
    formik.setFieldValue("ingredients", updatedIngredients);
  };

  const saveIngredient = () => {
    const newIngredients = [...formik.values.ingredients, { name: "", measurement: "" }];
  formik.setFieldValue("ingredients", newIngredients);
  setEditingIndex(newIngredients.length - 1);
    // Exit editing mode but do not clear the form or redirect
  };

  // Function to handle adding new ingredient input
  const addIngredient = () => {
    const newIngredients = [...formik.values.ingredients, { name: "", measurement: "" }];
    formik.setFieldValue("ingredients", newIngredients);
    setEditingIndex(newIngredients.length - 1); // Set editing to the new ingredient
  };

  // Function to handle removing an ingredient input
  const removeIngredient = (index) => {
    const newIngredients = formik.values.ingredients.filter(
      (_, idx) => idx !== index
    );
    formik.setFieldValue("ingredients", newIngredients);
    if (editingIndex >= index) {
      setEditingIndex(editingIndex - 1);
    }
  };

  const handleBlur = () => {
    // Only filter out completely blank ingredients
    const filteredIngredients = formik.values.ingredients.filter(
      (ingredient, index) => 
        index !== formik.values.ingredients.length - 1 || // Keep the last ingredient unless it's being edited
        (ingredient.name.trim() || ingredient.measurement.trim())
    );
    formik.setFieldValue('ingredients', filteredIngredients);
  };

  if (!user) {
    return <div>Please log in to edit a recipe.</div>;
  }

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
      <label htmlFor="cookingHours">Cooking Hours:</label>
      <input
        id="cookingHours"
        name="cookingHours"
        type="number"
        onChange={formik.handleChange}
        value={formik.values.cookingHours}
      />

      <label htmlFor="cookingMinutes">Cooking Minutes:</label>
      <input
        id="cookingMinutes"
        name="cookingMinutes"
        type="number"
        onChange={formik.handleChange}
        value={formik.values.cookingMinutes}
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

      <div>
        <label htmlFor="ingredients">Ingredients:</label>
        {formik.values.ingredients.map((ingredient, index) => (
          <div key={index}>
            {editingIndex === index ? (
              // Editing mode for the current ingredient
              <>
                <input
                  type="text"
                  value={ingredient.measurement}
                  onChange={(e) =>
                    handleIngredientChange(index, "measurement", e.target.value)
                  }
                  onBlur={handleBlur}
                  />
                <input
                  type="text"
                  value={ingredient.name}
                  onChange={(e) =>
                    handleIngredientChange(index, "name", e.target.value)
                  }
                  onBlur={handleBlur}
                />
                <button
                  type="button"
                  onClick={saveIngredient}
                  disabled={!ingredient.measurement.trim() || !ingredient.name.trim()}
                >
                  Save
                </button>
              </>
            ) : (
              // Viewing mode
              <>
                {`${ingredient.measurement}  ${ingredient.name}`}
                <button
                  type="button"
                  onClick={() => toggleEditIngredient(index)}>
                  Edit
                </button>
                <button type="button" onClick={() => removeIngredient(index)}>
                  X
                </button>
              </>
            )}
          </div>
        ))}
        <button
          type="button"
          onClick={addIngredient}
          disabled={
            !formik.values.ingredients[formik.values.ingredients.length - 1].name.trim() ||
            !formik.values.ingredients[formik.values.ingredients.length - 1].measurement.trim()
          }
              
        >
          Add Another Ingredient
        </button>
      </div>

      <label htmlFor="directions">Directions</label>
      <br></br>
      <textarea
        id="directions"
        name="directions"
        onChange={formik.handleChange}
        value={formik.values.directions}
        className="form-input"
      />
      <button type="submit" className="button">
        Edit Recipe
      </button>
      <button className="button" type="button" onClick={onCancel}>
        Cancel
      </button>
    </form>
  );
};

export default EditRecipeForm;
