#create routes to sign up as a mentor and show the mentor route 
from flask import Blueprint, request, jsonify, session
from backend.app.models.startup import Mentor, User, Expertise, ExpertiseCategory
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
    required_fields = ['name', 'expertises', 'contact_info', 'needs']
    missing_fields = [field for field in required_fields if not data.get(field)]

    if missing_fields:
        return jsonify({'error': f'Missing required fields: {", ".join(missing_fields)}'}), 400

    # Check if the user already has a mentor profile
    existing_mentor = Mentor.query.filter_by(user_id=user_id).first()
    if existing_mentor:
        return jsonify({'error': 'Mentor profile already exists for this user'}), 400

    # Collect expertise IDs
    expertise_ids = data.get('expertises', [])
    if not expertise_ids:
        return jsonify({'error': 'Expertise is required'}), 400

    # Fetch expertise list from the database based on provided IDs
    expertise_list = Expertise.query.filter(Expertise.id.in_(expertise_ids)).all()
    if not expertise_list or len(expertise_list) != len(expertise_ids):
        return jsonify({'error': 'One or more expertise IDs are invalid'}), 400
    
    #collect needs IDs 
    needs_ids = data.get('needs', [])
    if not needs_ids:
        return jsonify({'error': 'Needs is required'}), 400
    
    #fetch needs list from the database based on provided IDs
    needs_list = Expertise.query.filter(Expertise.id.in_(needs_ids)).all()
    if not needs_list or len(needs_list) != len(needs_ids):
        return jsonify({'error': 'One or more needs IDs are invalid'}), 400

    # Create the mentor profile
    new_mentor = Mentor(
        user_id=user_id,
        name=data['name'],
        contact_info=data['contact_info'],
        expertises=expertise_list,
        needs=needs_list
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
    user = User.query.get(mentor.user_id)

    user_and_mentor_data = { 
        'user': user.serialize(),
        'mentor': mentor.serialize()
    }
    if not mentor:
        return jsonify({'error': 'Mentor not found'}), 404
    return jsonify(user_and_mentor_data), 200

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

    data = request.get_json()
    if not data:
        return jsonify({'error': 'No input data provided'}), 400

    # Update mentor fields
    if 'name' in data:
        mentor.name = data['name']
    if 'contact_info' in data:
        mentor.contact_info = data['contact_info']

    # Update expertise
    if 'expertises' in data:
        expertise_ids = data['expertises']
        expertise_list = Expertise.query.filter(Expertise.id.in_(expertise_ids)).all()
        mentor.expertises = expertise_list

    db.session.commit()

    return jsonify(mentor.serialize()), 200

#send expertise names and ids to the frontend
@mentor_bp.route('/expertise', methods=['GET'])
def get_all_expertises():
    expertises = Expertise.query.all()
    serialized_expertises = [expertise.serialize() for expertise in expertises]
    return jsonify(serialized_expertises), 200

#create a new expertise
@mentor_bp.route('/expertise', methods=['POST'])
@login_required
def add_expertise():
    data = request.get_json()

    # Check if data contains 'name' and 'category_id'
    if 'name' not in data or 'category_id' not in data:
        return jsonify({'error': 'Missing required fields: name and category_id'}), 400

    expertise_name = data['name']
    category_id = data['category_id']

    # Validate that the category exists
    category = ExpertiseCategory.query.get(category_id)
    if not category:
        return jsonify({'error': 'Invalid category ID: Category not found'}), 404

    # Check if expertise already exists under the same category
    existing_expertise = Expertise.query.filter_by(name=expertise_name, category_id=category_id).first()
    if existing_expertise:
        return jsonify({'error': 'This expertise already exists under the specified category'}), 400

    # Create new expertise
    new_expertise = Expertise(name=expertise_name, category_id=category_id)
    db.session.add(new_expertise)
    db.session.commit()

    return jsonify({
        'message': 'New expertise created successfully',
        'expertise': {
            'id': new_expertise.id,
            'name': new_expertise.name,
            'category_id': new_expertise.category_id
        }
    }), 201

#get all cateogories in the database 
@mentor_bp.route('/expertise/categories', methods=['GET'])
@login_required
def get_expertise_categories():
    categories = ExpertiseCategory.query.all()
    serialized_categories = [{'id': category.id, 'name': category.name} for category in categories]
    return jsonify(serialized_categories), 200
