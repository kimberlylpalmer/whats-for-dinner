#recipe_schema.py

from marshmallow_sqlalchemy import SQLAlchemyAutoSchema, auto_field
from marshmallow import fields, validates, validate
from models.recipe import Recipe
from .ingredient_schema import IngredientSchema
from config import ma, db


class RecipeSchema(SQLAlchemyAutoSchema):
    class Meta:
        model = Recipe
        load_instance = True
        include_fk = True
        fields = ("id", "title", "meal_type_id", "meal_type_name", "cooking_time", "author_id", "author_username", "directions", "ingredients" )
        

    id = auto_field()
    title = fields.String(required=True, validate=validate.Length(min=5, max=50, error="Title must be between 5-50 characters"))
    meal_type_id = auto_field()
    meal_type_name = fields.Method("get_meal_type_name")
    cooking_time = auto_field()
    author_id = auto_field()
    author_username = fields.Method("get_author_username")
    directions = fields.String(required=True, validate=validate.Length(min=5, error="Directions must be at least 5 characters"))
    ingredients = fields.Nested('IngredientSchema', many=True)
    image_url = fields.String(required=False)
    
    def get_meal_type_name(self, obj):
        return obj.meal_type.type if obj.meal_type else None
    
    def get_author_username(self, obj):
        return obj.author.username if obj.author else None
    
    url = ma.Hyperlinks({
        "self": ma.URLFor("recipebyid", values=dict(id="<id>")),
        'meal_type': ma.URLFor('recipesbymealtype', values=dict(meal_type='<meal_type_id>')),
        'ingredients': ma.URLFor('recipesbyingredient', values=dict(ingredient_name='<ingredients>')),
        'author': ma.URLFor('userbyid', values=dict(id='<author_id>'))
    })

recipe_schema = RecipeSchema(session=db.session)

