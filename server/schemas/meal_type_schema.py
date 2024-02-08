#meal_type_schema.py

from marshmallow import Schema, fields, validates_schema, ValidationError
from models.meal_type import MealType
from models.enums import MealTypeEnum


class MealTypeSchema(Schema):
    id = fields.Int(dump_only=True)
    type = fields.String(required=True)
    
    @validates_schema
    def validate_type(self, data, **kwargs):
        if data['type'] not in MealTypeEnum._value2member_map_:
            raise ValidationError(f"Invalid meal type. Must be one of: {list(MealTypeEnum._value2member_map_.keys())}")

