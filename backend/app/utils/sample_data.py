import sys
import os

# Add the project root directory to the Python path
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..', '..')))

import logging
import time
import os
from backend.app import db, create_app
from backend.app.models.startup import Startup
from backend.app.utils.import_csv import import_startups_from_csv

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

def add_sample_data():
    app = create_app()
    with app.app_context():
        logger.info("Starting sample data import")
        start_time = time.time()

        csv_path = os.path.join(os.path.dirname(__file__), 'startups.csv')
        logger.info(f"Importing sample data from {csv_path}")
        
        try:
            import_startups_from_csv(csv_path)
            logger.info("Sample data imported successfully")
        except Exception as e:
            logger.error(f"Error importing sample data: {str(e)}")
        
        end_time = time.time()
        logger.info(f"Data import completed in {end_time - start_time:.2f} seconds")

if __name__ == '__main__':
    add_sample_data()