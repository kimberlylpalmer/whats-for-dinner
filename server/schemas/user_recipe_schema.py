#user_recipe_schema.py

from marshmallow_sqlalchemy import SQLAlchemyAutoSchema, auto_field
from models.user_recipe import UserRecipe

class UserRecipeSchema(SQLAlchemyAutoSchema):
    class Meta:
        model = UserRecipe
        load_instance = True

    id = auto_field()
    user_id = auto_field()
    recipe_id = auto_field()