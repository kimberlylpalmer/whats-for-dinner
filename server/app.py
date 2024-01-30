#app.py

#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import Flask, request, make_response, session, jsonify
from flask_restful import Resource, Api
from datetime import datetime

# Local imports
from config import app, db, api

# Add your model imports
from models import User, Recipe, Ingredient, MealType, Calendar, UserRecipe, RecipeIngredient, CalendarRecipe



# Views go here!

@app.route('/')
def index():
    return '<h1>What\'s for Dinner Server</h1>'


if __name__ == '__main__':
    app.run(port=5555, debug=True)
    

# ~~~~~~~~~~~~~USER AUTHENTICATION~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

class Signup(Resource):
    def post(self):
        try:
            data = request.get_json()
            new_user = User(
                username = data.get("username"),
                email=data.get("email"), 
                first_name=data.get("first_name"),
                last_name=data.get("last_name"),                
            )
            new_user.password_hash = data.get("password")
            db.session.add(new_user)
            db.session.commit()
            session['user_id'] = new_user.id
            return make_response(new_user.to_dict(), 201)
        except ValueError as e:
            return make_response({"error" : f"{e}"}, 400)
        
api.add_resource(Signup, "/signup")

class Login(Resource):
    def post(self):
        username = request.get_json()["username"]
        password = request.get_json()["password"]
        
        user = User.query.filter_by(username=username).first()
        if user and user.authenticate(password):
            session["user_id"] = user.id
            
            favorite_recipes = [recipe.to_dict() for recipe in user.favorite_recipes]
            authored_recipes = [recipe.to_dict() for recipe in user.authored_recipes]
            
            user_data = user.to_dict()
            user_data["favorite_recipes"] = favorite_recipes
            user_data["authored_recipes"] = authored_recipes
            
            return user.to_dict(), 200
        
        session.clear()
        return {"error": "Incorrect username or password"}, 401

api.add_resource(Login, "/login")

class Logout(Resource):
    def delete(self):
        session.clear()
        return {}, 204

api.add_resource(Logout, "/logout")

class CheckSession(Resource):
    def get(self):
        user = user.query.get(session.get("user_id"))
        if user:
            return user.to_dict(), 200
        else:
            return {}, 401

api.add_resource(CheckSession, "/check_session")


# ~~~~~~~~~~~~~USER ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

class Users(Resource):
    def get(self):
        try:
            return make_response([user.to_dict() for user in User.query.all()], 200)
        except Exception as e:
            return make_response({"error": "Could not get data"}, 400)

api.add_resource(Users, "/user")

class UserById(Resource):
    def get(self, id):
        user = User.query.get(id)
        if user:
            return make_response(user.to_dict(), 200)
        return make_response({"error": "User not found"}, 404)
    
api.add_resource(UserById, "/user/<int:id>")

#~~~~~~~~~~~~~~~~~~~RECIPES~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

class Recipes(Resource):
    def get(self):
        return make_response([recipe.to_dict() for recipe in Recipe.query.all()], 200)

        
api.add_resource(Recipes, "/recipes")

class RecipeById(Resource):
    
    def patch(self, recipe_id):
        user_id = session.get("user_id")
        if user_id:
            recipe = Recipe.query.get(recipe_id)
            if recipe and recipe.author_id == user_id:
                data = request.get_json()
                for key, value in data.items():
                    if hasattr(recipe, key):
                        setattr(recipe, key, value)
                db.session.commit()
                return make_response(recipe.to_dict(), 200)
            return {"error": "Recipe not found or user not authroized to modify this recipe"}, 403
        return {"error": "User not authenticated"}, 401

api.add_resource(RecipeById, "/recipes/<int:id>")

class FavoriteRecipes(Resource):
    def get(self):
        user_id = session.get("user_id")
        if user_id:
            user = User.query.get(user_id)
            return make_response([recipe.to_dict() for recip in user.favorite_recipes], 200)
        return {"error": "User not authenticated"}, 401
    
api.add_resource(FavoriteRecipes, "/favorites")


#~~~~~~~~~~~~~~~~~~~INGREDIENTS~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
class RecipesByIngredient(Resource):
    def get(self, ingredient_name):
        ingredient = Ingredient.query.filter_by(name=ingredient_name).first()
        if ingredient:
            return make_response([recipe.to_dict() for recipe in ingredient.recipes], 200)
        return {"error": "Ingredient not found"}, 404

api.add_resource(RecipesByIngredient, "/recipes/ingredient/<string:ingredient_name>")



#~~~~~~~~~~~~~~~~~~~~~MEAL TYPE~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
class RecipesByMealType(Resource):
    def get(self, meal_type):
        meal_type_obj = MealType.query.filter_by(type=meal_type).first()
        if meal_type_obj:
            return make_response([recipe.to_dict() for recipe in meal_type_obj.recipes], 200)
        return {"error": "Meal type not found."}, 404

api.add_resource(RecipesByMealType, "/recipes/mealtype/<string:meal_type>")



#~~~~~~~~~~~~~~~~~~~~~~~CALENDAR~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
class Calendar(Resource):
    def post(self, recipe_id):
        user_id = session.get("user_id")
        if user_id:
            calendar_entry = CalendarRecipe(calendar_id=user_id, recipe_id=recipe_id)
            db.session.add(calendar_entry)
            db.session.commit()
            return {"message": "Recipe added to calendar"}, 200
        return {"error": "User not authenticated"}, 401

    def delete(self, recipe_id):
        user_id = session.get("user_id")
        if user_id:
            CalendarRecipe.query.filter_by(calendar_id=user_id, recipe_id=recipe_id).delete()
            db.session.commit()
            return {"message": "Recipe removed from calendar"}, 200
        return {"error": "User not authenticated"}, 401

api.add_resource(Calendar, "/calendar/<int:recipe_id>")



        


        

