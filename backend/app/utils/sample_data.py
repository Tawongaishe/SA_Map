from backend.app import db, create_app
from backend.app.models.startup import Startup
from geoalchemy2.shape import from_shape
from shapely.geometry import Point

def add_sample_data():
    app = create_app()
    with app.app_context():
        db.create_all()
        
        startups = [
            Startup(name='TechInnovate SA', description='AI solutions for businesses', 
                    industry='Artificial Intelligence', size='10-50', funding_stage='Series A',
                    location=from_shape(Point(28.0473, -26.2041))),  # Johannesburg
            Startup(name='GreenEnergy Cape', description='Renewable energy solutions', 
                    industry='Clean Energy', size='50-100', funding_stage='Series B',
                    location=from_shape(Point(18.4241, -33.9249))),  # Cape Town
            # Add more sample startups here
        ]
        
        db.session.add_all(startups)
        db.session.commit()

if __name__ == '__main__':
    add_sample_data()