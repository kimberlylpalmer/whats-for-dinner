#recipe_ingredient

from config import db
from sqlalchemy import Column, Integer, ForeignKey


class RecipeIngredient(db.Model):
    __tablename__ = "recipe_ingredients"
    id = db.Column(db.Integer, primary_key=True)
    recipe_id = db.Column(db.Integer, db.ForeignKey("recipes.id"))
    ingredient_id = db.Column(db.Integer, db.ForeignKey("ingredients.id"))
    
    def __repr__(self):
        return f"<RecipeIngredient id={self.id} recipe_id={self.recipe_id} ingredient_id={self.ingredient_id}>"
   