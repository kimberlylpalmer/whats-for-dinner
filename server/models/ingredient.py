# from config import db
# from sqlalchemy.orm import relationship, validates
# from datetime import datetime

# class Ingredient(db.Model):
#     __tablename__ = "ingredients"
#     id = db.Column(db.Integer, primary_key=True)
#     name = db.Column(db.String(100), nullable=False, unique=True)
#     measurement = db.Column(db.String)

#     # Relationship
#     recipes = db.relationship(
#         "Recipe", secondary="recipe_ingredients", back_populates="ingredients"
#     )
    
#     @validates("name")
#     def validate_name(self, key, name):
#         if not isinstance(name, str):
#             raise TypeError("Name must be a string")
#         elif len(name) < 1:
#             raise ValueError("Name must be at least 1 character.")
#         return name.title()
    
#     @validates("measurement")
#     def validate_measurement(self, key, measurement):
#         if not isinstance(measurement, str):
#             raise TypeError("Measurement must be a string")
#         elif len(measurement) < 1:
#             raise ValueError("Measurement must be at least 1 charachter.")
#         return measurement
    
#     def __repr__(self):
#         return f"<Ingredient {self.name}>"