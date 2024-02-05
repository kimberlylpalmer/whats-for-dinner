#calendar_by_id.py

from flask import make_response
from flask_restful import Resource
from models.calendar import Calendar
from schemas.calendar_schema import CalendarSchema

class CalendarById(Resource):
    calendar_schema = CalendarSchema()
    
    def get(self, id):
        calendar = Calendar.query.get(id)
        if calendar:
            return make_response(self.calendar_schema.dump(calendar), 200)
        return make_response({"error": "Calendar not found"}, 404)