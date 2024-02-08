#recipe_by_id.py

from flask import request, session, make_response, jsonify
from flask_restful import Resource
from marshmallow import ValidationError, EXCLUDE
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
    
    def patch(self, id):
        
        recipe = Recipe.query.get_or_404(id, description=f"Could not find recipe {id}")
        schema = RecipeSchema(partial=True)
        try:
            updated_data = schema.load(request.json, instance=recipe, session=db.session)
            print("Loaded data for update:", updated_data)
            
            db.session.commit()
            return schema.dump(updated_data), 200
        
        except ValidationError as err:
            print("Validation error:", err.messages)
            return {'errors': err.messages}, 400
        
        except Exception as e:
            db.session.rollback()
            print("Exception occurred:", str(e))
            return {'error': str(e)}, 500
    
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
 
            return make_response(jsonify({'error': 'Failed to delete recipe', 'details': str(e)}), 500)
    