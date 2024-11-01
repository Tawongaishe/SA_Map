from flask import Blueprint, jsonify, request, session
from backend.app.models.startup import User, Industry
from backend.app import db
from backend.app.auth.utils import login_required


user_bp = Blueprint('user', __name__)

# Edit my user profile
@user_bp.route('/users/me', methods=['PUT', 'PATCH'])
@login_required
def edit_my_user_profile():
    #check that the user requestu=ing this is the same as the one being edited

    data = request.get_json()

    if not data:
        return jsonify({'error': 'No input data provided'}), 400
    
    user_id = session.get('user_id')
    user = User.query.get(user_id)
    if not user:
        return jsonify({'error': 'User not found'}), 404

    #check if they are trying to change their name
    if 'email' in data:
        return jsonify({'error': 'You cannot change your email'}), 400
    if 'name' in data:
        user.name = data['name']
    if 'location' in data:
        user.location = data['location']
    if 'blurb' in data:
        user.blurb = data['blurb']
    
    #collect industries ids
    if 'industries' in data:
        industries_ids = data['industries']
        industries_list = Industry.query.filter(Industry.id.in_(industries_ids)).all()
        user.industries = industries_list

    db.session.commit()

    return jsonify(user.serialize()), 200


#get my user profile
@user_bp.route('/users/me', methods=['GET'])
@login_required
def get_my_user_profile():
    user_id = session.get('user_id')
    user = User.query.get(user_id)
    if not user:
        return jsonify({'error': 'User not found'}), 404
    return jsonify(user.serialize()), 200

#get all user profiles
@user_bp.route('/users', methods=['GET'])
def get_all_users():
    users = User.query.all()
    return jsonify([u.serialize() for u in users])


#get all industries and their ids
@user_bp.route('/users/industries', methods=['GET'])
def get_all_industries():
    industries = Industry.query.all()
    return jsonify([{'id': i.id, 'name': i.name} for i in industries])