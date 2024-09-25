from flask import Blueprint, jsonify
from backend.app.models.startup import Startup
from geoalchemy2.shape import to_shape
from shapely.geometry import mapping

main_bp = Blueprint('main', __name__)

@main_bp.route('/')
def index():
    return 'Hello, World!'

@main_bp.route('/startups', methods=['GET'])
def get_startups():
    """
    Get all startups
    :return: JSON response with all startups
    """
    startups = Startup.query.all()
    return jsonify([{
        'id': s.id,
        'name': s.name,
        'industry': s.industry,
        'location': s.location,
    } for s in startups])

