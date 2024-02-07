#recipe_ingredient_schema.py

# from marshmallow_sqlalchemy import SQLAlchemyAutoSchema, auto_field
# from models.recipe_ingredient import RecipeIngredient

# class RecipeIngredientSchema(SQLAlchemyAutoSchema):
#     class Meta:
#         model = RecipeIngredient
#         load_instance = True

#     id = auto_field()
#     recipe_id = auto_field()
#     ingredient_id = auto_field()