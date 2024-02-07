# #calendar.py

# from config import db
# from flask import session
# from flask_restful import Resource
# from models import CalendarRecipe
# from schemas.calendar_recipe_schema import CalendarRecipeSchema



# class Calendar(Resource):
#     calendar_recipe_schema = CalendarRecipeSchema()
#     def get(self):
#         user_id = session.get("user_id")
#         if user_id:
#             calendar_entries = CalendarRecipe.query.filter_by(user_id=user_id).all()
#             return self.calendar_recipe_schema.dump(calendar_entries), 200
#         else:
#             return {"error": "User not authenticated"}, 401
    
#     def post(self, recipe_id):
#         user_id = session.get("user_id")
#         if user_id:
#             calendar_entry = CalendarRecipe(user_id=user_id, recipe_id=recipe_id)
#             db.session.add(calendar_entry)
#             db.session.commit()
#             return self.calendar_recipe_schema.dump(calendar_entry), 200
#         return {"error": "User not authenticated"}, 401

#     def delete(self, recipe_id):
#         user_id = session.get("user_id")
#         if user_id:
#             calendar_entry = CalendarRecipe.query.filter_by(user_id=user_id, recipe_id=recipe_id).first()
#             if calendar_entry:
#                 db.session.delete(calendar_entry)
#                 db.session.commit()
#                 return {"error": "Recipe removed from calendar"}, 200
#             return {"error": "Calendar entry not found"}, 404
        
#         return {"error": "User not authenticated"}, 401
    