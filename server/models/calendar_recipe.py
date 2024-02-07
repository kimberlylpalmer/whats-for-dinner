# #calendar_recipe.py

# from config import db
# from sqlalchemy import Column, Integer, ForeignKey, DateTime
# from sqlalchemy.orm import relationship
# from datetime import datetime

# # import models



# class CalendarRecipe(db.Model):
#     __tablename__ = "calendar_recipes"
#     id = db.Column(db.Integer, primary_key=True)
#     user_id = db.Column(db.Integer, db.ForeignKey("users.id"))
#     recipe_id = db.Column(db.Integer, db.ForeignKey("recipes.id"))
#     date = db.Column(db.DateTime, default=datetime.utcnow)
#     calendar_id = db.Column(db.Integer, db.ForeignKey("calendars.id"))
        
#     user = db.relationship('User', back_populates='calendar_entries')
#     recipe = db.relationship('Recipe', back_populates='calendar_entries')
#     calendar = db.relationship('Calendar', back_populates='calendar_entries')
    
#     def __repr__(self):
#         return f"<CalendarRecipe id={self.id} user_id={self.user_id} recipe_id={self.recipe_id}>"
