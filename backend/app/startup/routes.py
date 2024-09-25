from flask import Blueprint, jsonify, request
from backend.app.models.startup import Startup
from backend.app import db

startup_bp = Blueprint('startup', __name__)

#get a specific startup by its id
@startup_bp.route('/startups/<int:startup_id>', methods=['GET'])
def get_startup(startup_id):
    """
    Get a specific startup by its id
    :param startup_id: the id of the startup
    :return: JSON response with the startup
    """
    startup = Startup.query.get(startup_id)
    if not startup:
        return jsonify({'error': 'Startup not found'}), 404
    return jsonify(startup.serialize())


#create a new startup 
@startup_bp.route('/startups', methods=['POST'])
def create_startup():
    data = request.get_json()

    if not data:
        return jsonify({'error': 'No input data provided'}), 400

    required_fields = ['name', 'industry', 'location']
    missing_fields = [field for field in required_fields if not data.get(field)]

    if missing_fields:
        return jsonify({'error': f'Missing required fields: {', '.join(missing_fields)}'}), 400

    new_startup = Startup(
        name=data['name'],
        industry=data['industry'],
        location=data['location']
    )

    db.session.add(new_startup)
    db.session.commit()

    return jsonify(new_startup.serialize()), 201