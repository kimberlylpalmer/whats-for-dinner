#app.py

#Standard library imports
from os import environ

# Local imports
from config import app, db, api
from flask import render_template
# from flask import Flask
from flask_cors import CORS
from routes.authentication.checksession import CheckSession
from routes.authentication.login import Login
from routes.authentication.logout import Logout
from routes.authentication.signup import Signup
from routes.recipe import Recipes
from routes.users import Users
from routes.user_by_id import UserById
from routes.recipe_by_id import RecipeById
from routes.favorite_recipes import FavoriteRecipes
from routes.meal_type import MealTypeResource 
# from routes.recipes_by_ingredient import RecipesByIngredient
from routes.recipes_by_meal_type import RecipesByMealType
# from routes.calendar import Calendar
from enum import Enum
from models.meal_type import MealType
from flask_restful import Api

CORS(app)
# CORS(app, supports_credentials=True, origins=['http://localhost:3000'])
# CORS(app, resources={r"/api/*": {"origins": "http://localhost:3000"}}, supports_credentials=True)

api = Api(app)

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
    existing_types = MealType.query.with_entities(MealType.type).all()  
    existing_types = [type_[0] for type_ in existing_types]  

    for meal_type in MealTypeEnum:
        if meal_type.value not in existing_types: 
            new_meal_type = MealType(type=meal_type.value)  
            db.session.add(new_meal_type)  
    
    db.session.commit()  
    print("Meal types checked and loaded successfully.")
    
#Load dotenv in the base root
from dotenv import load_dotenv

# from routes.calendar_by_id import CalendarById
load_dotenv(".env")

app.secret_key = environ.get('SECRET_KEY')

# Testing CORS route

@app.route('/test-cors', methods=['GET'])
def test_cors():
    return {'message': 'CORS is configured correctly!'}, 200



@app.route('/')
def index():
    return render_template("index.html")

@app.errorhandler(404)
def not_found(e):
    return render_template("index.html")

# '<h1>What\'s for Dinner Server</h1>'

api.add_resource(Signup, "/api/signup")
api.add_resource(Login, "/api/login")
api.add_resource(Logout, "/api/logout")
api.add_resource(CheckSession, "/api/check_session")
api.add_resource(Users, "/api/users")
api.add_resource(UserById, "/api/user/<int:id>", endpoint='userbyid')
api.add_resource(Recipes, "/api/recipes")
api.add_resource(RecipeById, "/api/recipes/<int:id>", endpoint='recipebyid')
api.add_resource(FavoriteRecipes, "/api/favorites")
# api.add_resource(RecipesByIngredient, "/recipes/ingredient/<string:ingredient_name>", endpoint='recipesbyingredient')
api.add_resource(RecipesByMealType, "/api/recipes/mealtype/<string:meal_type>", endpoint='recipesbymealtype')
# api.add_resource(Calendar, "/calendar/<int:recipe_id>")      
# api.add_resource(CalendarById, "/calendar/<int:id>", endpoint="calendar_by_id")
api.add_resource(MealTypeResource, '/api/meal_type')


if __name__=="__main__":
    with app.app_context():
        load_meal_types()
    app.run(port=5555, debug=True) 