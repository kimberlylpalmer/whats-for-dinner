#meal_type.py

from config import db
from sqlalchemy.orm import relationship, validates
from datetime import datetime

class MealType(db.Model):
    __tablename__ = "meal_types"
    id = db.Column(db.Integer, primary_key=True)
    type = db.Column(db.String, nullable=False)

    # Relationship
    recipes = db.relationship("Recipe", back_populates="meal_type")
    
    @validates("type")
    def validate_type(self, key, type):
        if not isinstance(type, str):
            raise TypeError("Type must be a string")
        return type

    def __repr__(self):
        return f"<MealType {self.type}>"