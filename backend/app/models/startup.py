from flask_sqlalchemy import SQLAlchemy
from geoalchemy2 import Geometry

from app import db

class Startup(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    description = db.Column(db.Text)
    industry = db.Column(db.String(50))
    size = db.Column(db.String(20))
    funding_stage = db.Column(db.String(30))
    location = db.Column(Geometry('POINT'))
    
    def __repr__(self):
        return f'<Startup {self.name}>'

class Mentor(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    expertise = db.Column(db.String(100))
    contact_info = db.Column(db.String(100))
    
    def __repr__(self):
        return f'<Mentor {self.name}>'