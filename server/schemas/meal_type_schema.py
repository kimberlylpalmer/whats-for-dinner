#meal_type_schema.py

from marshmallow import Schema, fields, validates_schema, ValidationError
from models.meal_type import MealType
from enum import Enum

class MealTypeEnum(Enum):
    BEEF = "Beef"
    POULTRY = "Poultry"
    SEAFOOD = "Seafood"
    PORK = "Pork"
    LAMB = "Lamb"
    APPETIZERS = "Appetizers"
    SIDES = "Side Dishes"
    SOUPS = "Soups"
    PASTA_GRAINS = "Pasta, Grains, & Rice"
    POTATOES = "Potatoes, Beans, & Legumes"
    SALADS_VEGETABLES = "Salads & Vegetables"
    BREADS = "Breads"
    SWEETS = "Desserts"
    DRINKS = "Drinks"

class MealTypeSchema(Schema):
    id = fields.Int(dump_only=True)
    type = fields.String(required=True)
    
    @validates_schema
    def validate_type(self, data, **kwargs):
        if data['type'] not in MealTypeEnum._value2member_map_:
            raise ValidationError(f"Invalid meal type. Must be one of: {list(MealTypeEnum._value2member_map_.keys())}")

