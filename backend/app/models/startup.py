from flask_sqlalchemy import SQLAlchemy
from geoalchemy2 import Geometry
from geoalchemy2.shape import from_shape
from backend.app import db, login_manager

class Startup(db.Model):
    __tablename__ = 'startup'
    __table_args__ = {'extend_existing': True} 

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    industry = db.Column(db.String(100))
    location = db.Column(db.String(100))
    
    def __repr__(self):
        return f'<Startup {self.name}>'
    
    def serialize(self):
        startup_data = {
            "id": self.id,
            "name": self.name,
            "industry": self.industry,
            "location": self.location,
        }

        return startup_data

class Mentor(db.Model):
    __tablename__ = 'mentor'
    __table_args__ = {'extend_existing': True} 

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False, unique=True)
    name = db.Column(db.String(100), nullable=False)
    expertise = db.Column(db.String(100))
    contact_info = db.Column(db.String(100))

    
    def __repr__(self):
        return f'<Mentor {self.name}>'
    
    def serialize(self):
        mentor_data = {
            "id": self.id,
            "user_id": self.user_id,
            "name": self.name,
            "expertise": self.expertise,
            "contact_info": self.contact_info,
        }

        return mentor_data
    

class User(db.Model):
    __tablename__ = 'user'
    __table_args__ = {'extend_existing': True}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(200), nullable=False)
    email = db.Column(db.String(200), unique=True, nullable=False)
    password = db.Column(db.String(200), nullable=False)

    def __repr__(self):
        return f'<User {self.name}>'
    
    def serialize(self):
    # adding a visited set to avoid infinite recursion when users are connected to each other
    
        user_data = {
            "id": self.id,
            "name": self.first_name,
            "email": self.email,
        }

        return user_data

# Set up user_loader    
@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))
