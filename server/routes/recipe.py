from flask import request, make_response
from flask_restful import Resource
from config import db
from models import Recipe
from schemas.recipe_schema import recipe_schema
from sqlalchemy.exc import IntegrityError


# recipe_schema = RecipeSchema()

class Recipes(Resource):
    # recipe_schema = RecipeSchema(many=True)
    def get(self):
        try:
            print("Fetching recipes...")
            recipes = Recipe.query.all()
            print("Recipes fetched:", recipes)
            
            serialized_data = recipe_schema.dump(recipes, many=True)
            print("checking ingredients format in serialized data:")
            for recipe in serialized_data:
                print(recipe.get('ingredients', 'no ingredients field found'))    
            print("Serialized data:", serialized_data)
            return make_response(serialized_data, 200)
        except Exception as e:
            print("Error in GET /recipes:", str(e))
        
        
    def post(self):
        print("Hello World")
        # recipe_schema = RecipeSchema()
        try:
            # db.session.begin()
            data = request.get_json()            
            # ingredient_data = data.pop('ingredients', [])                        
            recipe = recipe_schema.load(data)            
            db.session.add(recipe)
                
            db.session.commit()
            return make_response(recipe_schema.dump(recipe), 201)

           
        except Exception as e:
            db.session.rollback()
            print("Error:", str(e))
            return {"error": f"Unexpected error: {str(e)}"}, 400