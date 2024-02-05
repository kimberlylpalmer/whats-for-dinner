#calendar_recipe_schema.py

from marshmallow_sqlalchemy import SQLAlchemyAutoSchema, auto_field
from marshmallow import fields
from models.calendar_recipe import CalendarRecipe
from config import ma


class CalendarRecipeSchema(SQLAlchemyAutoSchema):
    class Meta:
        model = CalendarRecipe
        load_instance = True
        include_fk = True

    id = auto_field()
    user_id = auto_field()
    recipe_id = auto_field()
    date = fields.DateTime(format="%Y-%m-%d %H:%M:%S")
    # date = auto_field()
    calendar_id = auto_field()
    
    # Date validation method - instead of restricting the dates, I want to pop a warning that it's happening in the past
    # @validates('date')
    # def validate_date(self, value):
    #     if value < datetime.utcnow():
    #         raise ValidationError('Date must be in the future.')

    # Nested relationships
    user = fields.Nested('UserSchema', only=['id', 'username'])
    recipe = fields.Nested('RecipeSchema', only=['id', 'title'])
    calendar = fields.Nested('CalendarSchema', only=['id', 'date'])
    
    url = ma.Hyperlinks(
        {
            "self": ma.URLFor("calendar_recipe_by_id", id="<id>"),
            "collection": ma.URLFor("calendar_recipes")
        }
    )