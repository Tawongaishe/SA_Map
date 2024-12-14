# South African Startup Space

A platform bridging the gap in the South African startup ecosystem by connecting entrepreneurs with resources, mentors, and communities in one centralized hub.

[Live Demo](https://sa-map-tau.vercel.app/) | [Video Demo](https://youtu.be/Eg7ICN77pvs)

> Note: The backend is hosted on Render which has a cold start, so initial loading may take 1-2 minutes.

## About

South African Startup Space addresses a fundamental challenge in South Africa's startup ecosystem: the fragmentation of resources and connections. Rather than creating another competing platform, it serves as a bridge, connecting various elements of the ecosystem in a structured and meaningful way.

## Key Features

### 🤝 Dual-Benefit Mentorship
- Innovative peer-to-peer mentorship system
- Both parties can give and receive expertise
- Easy mentor discovery and connection
- Profile-based expertise matching

### 🚀 Startup Database
- Comprehensive listing of SA startups
- Industry and location-based search
- Detailed company profiles
- Regular updates with new companies

### 📚 Resource Hub
- Curated startup communities
- Educational programs
- Incubators and accelerators
- Award programs and opportunities

## Platform Stats
- 500+ Startups Listed
- 50+ Active Mentors
- 20+ Communities
- 100+ Resources

Technical Details
Architecture
Copy/frontend                 # React application
  /src
    /components          # Reusable UI components
    /pages              # Route components
    /services           # API communication
    /context            # State management
    
/backend                 # Flask application
  /blueprints           # Route handlers
  /models               # Database models
  /services             # Business logic
Tech Stack

Frontend:

React.js
Ant Design UI Framework
Context API for state management


Backend:

Flask
SQLAlchemy ORM
JWT Authentication


Database:

PostgreSQL
AWS RDS hosting


Deployment:

Frontend: Vercel
Backend: Render
Database: AWS RDS



Local Development

Frontend Setup:

bashCopycd frontend
npm install
npm start

Backend Setup:

bashCopy# Create and activate virtual environment
python3 -m venv venv
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Run server
python -m backend.run

Database Setup:

bashCopy# Access PostgreSQL
psql sa_startup_map

# Run migrations
flask db upgrade
API Documentation

## Contributing
Interested in contributing? Check out our [issues page](link-to-issues) or submit a pull request.

## Contact
For questions or feedback about the platform, please reach out to [your-email@example.com]

## License
[Your chosen license]
