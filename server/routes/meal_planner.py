
# from flask_restful import Resource, reqparse, abort
# from models.recipe import Recipe
# from schemas.recipe_schema import recipe_schema
# import random

# class MealPlanner(Resource):
#     def get(self):
#         try:
#             parser = reqparse.RequestParser()
#             parser.add_argument('mealType', action='append')
#             parser.add_argument('numRecipes', type=int, default=3)
#             args = parser.parse_args()
            
#             print(f"Requested meal types: {args['mealType']}")
#             print(f"Requested number of recipes: {args['numRecipes']}")
            
#             if not args['mealType']:
#                 abort(400, message="No meal types provided.")

#             all_recipes = []
#             for meal_type_id in args['mealType']:
#                 recipes = Recipe.query.filter_by(meal_type_id=meal_type_id).all()
#                 all_recipes.extend(recipes)
                
#             if not all_recipes:
#                 abort(404, message="no recipes found.")
                
#                 print(f"Found {len(recipes)} recipes for meal type {meal_type_id}")
                
#                 # Randomly select recipes up to the numRecipes limit
#             selected_recipes = random.sample(all_recipes, min(len(all_recipes), args['numRecipes']))
#             # Serialize the selected recipes
#             serialized_recipes = recipe_schema.dump(selected_recipes, many=True)
            
#             # Optionally, group recipes by mealType if needed
#             grouped_recipes = {}
#             for recipe in serialized_recipes:
#                 meal_type = recipe['meal_type_id']
#                 if meal_type not in grouped_recipes:
#                     grouped_recipes[meal_type] = []
#                 grouped_recipes[meal_type].append(recipe)
            
#             return grouped_recipes if grouped_recipes else abort(404, message="No recipes found.")
#         except Exception as e:
#             print(f"An error occurred: {str(e)}")
#             abort(500, message=str(e))


