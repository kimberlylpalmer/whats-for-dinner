#user_favorite_schema.py

from marshmallow_sqlalchemy import SQLAlchemyAutoSchema, auto_field
from models.user_favorite import UserFavorite
from config import ma

class UserFavoriteSchema(SQLAlchemyAutoSchema):
    class Meta:
        model = UserFavorite
        load_instance = True

    user_id = auto_field()
    recipe_id = auto_field()
    
    url = ma.Hyperlinks({
        'user': ma.URLFor('UserById', id='<user_id>'),
        'recipe': ma.URLFor('RecipeById', id='<recipe_id>')
    })
    
    
    