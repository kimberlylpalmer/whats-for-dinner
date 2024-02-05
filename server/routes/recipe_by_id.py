#recipe_by_id.py

from flask import request, session, make_response, jsonify
from flask_restful import Resource
from marshmallow import ValidationError
from config import db
from models import Recipe
from schemas import RecipeSchema


class RecipeById(Resource):
    recipe_schema = RecipeSchema()
    
    def get(self, id):
        print(f"Fetching recipe with ID: {id}")
        recipe = Recipe.query.get(id)
        if recipe:
            return make_response(self.recipe_schema.dump(recipe), 200)
        return make_response({"error": "Recipe not found"}, 404)
    
    def patch(self, recipe_id):
        user_id = session.get("user_id")
        if user_id:
            recipe = Recipe.query.get(recipe_id)
            if recipe and recipe.author_id == user_id:
                try:
                    data = self.recipe_schema.load(request.get_json(), session=db.session, partial=True)
                except ValidationError as e:
                    return {"errors": e.messages}, 400
                
                for key, value in data.items():
                    setattr(recipe, key, value)
                    
                db.session.commit()
                
                return self.recipe_schema.dump(recipe), 200
            return {"error": "Recipe not found or user not authroized to modify this recipe"}, 403
        return {"error": "User not authenticated"}, 401
    
    def delete(self, id):
        try:
            recipe = Recipe.query.get(id)
            if recipe:
                db.session.delete(recipe)
                db.session.commit()
                return make_response(jsonify({"message": "Recipe deleted successfully"}), 200)
            else:
                return make_response(jsonify({'error': 'Recipe not found'}), 404)
        except Exception as e:
        # Log the exception e
            return make_response(jsonify({'error': 'Failed to delete recipe', 'details': str(e)}), 500)
    