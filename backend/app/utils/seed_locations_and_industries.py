# seed_locations_and_industries.py
import sys
import os

sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..', '..')))



from backend.app import db, create_app
from backend.app.models import Industry, User  # Adjust imports based on your file structure

# List of cities in South Africa
location_data = [
    "Johannesburg",
    "Cape Town",
    "Durban",
    "Pretoria",
    "Port Elizabeth",
    "Bloemfontein",
    "East London",
    "Polokwane",
    "Kimberley",
    "Pietermaritzburg"
]

# List of industries
industry_data = [
    "AgTech",
    "Fintech",
    "EdTech",
    "Logistics",
    "Health Care",
    "Marketplace",
    "E-Commerce",
    "Artificial Intelligence",
    "Software-as-a-Service (SaaS)",
    "Resources"
]

def seed_locations_and_industries():
    app = create_app()
    with app.app_context():
        # Seed industries
        for industry_name in industry_data:
            industry = Industry.query.filter_by(name=industry_name).first()
            if not industry:
                industry = Industry(name=industry_name)
                db.session.add(industry)
        
        # Commit changes for industries
        db.session.commit()
        print("Industries added successfully!")

        # Update locations in User model as choices if needed
        # Alternatively, this can be used in the frontend or another lookup table.
        print("Suggested locations for users:")
        for location in location_data:
            print(f"- {location}")
        
        print("Locations list created successfully! (These are for reference in the app)")

if __name__ == "__main__":
    seed_locations_and_industries()
