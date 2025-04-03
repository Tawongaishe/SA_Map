# seed_expertise.py
import sys
import os
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..', '..')))
 
from backend.app import db, create_app
from backend.app.models.startup import ExpertiseCategory, Expertise

# Sample data for expertise categories and their sub-expertise
expertise_data = {
    "Funding": ["Pre-Seed", "Seed", "Series A", "Series B", "Series C", "IPO", "Grants", "Crowdfunding"],
    
    "Marketing": ["Digital Marketing", "Social Media Strategy", "Content Marketing", "Influencer Marketing", 
                 "Paid Advertising", "Market Research", "Brand Development", "SEO/SEM", "Growth Hacking", 
                 "Email Marketing", "Marketing Analytics"],
    
    "Networking": ["Event Networking", "Online Community Building", "Partnership Development", 
                  "Industry Networking", "Investor Relations", "Strategic Alliances"],
    
    "Legal and Governance": ["Intellectual Property (IP) Protection", "Contract Management", "Compliance", 
                           "Business Structure & Incorporation", "Government Relations", "Regulatory Affairs", 
                           "Data Privacy", "Corporate Governance"],
    
    "Staffing (Recruiting)": ["Talent Acquisition", "Employee Onboarding", "Human Resources (HR) Management", 
                            "Retention Strategies", "Diversity & Inclusion Hiring", "Team Building", 
                            "Leadership Development", "Remote Team Management"],
    
    "Financial Management": ["Budgeting", "Cash Flow Management", "Accounting", "Tax Planning", 
                           "Financial Forecasting", "Financial Modeling", "Investor Reporting", 
                           "Equity Management", "Valuation", "Unit Economics"],
    
    "Strategic Thinking and Planning": ["Vision & Mission Development", "Business Modeling", 
                                      "Competitive Analysis", "Goal Setting", "Risk Management", 
                                      "Strategic Partnerships", "Market Entry Strategy", 
                                      "International Expansion", "Pivot Planning"],
    
    "Technical Skills": ["Software Development", "Web Development", "Mobile App Development", "DevOps", 
                       "Cloud Architecture", "Database Design", "UI/UX Design", "System Architecture", 
                       "Data Science", "Machine Learning", "Cybersecurity", "API Development", 
                       "Backend Engineering", "Frontend Engineering", "Full Stack Development", 
                       "Quality Assurance", "Technical Project Management"],
    
    "Business Operations": ["Supply Chain Management", "Inventory Management", "Process Optimization", 
                          "Project Management", "KPI Development", "Business Analytics", "Vendor Management", 
                          "Customer Support Operations", "Logistics", "Quality Control"],
    
    "Sales": ["Sales Strategy", "B2B Sales", "B2C Sales", "Enterprise Sales", "Channel Sales", 
             "Sales Funnel Optimization", "CRM Implementation", "Pricing Strategy", "Sales Team Management", 
             "Negotiation", "Client Relationship Management"],
    
    "Product Management": ["Product Development", "Product Strategy", "Product Roadmapping", 
                         "User Research", "Feature Prioritization", "Product Analytics", "Go-to-Market Strategy", 
                         "Product Launch", "A/B Testing", "Product-Market Fit"],
    
    "Customer Acquisition": ["Lead Generation", "Customer Segmentation", "Conversion Rate Optimization", 
                           "User Acquisition", "Customer Journey Mapping", "Retention Strategy", 
                           "Referral Programs", "Loyalty Programs", "Community Building"],
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