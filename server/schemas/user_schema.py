#user_schema.py

from marshmallow import pre_load, ValidationError, validates_schema, fields, validate
from marshmallow_sqlalchemy import SQLAlchemyAutoSchema, auto_field
from models.user import User
from config import ma, db

class UserSchema(SQLAlchemyAutoSchema):
    class Meta:
        model = User
        load_instance = True
        sqla_session = db.session 
        include_fk = True
        fields = ("id", "username", "email", "first_name", "last_name", "password")

    id = auto_field()
    username = fields.String(required=True, validate=validate.Length(min=5, max=50, error="Username must be between 5-50 characters"))
    email = auto_field(required=True)
    first_name = fields.String(required=True, validate=validate.Length(min=1, max=50, error="First name must be between 1-50 characters"))
    last_name = fields.String(required=True, validate=validate.Length(min=1, max=50, error="Last name must be between 1-50 characters"))
    password = fields.Str(load_only=True)
    
    url = ma.Hyperlinks({
        'self': ma.URLFor('UserById', id='<id>'),
        'favorites': ma.URLFor('FavoriteRecipes', user_id='<id>'),
        'authored_recipes': ma.URLFor('Recipes', author_id='<id>'),
        'calendar': ma.URLFor('CalendarById', id='<id>')
    })
    
    @pre_load
    def process_input(self, data, **kwargs):
        return data