# seed_expertise.py

from backend.app import db, create_app
from backend.app.models.startup import ExpertiseCategory, Expertise

# Sample data for expertise categories and their sub-expertise
expertise_data = {
    "Funding": ["Pre-Seed", "Seed", "Series A", "Series B", "Series C", "IPO", "Grants", "Crowdfunding"],
    "Marketing": ["Digital Marketing", "Social Media Strategy", "Content Marketing", "Influencer Marketing", "Paid Advertising", "Market Research"],
    "Networking": ["Event Networking", "Online Community Building", "Partnership Development", "Industry Networking"],
    "Legal and Governance": ["Intellectual Property (IP) Protection", "Contract Management", "Compliance", "Business Structure & Incorporation", "Government Relations"],
    "Staffing (Recruiting)": ["Talent Acquisition", "Employee Onboarding", "Human Resources (HR) Management", "Retention Strategies", "Diversity & Inclusion Hiring"],
    "Financial Management": ["Budgeting", "Cash Flow Management", "Accounting", "Tax Planning", "Financial Forecasting"],
    "Strategic Thinking and Planning": ["Vision & Mission Development", "Business Modeling", "Competitive Analysis", "Goal Setting", "Risk Management"],
}

def seed_expertise():
    app = create_app()
    with app.app_context():
        for category_name, sub_expertise_list in expertise_data.items():
            # Check if the category already exists
            category = ExpertiseCategory.query.filter_by(name=category_name).first()
            if not category:
                # Create the category
                category = ExpertiseCategory(name=category_name)
                db.session.add(category)
                db.session.commit()
            
            # Add sub-expertise under the category
            for sub_name in sub_expertise_list:
                sub_expertise = Expertise.query.filter_by(name=sub_name, category_id=category.id).first()
                if not sub_expertise:
                    sub_expertise = Expertise(name=sub_name, category_id=category.id)
                    db.session.add(sub_expertise)
        
        db.session.commit()
        print("Seed data added successfully!")

if __name__ == "__main__":
    seed_expertise()
