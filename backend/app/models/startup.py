from flask_sqlalchemy import SQLAlchemy
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
        return {
            "id": self.id,
            "name": self.name,
            "industry": self.industry,
            "location": self.location,
        }

# Association table for many-to-many relationship between Mentor and Expertise
mentor_expertise = db.Table('mentor_expertise',
    db.Column('mentor_id', db.Integer, db.ForeignKey('mentor.id'), primary_key=True),
    db.Column('expertise_id', db.Integer, db.ForeignKey('expertise.id'), primary_key=True)
)

# Association table for mentors and their needed expertise
mentor_needs = db.Table('mentor_needs',
    db.Column('mentor_id', db.Integer, db.ForeignKey('mentor.id'), primary_key=True),
    db.Column('expertise_id', db.Integer, db.ForeignKey('expertise.id'), primary_key=True)
)

class Mentor(db.Model):
    __tablename__ = 'mentor'
    __table_args__ = {'extend_existing': True} 

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False, unique=True)
    name = db.Column(db.String(100), nullable=False)
    contact_info = db.Column(db.String(100))
    linkedin = db.Column(db.String(100))
    profile_icon_id = db.Column(db.Integer, default=4)  
    
    # Many-to-many relationship with Expertise (for expertises)
    expertises = db.relationship('Expertise', secondary=mentor_expertise, back_populates='mentors_expertise')

    # Many-to-many relationship with Expertise (for expertises they need)
    needed_expertises = db.relationship('Expertise', secondary=mentor_needs, backref='mentors_needing')

    
    

    def __repr__(self):
        return f'<Mentor {self.name}>'
    
    def serialize(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "name": self.name,
            "expertises": [expertise.name for expertise in self.expertises],  # List of expertise names
            "contact_info": self.contact_info,
            "linkedin": self.linkedin if self.linkedin else "",
            "mentor_needs": [expertise.name for expertise in self.needed_expertises],  # List of expertise names
            "profile_icon_id": self.profile_icon_id
            
        }

class Expertise(db.Model):
    __tablename__ = 'expertise'
    id = db.Column(db.Integer, primary_key=True)
    category_id = db.Column(db.Integer, db.ForeignKey('expertise_category.id'), nullable=False)
    name = db.Column(db.String(100), nullable=False)
    
    # Many-to-many relationship with Mentor
    mentors_expertise = db.relationship('Mentor', secondary=mentor_expertise, back_populates='expertises')
    #serialize mentor with name and id 
    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
        }
    def __repr__(self):
        return f'<Expertise {self.name}>'

class ExpertiseCategory(db.Model):
    __tablename__ = 'expertise_category'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False, unique=True)
    description = db.Column(db.String(255), nullable=True)
    
    # One-to-many relationship with Expertise
    expertise = db.relationship('Expertise', backref='category', lazy=True)

    def __repr__(self):
        return f'<ExpertiseCategory {self.name}>'

# Define the association table between User and Industry
user_industry = db.Table(
    'user_industry',
    db.Column('user_id', db.Integer, db.ForeignKey('user.id'), primary_key=True),
    db.Column('industry_id', db.Integer, db.ForeignKey('industry.id'), primary_key=True)
)

class Industry(db.Model):
    __tablename__ = 'industry'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False, unique=True)
    
    # Many-to-many relationship with User
    users = db.relationship('User', secondary=user_industry, back_populates="industries")

    def __repr__(self):
        return f'<Industry {self.name}>'

class User(db.Model):
    __tablename__ = 'user'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(200), nullable=False)
    email = db.Column(db.String(200), unique=True, nullable=False)
    password = db.Column(db.String(200), nullable=False)
    location = db.Column(db.String(100), nullable=True)
    blurb = db.Column(db.String(255), nullable=True)
    
    # Many-to-many relationship with Industry
    industries = db.relationship('Industry', secondary=user_industry, back_populates="users")

    def __repr__(self):
        return f'<User {self.name}>'
    
    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "email": self.email,
            "location": self.location,
            "blurb": self.blurb,
            "industries": [industry.name for industry in self.industries] if self.industries else []
        }


# Set up user_loader for user session management
@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))
