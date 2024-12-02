from flask import Flask
from flask_sqlalchemy import SQLAlchemy
import secrets # Import the secrets module
from flask_migrate import Migrate
from flask_login import LoginManager
from flask_session import Session

# Initialize the SQLAlchemy object
db = SQLAlchemy()
# Initialize the Migrate object
migrate = Migrate()
# Initialize the LoginManager object
login_manager = LoginManager()

def create_app():
    app = Flask(__name__)
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///site.db'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    app.config['SECRET_KEY'] = secrets.token_hex(16)  # Generate a random secret key
    app.config['SQLALCHEMY_ENGINE_OPTIONS'] = {
        'connect_args': {'timeout': 15}  # Increase timeout to 15 seconds
    }
    app.config['SESSION_TYPE'] = 'filesystem'
    Session(app)

    # Initialize the app with the SQLAlchemy and Migrate
    db.init_app(app)
    migrate.init_app(app, db)

    # Initialize LoginManager 
    login_manager.init_app(app)
    login_manager.login_view = 'auth.login'
    login_manager.session_protection = 'strong'

    # Import the blueprints
    from backend.app.main.routes import main_bp 
    from backend.app.auth.routes import auth as auth_bp
    from backend.app.mentor.routes import mentor_bp as mentor_bp
    from backend.app.startup.routes import startup_bp as startup_bp
    from backend.app.user.routes import user_bp as user_bp

    #register all the blueprints in the worksapce 
    app.register_blueprint(main_bp, url_prefix='/api')  
    app.register_blueprint(auth_bp, url_prefix='/api')
    app.register_blueprint(mentor_bp, url_prefix='/api')
    app.register_blueprint(startup_bp, url_prefix='/api')
    app.register_blueprint(user_bp, url_prefix='/api')


    return app