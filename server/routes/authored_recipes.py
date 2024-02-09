from flask_restful import Resource
from flask import jsonify, session
from models.recipe import Recipe  # Make sure to import your Recipe model
from schemas.recipe_schema import RecipeSchema  # Import your RecipeSchema

class AuthoredRecipes(Resource):
    def get(self):
        user_id = session.get("user_id")
        if not user_id:
            return {"error": "User not authenticated"}, 401
        
        # Fetch the recipes authored by the user
        authored_recipes = Recipe.query.filter_by(author_id=user_id).all()
        
        # Serialize the recipes using your schema
        recipe_schema = RecipeSchema(many=True)
        return jsonify(recipe_schema.dump(authored_recipes))
