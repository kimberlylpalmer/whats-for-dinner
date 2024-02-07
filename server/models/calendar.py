# #calendar.py

# from config import db
# from sqlalchemy import Column, Integer, String, ForeignKey, DateTime, Time
# from sqlalchemy.orm import relationship, validates
# from datetime import datetime
# from models.user import User

# class Calendar(db.Model):
#     __tablename__ = "calendars"
#     id = db.Column(db.Integer, primary_key=True)
#     date = db.Column(db.DateTime, nullable=False)
#     user_id = db.Column(db.Integer, db.ForeignKey("users.id"))

#     # Relationship
#     user = db.relationship("User", back_populates="calendars")
#     calendar_entries = db.relationship('CalendarRecipe', back_populates='calendar')

#     # Validations
#     @validates("date")
#     def validate_date(self, key, date):
#         if not isinstance(date, datetime):
#             raise ValueError("Date must be a valid datetime object.")
#         return date

#     @validates("user_id")
#     def validate_user_id(self, key, user_id):
#         if not User.query.get(user_id):
#             raise ValueError("User must exist.")
#         return user_id
    
#     def __repr__(self):
#         return f"<Calendar id={self.id} date={self.date} user_id={self.user_id}>"