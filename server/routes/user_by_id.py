from flask import make_response, request, session, abort 
from sqlalchemy.exc import IntegrityError
from flask_restful import Resource
from models import User
from schemas.user_schema import UserSchema
from config import db
from marshmallow import ValidationError


user_schema = UserSchema()

class UserById(Resource):
    def get(self, id):
        user = User.query.get(id)
        if user:
            return make_response(user_schema.dump(user), 200)
        return {"error": "User not found"}, 404
    
    def patch(self, id):
        if "user_id" not in session or session["user_id"] != id:
            return {"message": "Not authorized"}, 403
        user = User.query.get_or_404(id)
        try:
            data = request.get_json()
            updated_user = user_schema.load(data, instance=user, partial=True, session=db.session)
            db.session.commit()
            return user_schema.dump(updated_user), 200
        except IntegrityError:
            db.session.rollback()
            return {"message": "Email or username already in use"}, 400
        except ValidationError as e:
            db.session.rollback()
            return {"message": str(e.messages)}, 422
        
    def delete(self, id):
        user = User.query.get_or_404(
            id, description=f"Could not find user {id}"
        )
        if "user_id" not in session:
            return {"message": "Not authorized"}, 403
        currentUser = db.session.get(User, session["user_id"])
        if user.id == currentUser.id:
            try:
                db.session.delete(user)
                db.session.commit()
                return None, 204
            except Exception as e:
                db.session.rollback()
                abort(400, str(e))
        return {"message": "Not Authorized"}, 403