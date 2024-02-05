from flask import request, make_response
from flask_restful import Resource
from config import db
from models import Recipe, Ingredient
from schemas.recipe_schema import recipe_schema


# recipe_schema = RecipeSchema()

class Recipes(Resource):
    # recipe_schema = RecipeSchema(many=True)
    def get(self):
        try:
            print("Fetching recipes...")
            recipes = Recipe.query.all()
            print("Recipes fetched:", recipes)
            
            serialized_data = recipe_schema.dump(recipes, many=True)
            print("Serialized data:", serialized_data)
            return make_response(serialized_data, 200)
        except Exception as e:
            print("Error in GET /recipes:", str(e))
        
        
    def post(self):
        print("Hello World")
        # recipe_schema = RecipeSchema()
        try:
            data = request.get_json()
            
            ingredient_data = data.pop('ingredients', [])
                        
            recipe = recipe_schema.load(data)
            
            db.session.add(recipe)
            
            #Handle Ingredients
            for ing in ingredient_data:
                ingredient = Ingredient.query.filter_by(name=ing['name']).first()
                if not ingredient:
                    ingredient = Ingredient(name=ing['name'], measurement=ing.get('measurement'))  # Create new ingredient
                    db.session.add(ingredient)
                recipe.ingredients.append(ingredient)
            
            db.session.commit()
            print("Recipe committed to database with image URL if provided.")
            serialized_data = recipe_schema.dump(recipe)
            print("Serialized Recipe Data:", serialized_data)
            
            return make_response(recipe_schema.dump(recipe), 201)
        except Exception as e:
            print("Error:", str(e))
            db.session.rollback()
            return {"error": str(e)}, 400