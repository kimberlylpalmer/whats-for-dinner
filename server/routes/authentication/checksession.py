#checksession.py

# Remote library imports
from flask_restful import Resource
from flask import session
from schemas import UserSchema
from config import db
from models.user import User




class CheckSession(Resource): 
    user_schema = UserSchema(session=db.session)
    
    def get(self):  
        if "user_id" not in session:
            return {"error": "Not authorized"}, 401
        user = db.session.get(User, session["user_id"])
        if user:
            return CheckSession.user_schema.dump(user), 200
        return {"error": "Not Authorized"}, 401