#signup.py
from flask import request, session
from flask_restful import Resource
from sqlalchemy.exc import IntegrityError
from marshmallow import ValidationError
from config import db
from models import User
from schemas import UserSchema



class Signup(Resource):
    def post(self):
        # user_schema = UserSchema()  # now global
        try:
            raw_data = request.get_json()
            user_schema = UserSchema(session=db.session)
            
            data = {
                "first_name": raw_data.get("first_name", "").title(),
                "last_name": raw_data.get("last_name", "").title(),
                "username": raw_data.get("username", "").lower(),
                "email": raw_data.get("email", "").lower(),
                "password": raw_data.get("password")
            }
            
            user = user_schema.load(data)
            
            db.session.add(user)
            db.session.commit()
            session['user_id'] = user.id
            
            return user_schema.dump(user), 201
        except IntegrityError as e:
            db.session.rollback()
            print(e)
            return {"error": "Email or username already in use"}, 400
        except ValidationError as e:
            db.session.rollback()
            return {"errors": e.messages}, 400
        except Exception as e:
            db.session.rollback()
            return {"error": str(e)}, 400