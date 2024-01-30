#models.py

from config import *

from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy

from sqlalchemy import Column, Integer, String, ForeignKey, DateTime
from sqlalchemy.types import Time
from datetime import datetime
from sqlalchemy.ext.hybrid import hybrid_property
from sqlalchemy.orm import relationship, validates

import bcrypt
import re

# Models go here!

class User(db.Model, SerializerMixin):
    __tablename__ = 'users'
    
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String, unique=True, nullable=False)
    email = db.Column(db.String, unique=True, nullable=False)
    _password_hash = db.Column(db.String, nullable=False)
    
    # Relationship
    recipes = db.relationship('Recipe', secondary='user_recipes', back_populates='users', cascade='all')
    
    # Serialization rules
    serialize_rules = ('-recipes.users', '-calendar.user')
    
    #Validations
    @validates("username")
    def validate_username(self, key, username):
        if not isinstance(username, str):
            raise ValueError("Username must be a string.")
        existing_user = User.query.filter_by(username=username).first()
        if existing_user:
            raise ValueError("Username must be unique.")
        return username
    
    @validates("email")
    def validate_email(self, key, email):
        if not isinstance(email, str):
            raise ValueError("Email must be a string.")
        existing_user = User.query.filter_by(email=email).first()
        if existing_user:
            raise ValueError("Email must be unique.")
        return email
    
    @hybrid_property
    def password_hash(self):
        raise AttributeError("Password hashes are private.")  
        # return self._password_hash

    @password_hash.setter
    def password_hash(self, password):
        hashed = bcrypt.hashpw(
            password.encode("utf-8"), bcrypt.gensalt()
        )  # KLP adjusted this line for bcrypt
        self._password_hash = hashed.decode("utf-8")

    def authenticate(self, password):
        return bcrypt.checkpw(
            password.encode("utf-8"), self._password_hash.encode("utf-8")
        )  # KLP - adjusted this line for checking passwords

    def __repr__(self):
        return f"User {self.username}"
    
    

class Recipe(db.Model, SerializerMixin):
    __tablename__ = 'recipes'
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    # cooking_time = db.Column(db.Integer)
    meal_type_id = db.Column(db.Integer, ForeignKey('meal_types.id'))
    cooking_time = db.Column(Time)
    
    #Relationship
    meal_type = db.relationship('MealType', back_populates='recipes')
    ingredients = db.relationship('Ingredient', secondary='recipe_ingredients', back_populates='recipes')
    users = db.relationship('User', secondary='user_recipes', back_populates='recipes')
    
    # Serialization rules
    serialize_rules = ('-users.recipes', '-ingredients.recipes', '-meal_type.recipes')
    
    #Validations
    @validates("title")
    def validate_title(self, key, title):
        if not isinstance(title, str):
            raise ValueError("Title must not be empty")
        if len(title) > 100:
            raise ValueError("The title must not exceed 100 characters.")
        if Recipe.query.filter(Recipe.title == title).first():
            raise ValueError("The titme must be unique.")
        return title
    
    @validates('cooking_time')
    def validate_cooking_time(self, key, cooking_time):
        if not isinstance(cooking_time, Time):
            raise ValueError("Cooking time must be a valid time object.")
        return cooking_time
    
    @validates("meal_type_id")
    def validate_meal_type(self, key, meal_type_id):
        if not meal_type_id:
            raise ValueError("Meal type must be provided.")
        if not MealType.query.get(meal_type_id):
            raise ValueError("Meal type must exist.")
        return meal_type_id    

class Ingredient(db.Model, SerializerMixin):
    __tablename__ = 'ingredients'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    measurement = db.Column(db.String)
    
    #Relationship
    recipes = db.relationship('Recipe', secondary='recipe_ingredients', back_populates='ingredients')
    
    #Serialization rules
    serialize_rules = ('-recipes.ingredients',)
    
    #Validations
    @validates("name")
    def validate_name(self, key, name):
        if not isinstance(name, str):
            raise ValueError("Recipe name must be a string.")
        return name
    
    @validates("measurement")
    def validate_name(self, key, measurement):
        if not isinstance(measurement, str):
            raise ValueError("Measurement of ingredient must be a string.")
        
        fraction_pattern = r'^\d+/\d+$'
        number_pattern = r'^\d+(\.\d+)?$'
        known_units = ['cup', 'teaspoon', 'tablespoon', 'ml', 'l', 'g', 'kg', 'oz']
        unit_pattern = r'^\d+(\.\d+)?\s*(' + '|'.join(known_units) + ')$'
        
        descriptive_measurements = ['pinch', 'to taste', 'as needed', 'handful', 'splash', 'dash']
        
        if not (measurement in descriptive_measurements or
                re.match(number_pattern, measurement) or
                re.match(fraction_pattern, measurement) or
                re.match(unit_pattern, measurement)):
            raise ValueError("Invalid measurement format.")
        
        return measurement
    
    

class MealType(db.Model, SerializerMixin):
    __tablename__ = 'meal_types'
    id = db.Column(db.Integer, primary_key=True)
    type = db.Column(db.String, nullable=False)
    
    #Relationship
    recipes = db.relationship('Recipe', back_populates='meal_type')
    
    #Serialization rules
    serialize_rules = ('-recipes.meal_type',)
    
    @validates("type")
    def validate(self, key, type):
        if not isinstance(type, str):
            raise ValueError("Meal Type must be a string")
        if not type.strip():
            raise ValueError("Meal Type must not be blank")
        return type
    
class CalendarRecipe(db.Model, SerializerMixin):
    __tablename__ = 'calendar_recipes'
    calendar_id = db.Column(db.Integer, ForeignKey('calendars.id'), primary_key=True)
    recipe_id = db.Column(db.Integer, ForeignKey('recipes.id'), primary_key=True)
        

class Calendar(db.Model, SerializerMixin):
    __tablename__ = 'calendars'
    id = db.Column(db.Integer, primary_key=True)
    date = db.Column(db.DateTime, nullable=False)
    user_id = db.Column(db.Integer, ForeignKey('users.id'))
    
    #Relationship
    user = db.relationship('User', back_populates='calendars')
    recipes = db.relationship('Recipe', secondary='calendar_recipes', backref='calendars')
    
    #Serialization rules
    serialize_rules = ('-user.calendars', '-recipes.calendars')
    
    #Validations
    @validates('date')
    def validate_date(self, key, date):
        if not isinstance(date, datetime):
            raise ValueError("Date must be a valid datetime object.")
        return date
    
    @validates("user_id")
    def validate_user_id(self, key, user_id):
        if not User.query.get(user_id):
            raise ValueError("User must exist.")
        return user_id
    
    

# Association tables
class UserRecipe(db.Model, SerializerMixin):
    __tablename__ = 'user_recipes'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, ForeignKey('users.id'))
    recipe_id = db.Column(db.Integer, ForeignKey('recipes.id'))
    
    #Serialization rules
    serialize_rules = ('-user', '-recipe')

class RecipeIngredient(db.Model, SerializerMixin):
    __tablename__ = 'recipe_ingredients'
    id = db.Column(db.Integer, primary_key=True)
    recipe_id = db.Column(db.Integer, ForeignKey('recipes.id'))
    ingredient_id = db.Column(db.Integer, ForeignKey('ingredients.id'))
    
    #Serialization rules
    serialize_rules = ('-recipe', '-ingredient')
