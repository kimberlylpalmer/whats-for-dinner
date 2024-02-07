# #recipes_by_ingredient

# from config import db
# from models import Ingredient
# from schemas import RecipeSchema
# from flask import make_response
# from flask_restful import Resource


# class RecipesByIngredient(Resource):
#     recipe_schema = RecipeSchema(many=True)
    
#     def get(self, ingredient_name):
#         ingredient = Ingredient.query.filter_by(name=ingredient_name).first()
#         if ingredient:
#             recipes_data = self.recipe_schema.dump(ingredient.recipes)
#             return make_response(recipes_data, 200)
#         return {"error": "Ingredient not found"}, 404