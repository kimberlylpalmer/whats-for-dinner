#app.py

#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import Flask, request, make_response, session, jsonify
from flask_restful import Resource, Api


# Local imports
from config import app, db, api
# Add your model imports
from models import User, Recipe, Ingredient, MealType, Calendar, UserRecipe, RecipeIngredient



# Views go here!

@app.route('/')
def index():
    return '<h1>What\'s for Dinner Server</h1>'


if __name__ == '__main__':
    app.run(port=5555, debug=True)

