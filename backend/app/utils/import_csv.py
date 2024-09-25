# backend/app/utils/import_csv.py
import sys
import os
# Add the project root directory to the Python path
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..', '..')))

import csv
from backend.app import db, create_app
from backend.app.models.startup import Startup


def import_startups_from_csv(filename):
    app = create_app()
    with app.app_context():
        with open(filename, 'r') as file:
            csv_reader = csv.DictReader(file)  # Note the tab delimiter
            for row in csv_reader:
                startup = Startup(
                    name=row['Startup_Name'],
                    industry=row['Industry'],
                    location=row['Location'],
                )
                db.session.add(startup)
        db.session.commit()
    print(f"Data imported successfully from {filename}")

if __name__ == '__main__':
    import_startups_from_csv('path/to/your/csv/file.csv')