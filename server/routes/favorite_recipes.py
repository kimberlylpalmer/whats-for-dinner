#favorite_recipes.py

from flask import request, session, make_response
from flask_restful import Resource
from models import UserFavorite
from schemas import RecipeSchema
from config import db




class FavoriteRecipes(Resource):
    recipe_schema = RecipeSchema(many=True)
    
    def get(self):
        user_id = session.get("user_id")
        if user_id:
            user = User.query.get(user_id)
            if not user:
                return {"error": "User not found"}, 404
            
            favorite_recipes_data = self.recipe_schema.dump(user.favorite_recipes)
            return make_response(favorite_recipes_data, 200)
        return {"error": "User not authenticated"}, 401
        
    def post(self):
        user_id = session.get("user_id")
        if user_id:
            recipe_id = request.json.get("recipe_id")

            # Check if the recipe already exists in favorites
            existing_favorite = UserFavorite.query.filter_by(user_id=user_id, recipe_id=recipe_id).first()
            if existing_favorite:
                return {"error": "Recipe already marked as favorite"}, 400

            # Add new favorite
            new_favorite = UserFavorite(user_id=user_id, recipe_id=recipe_id)
            db.session.add(new_favorite)
            db.session.commit()

            return {"message": "Recipe added to favorites"}, 201

        return {"error": "User not authenticated"}, 401
    
    def delete(self):
        user_id = session.get("user_id")
        if user_id:
            recipe_id = request.json.get("recipe_id")
            
            favorite = UserFavorite.query.filter_by(user_id=user_id, recipe_id=recipe_id).first()
            if not favorite:
                return {"error": "Favorite recipe not found"}, 404
            
            db.session.delete(favorite)
            db.session.commit()
            
            return {"message": "Recipe removed from favorites"}, 200
        return {"error": "User not authenticated"}, 401