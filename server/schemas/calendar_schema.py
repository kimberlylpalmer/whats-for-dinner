#calendar_schema.py

from marshmallow_sqlalchemy import SQLAlchemyAutoSchema, auto_field
from marshmallow import fields
from config import ma 
from models.calendar import Calendar

class CalendarSchema(SQLAlchemyAutoSchema):
    class Meta:
        model = Calendar
        load_instance = True

    id = auto_field()
    date = fields.DateTime(format="%Y-%m-%d %H:%M:%S")
    user_id = auto_field()
    user = fields.Nested('UserSchema', only=['id', 'username'])

    url = ma.Hyperlinks(
        {
            "self": ma.URLFor("calendar_by_id", id="<id>"),
            "user": ma.URLFor("user_by_id", id="<user_id")
        }
    )