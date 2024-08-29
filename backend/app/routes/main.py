from flask import Blueprint, jsonify
from ..models.startup import Startup

main_bp = Blueprint('main', __name__)

@main_bp.route('/')
def index():
    return 'Hello, World!'

@main_bp.route('/startups')
def get_startups():
    startups = Startup.query.all()
    return jsonify([{
        'id': s.id,
        'name': s.name,
        'industry': s.industry,
        'size': s.size,
        'funding_stage': s.funding_stage
    } for s in startups])