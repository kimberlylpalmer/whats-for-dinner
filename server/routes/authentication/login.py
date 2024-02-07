#Local Imports
from config import db
from models import User
from schemas import UserSchema, RecipeSchema
from flask import request, session
from flask_restful import Resource
from marshmallow import ValidationError


user_schema = UserSchema(session=db.session)
recipe_schema = RecipeSchema(many=True, session=db.session)
    
class Login(Resource):
    
    def post(self):       
        try:
            # Deserialize and validate the incoming data
            raw_data = request.get_json()
            
            username = raw_data.get('username')
            password = raw_data.get('password')
            
            if username and password:
                user = User.query.filter_by(username=username).first()
                if user and user.check_password(password):  
                    session["user_id"] = user.id
                    user_data = { 
                        "id": user.id, 
                        "username": user.username,
                        "first_name": user.first_name, 
                }
                    return user_data, 200
                return {"error": "Incorrect username or password"}, 401
            return {"error": "Username and password are required"}, 400
        except ValidationError as e:
            return {"errors": e.messages}, 400
        except Exception as e:
            return {"error": str(e)}, 400
            