from config import db
from sqlalchemy import Column, Integer, String, ForeignKey, DateTime, Time
from sqlalchemy.orm import relationship, validates
from sqlalchemy.ext.hybrid import hybrid_property
from datetime import datetime
import bcrypt
import re




class User(db.Model):
    __tablename__ = "users"

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String, unique=True, nullable=False)
    email = db.Column(db.String, unique=True, nullable=False)
    _password_hash = db.Column(db.String, nullable=False)
    first_name = db.Column(db.String, nullable=False)
    last_name = db.Column(db.String, nullable=False)

    # Relationship
    recipes = db.relationship("Recipe", secondary="user_recipes", back_populates="users", cascade="all")
    authored_recipes = db.relationship("Recipe", back_populates="author")
    favorite_recipes = db.relationship("Recipe", secondary='user_favorites', back_populates='favorited_by')
    calendar_entries = db.relationship("CalendarRecipe", back_populates="user")
    calendars = db.relationship('Calendar', back_populates='user')
    recipes = db.relationship('UserRecipe', back_populates='user')

    @validates("first_name")
    def validate_first(self, _, first):
        if not isinstance(first, str):
            raise TypeError("First name must be a string")
        elif len(first) < 1 or len(first) > 50:
            raise ValueError("First name must be between 1-50 characters")
        return first.title()
    
    @validates("last_name")
    def validate_last(self, _, last):
        if not isinstance(last, str):
            raise TypeError("Last name must be a string")
        elif len(last) < 1 or len(last) > 50:
            raise ValueError("Last name must be between 1-50 characters")
        return last.title()
    
    @validates("username")
    def validate_username(self, _, username):
        if not isinstance(username, str):
            raise TypeError("Username must be a string")
        elif len(username) < 5 or len(username) > 50:
            raise ValueError("Username must be between 5-50 characters")
        elif not re.match(r"^[a-zA-Z0-9_-]+$", username):
            raise ValueError("Usernames may only contain alphanumeric characters, dashes(-), or underscores(_)")
        return username
    
    @validates("email")
    def validate_email(self, _, email):
        if not isinstance(email, str):
            raise TypeError("Email must be a string")
        elif len(email) < 5 or len(email) > 100:
            raise ValueError("Email must be between 5-100 characters")
        return email.strip()
    
    @property
    def password(self):
        raise AttributeError("password: write-only field")
    
    @password.setter
    def password(self, password):
        self._password_hash = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')
        
    def check_password(self, password):
        return bcrypt.checkpw(password.encode('utf-8'), self._password_hash.encode('utf-8'))
    
    def __repr__(self):
        return f"<User {self.username}>"