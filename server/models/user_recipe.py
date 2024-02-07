#user_recipe.py

from config import db

class UserRecipe(db.Model):
    __tablename__ = "user_recipes"
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"))
    recipe_id = db.Column(db.Integer, db.ForeignKey("recipes.id"))
    
    user = db.relationship('User', back_populates='recipes')
    recipe = db.relationship('Recipe', back_populates='users')
    
    
    def __repr__(self):
        return f"<UserRecipe id{self.id} user_id={self.user_id} recipe_id={self.recipe_id}>"
