import os
import sys
# Add the parent directory of 'backend' to the Python path
sys.path.append(os.path.abspath(os.path.dirname(__file__)))

from backend.app import create_app

app = create_app()

if __name__ == '__main__':
    app.run(debug=True, port=5001)
