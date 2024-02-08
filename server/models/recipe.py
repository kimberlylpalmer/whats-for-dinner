# recipe.py

from config import db
from sqlalchemy import Column, Integer, ForeignKey, Time, Text, String
from sqlalchemy.orm import relationship, validates
from datetime import time


# import models


class Recipe(db.Model):
    __tablename__ = "recipes"
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    meal_type_id = db.Column(db.Integer, db.ForeignKey("meal_types.id"))
    # cooking_time = db.Column(db.Time)
    cooking_time = db.Column(db.String, nullable=True)
    author_id = db.Column(db.Integer, db.ForeignKey("users.id"))
    directions = db.Column(db.Text)
    image_url = db.Column(db.String, nullable=True)
    ingredients = db.Column(db.Text, nullable=False)

    # Relationship
    meal_type = db.relationship("MealType", back_populates="recipes")
    users = db.relationship("UserRecipe", back_populates="recipe")
    author = db.relationship("User", back_populates="authored_recipes")
    favorited_by = db.relationship(
        "User", secondary="user_favorites", back_populates="favorite_recipes"
    )
    @validates("title")
    def validate_type(self, key, title):
        if not isinstance(title, str):
            raise TypeError("Title must be a string")
        elif len(title) < 3:
            raise ValueError("Title must be at least 3 characters.")
        return title

    # @validates("cooking_time")
    # def validate_cooking_time(self, key, value):
    #     if not isinstance(value, time) and value is not None:
    #         raise TypeError("Cooking time must be a valid time format or None.")
    #     elif value == time(0, 0):
    #         raise ValueError("Cooking time cannot be 00:00.")
    #     return value
    
    
    def __repr__(self):
        return f"<Recipe {self.title} by User ID {self.author_id}>"

# ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~IMPLEMENT LATER~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

    # calendar_entries = db.relationship(
    #     "CalendarRecipe", back_populates="recipe", overlaps="calendars"
    # )
    # # calendars = db.relationship("CalendarRecipe", secondary="calendar_recipes", back_populates="recipes")
    # calendars = db.relationship(
    #     "Calendar",
    #     secondary="calendar_recipes",
    #     backref=db.backref("recipes", lazy="dynamic"),
    #     overlaps="calendar_entries,recipe",
    # )
    
