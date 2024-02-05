#app.py

#!/usr/bin/env python3

#FOR FLASK SHELL TESTING
# from app import app, db
# from models import Recipe, Ingredient  # adjust imports based on your application structure

# @app.shell_context_processor
# def make_shell_context():
#     return {'db': db, 'Recipe': Recipe, 'Ingredient': Ingredient}

    
#Standard library imports
from os import environ

# Local imports
from config import app, db, api
from routes.authentication.checksession import CheckSession
from routes.authentication.login import Login
from routes.authentication.logout import Logout
from routes.authentication.signup import Signup
from routes.recipe import Recipes
from routes.users import Users
from routes.user_by_id import UserById
from routes.recipe_by_id import RecipeById
from routes.favorite_recipes import FavoriteRecipes
from routes.recipes_by_ingredient import RecipesByIngredient
from routes.recipes_by_meal_type import RecipesByMealType
from routes.calendar import Calendar
from enum import Enum
from models.meal_type import MealType

class MealTypeEnum(Enum):
    BEEF = "Beef"
    POULTRY = "Poultry"
    SEAFOOD = "Seafood"
    PORK = "Pork"
    LAMB = "Lamb"
    APPETIZERS = "Appetizers"
    SIDES = "Side Dishes"
    SOUPS = "Soups"
    PASTA_GRAINS = "Pasta, Grains, & Rice"
    POTATOES = "Potatoes, Beans, & Legumes"
    SALADS_VEGETABLES = "Salads & Vegetables"
    BREADS = "Breads"
    SWEETS = "Desserts"
    DRINKS = "Drinks"
    
def load_meal_types():
    existing_types = MealType.query.with_entities(MealType.type).all()  # Check what's already in the fridge
    existing_types = [type_[0] for type_ in existing_types]  # Make a simple list of what we found

    for meal_type in MealTypeEnum:
        if meal_type.value not in existing_types:  # If we don't have it in the fridge
            new_meal_type = MealType(type=meal_type.value)  # Go shopping for it
            db.session.add(new_meal_type)  # Add it to our shopping cart
    
    db.session.commit()  # Pay for everything in the shopping cart once
    print("Meal types checked and loaded successfully.")
    
#Load dotenv in the base root
from dotenv import load_dotenv

from routes.calendar_by_id import CalendarById
load_dotenv(".env")

app.secret_key = environ.get('SECRET_KEY')




@app.route('/')
def index():
    return '<h1>What\'s for Dinner Server</h1>'

api.add_resource(Signup, "/signup")
api.add_resource(Login, "/login")
api.add_resource(Logout, "/logout")
api.add_resource(CheckSession, "/check_session")
api.add_resource(Users, "/users")
api.add_resource(UserById, "/user/<int:id>", endpoint='userbyid')
api.add_resource(Recipes, "/recipes")
api.add_resource(RecipeById, "/recipes/<int:id>", endpoint='recipebyid')
api.add_resource(FavoriteRecipes, "/favorites")
api.add_resource(RecipesByIngredient, "/recipes/ingredient/<string:ingredient_name>", endpoint='recipesbyingredient')
api.add_resource(RecipesByMealType, "/recipes/mealtype/<string:meal_type>", endpoint='recipesbymealtype')
api.add_resource(Calendar, "/calendar/<int:recipe_id>")      
api.add_resource(CalendarById, "/calendar/<int:id>", endpoint="calendar_by_id")


if __name__=="__main__":
    with app.app_context():
        load_meal_types()
    app.run(port=5555, debug=True)  
    