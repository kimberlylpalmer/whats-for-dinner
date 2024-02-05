#ingredient_schema.py

from marshmallow_sqlalchemy import SQLAlchemyAutoSchema, auto_field
from marshmallow import fields, validates, ValidationError
import re
from models.ingredient import Ingredient
from config import ma, db


class IngredientSchema(SQLAlchemyAutoSchema):
    class Meta:
        model = Ingredient
        load_instance = True

    id = auto_field()
    name = fields.String(required=True, validate=lambda s: isinstance(s, str) and s.strip() != '')
    measurement = fields.String(validate=lambda s: isinstance(s, str) and s.strip() != '')
    
    
    @validates('measurement')
    def validate_measurement(self, value):
        fraction_pattern = r"^\d+/\d+$"
        number_pattern = r"^\d+(\.\d+)?$"
        known_units = ["cup", "teaspoon", "tablespoon", "ml", "l", "g", "kg", "oz"]
        unit_pattern = r"^\d+(\.\d+)?\s*(" + "|".join(known_units) + ")$"
        descriptive_measurements = ["pinch", "to taste", "as needed", "handful", "splash", "dash"]

        if not (value in descriptive_measurements or re.match(number_pattern, value) or 
                re.match(fraction_pattern, value) or re.match(unit_pattern, value)):
            raise ValidationError("Invalid measurement format.")
        
ingredient_schema = IngredientSchema(session=db.session)

