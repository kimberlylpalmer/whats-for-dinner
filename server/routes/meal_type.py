#Route - meal_type.py
from flask import make_response, jsonify
from flask_restful import Resource
from models.meal_type import MealType
from schemas.meal_type_schema import MealTypeSchema

meal_type_schema = MealTypeSchema(many=True)

class MealTypeResource(Resource):
    def get(self):
        meal_types = MealType.query.all()
        return jsonify(meal_types=meal_type_schema.dump(meal_types))
        
        