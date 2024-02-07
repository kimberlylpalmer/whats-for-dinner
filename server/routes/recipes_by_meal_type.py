#recipes_by_meal_type

from config import db
from models import MealType
from schemas import RecipeSchema
from flask import make_response
from flask_restful import Resource

class RecipesByMealType(Resource):
    recipe_schema = RecipeSchema(many=True)
    
    def get(self, meal_type):
        meal_type_obj = MealType.query.filter_by(type=meal_type).first()
        if meal_type_obj:
            recipes_data = self.recipe_schema.dump(meal_type_obj.recipes)
            return make_response(recipes_data, 200)
        
        return {"error": "Meal type not found."}, 404