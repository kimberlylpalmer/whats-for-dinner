from flask import make_response
from flask_restful import Resource
from models import User
from schemas import UserSchema

user_schema = UserSchema(many=True)

class Users(Resource):
    def get(self):
        try:
            users = User.query.all()
            # Serialize the list of users
            return make_response(user_schema.dump(users), 200)
        except Exception as e:
            # You can log the actual error message for debugging purposes
            return make_response({"error": "Could not get data"}, 400)