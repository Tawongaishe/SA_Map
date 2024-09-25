import sys
import os

# Ensure the backend module can be found
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from backend.app import create_app, db  # Adjust the import according to your project structure

def reset_database():
    app = create_app()
    with app.app_context():
        db.drop_all()
        db.create_all()
        print("Database has been reset.")

if __name__ == "__main__":
    reset_database()