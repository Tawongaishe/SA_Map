from flask import Flask
from flask_sqlalchemy import SQLAlchemy
import secrets
from flask_migrate import Migrate
from flask_login import LoginManager
from flask_session import Session
from dotenv import load_dotenv
import os

# Initialize objects
db = SQLAlchemy()
migrate = Migrate()
login_manager = LoginManager()

def create_app():
    app = Flask(__name__)
    
    # Load environment variables
    load_dotenv()
    
    # Basic database configuration
    app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL')
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    app.config['SECRET_KEY'] = secrets.token_hex(16)
    app.config['SESSION_TYPE'] = 'filesystem'
    
    # Initialize extensions
    Session(app)
    db.init_app(app)
    migrate.init_app(app, db)
    
    # Login manager setup
    login_manager.init_app(app)
    login_manager.login_view = 'auth.login'
    login_manager.session_protection = 'strong'
    
    # Import and register blueprints
    from backend.app.main.routes import main_bp
    from backend.app.auth.routes import auth as auth_bp
    from backend.app.mentor.routes import mentor_bp
    from backend.app.startup.routes import startup_bp
    from backend.app.user.routes import user_bp
    
    app.register_blueprint(main_bp, url_prefix='/api')
    app.register_blueprint(auth_bp, url_prefix='/api')
    app.register_blueprint(mentor_bp, url_prefix='/api')
    app.register_blueprint(startup_bp, url_prefix='/api')
    app.register_blueprint(user_bp, url_prefix='/api')
    
    return app