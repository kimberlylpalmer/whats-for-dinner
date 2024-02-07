#user_favorite.py

from config import db



class UserFavorite(db.Model):
    __tablename__ = 'user_favorites'
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), primary_key=True)
    recipe_id = db.Column(db.Integer, db.ForeignKey('recipes.id'), primary_key=True)
    
    def __repr__(self):
        return f"<UserFavorite user_id={self.user_id} recipe_id={self.recipe_id}>"