from flask import Flask
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

def create_app():
    app = Flask(__name__)
    app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://tawongaishe:Postgres1234@localhost/sa_startup_map'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

    db.init_app(app)

    from .models import startup  # Import your models
    from .routes.main import main_bp  # Import the Blueprint

    app.register_blueprint(main_bp)  # Register the Blueprint

    return app