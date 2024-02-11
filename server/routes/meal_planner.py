from flask_restful import Resource, reqparse
from models.recipe import Recipe
from schemas.recipe_schema import recipe_schema
import random

class MealPlanner(Resource):
    def get(self):
        parser = reqparse.RequestParser()
        parser.add_argument('mealType', action='append')
        parser.add_argument('numRecipes', type=int, default=3)
        args = parser.parse_args()
        
        print(f"Requested meal types: {args['mealType']}")
        print(f"Requested number of recipes: {args['numRecipes']}")

        selected_recipes = {}
        for meal_type_id in args['mealType']:
            recipes = Recipe.query.filter_by(meal_type_id=meal_type_id).all()
            print(f"Found {len(recipes)} recipes for meal type {meal_type_id}")
            
            if recipes:
                shuffled_recipes = random.sample(recipes, min(len(recipes), args['numRecipes']))
                selected_recipes[meal_type_id] = recipe_schema.dump(shuffled_recipes, many=True)
            else:
                selected_recipes[meal_type_id] = []
                print(f"No recipes found for meal type {meal_type}")
        
        print("Selected recipes:", selected_recipes)
        return selected_recipes


