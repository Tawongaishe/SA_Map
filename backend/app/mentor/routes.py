#create routes to sign up as a mentor and show the mentor route 
from flask import Blueprint, request, jsonify, session
from backend.app.models.startup import Mentor, User
from backend.app import db
from backend.app.auth.utils import login_required   


mentor_bp = Blueprint('mentor_bp', __name__)

# Sign up to be a mentor
@mentor_bp.route('/mentors', methods=['POST'])
@login_required
def sign_up_mentor():
    data = request.get_json()

    if not data:
        return jsonify({'error': 'No input data provided'}), 400
    
    user_id = session.get('user_id')

    required_fields = ['name', 'expertise', 'contact_info']
    missing_fields = [field for field in required_fields if not data.get(field)]

    if missing_fields:
        return jsonify({'error': f'Missing required fields: {', '.join(missing_fields)}'}), 400

    # Check if user exists
    user = session['user_id']
    if not user:
        return jsonify({'error': 'User not found'}), 404

    # Check if the user already has a mentor profile
    existing_mentor = Mentor.query.filter_by(user_id=user_id).first()
    if existing_mentor:
        return jsonify({'error': 'Mentor profile already exists for this user'}), 400

    new_mentor = Mentor(
        user_id= user_id,
        name=data['name'],
        expertise=data['expertise'],
        contact_info=data['contact_info']
    )

    db.session.add(new_mentor)
    db.session.commit()

    return jsonify(new_mentor.serialize()), 201


#get my mentor info
@mentor_bp.route('/mentors/me', methods=['GET'])
@login_required
def get_my_mentor_info():
    user_id = session['user_id']

    if not user_id:
        return jsonify({'error': 'User ID is required'}), 400

    # Check if user exists
    user = User.query.get(user_id)
    if not user:
        return jsonify({'error': 'User not found'}), 404

    # Retrieve mentor profile associated with the user
    mentor = Mentor.query.filter_by(user_id=user_id).first()
    if not mentor:
        return jsonify({'error': 'Mentor profile not found'}), 404

    return jsonify(mentor.serialize()), 200

# Route to retrieve all mentors
@mentor_bp.route('/mentors', methods=['GET'])
@login_required  # Ensure only authenticated users can retrieve mentor lists
def get_all_mentors():
    mentors = Mentor.query.all()  # Query all mentors from the database
    serialized_mentors = [mentor.serialize() for mentor in mentors]  # Serialize all mentor objects
    return jsonify(serialized_mentors), 200

# Route to retrieve a specific mentor
@mentor_bp.route('/mentors/<int:mentor_id>', methods=['GET'])
@login_required  # Ensure only authenticated users can retrieve mentor
def get_mentor(mentor_id):
    mentor = Mentor.query.get(mentor_id)
    if not mentor:
        return jsonify({'error': 'Mentor not found'}), 404
    return jsonify(mentor.serialize()), 200

#delete mentor profile 
@mentor_bp.route('/mentors/<int:mentor_id>', methods=['DELETE'])
@login_required
def delete_mentor(mentor_id):
    user_id = session.get('user_id')

    # Retrieve the mentor profile by ID
    mentor = Mentor.query.get(mentor_id)

    if not mentor:
        return jsonify({'error': 'Mentor profile not found'}), 404

    # Ensure the logged-in user is the owner of this mentor profile
    if mentor.user_id != user_id:
        return jsonify({'error': 'Unauthorized: You can only delete your own mentor profile'}), 403

    # Delete the mentor profile from the database
    db.session.delete(mentor)
    db.session.commit()

    return jsonify({'message': 'Mentor profile deleted successfully'}), 200


# Update the logged-in user's mentor profile
@mentor_bp.route('/mentors/me', methods=['PUT', 'PATCH'])
@login_required
def update_my_mentor_profile():
    user_id = session.get('user_id')

    # Retrieve the mentor profile associated with the logged-in user
    mentor = Mentor.query.filter_by(user_id=user_id).first()

    if not mentor:
        return jsonify({'error': 'Mentor profile not found'}), 404

    # Get the updated data from the request
    data = request.get_json()
    if not data:
        return jsonify({'error': 'No input data provided'}), 400

    # Update the mentor profile fields if provided in the request
    if 'name' in data:
        mentor.name = data['name']
    if 'expertise' in data:
        mentor.expertise = data['expertise']
    if 'contact_info' in data:
        mentor.contact_info = data['contact_info']

    # Save the updated mentor profile
    db.session.commit()

    return jsonify(mentor.serialize()), 200
