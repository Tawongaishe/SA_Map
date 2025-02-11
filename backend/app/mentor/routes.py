# create routes to sign up as a mentor and show the mentor route
from flask import Blueprint, request, jsonify, session
from backend.app.models.startup import Mentor, User, Expertise, ExpertiseCategory
from backend.app import db
from backend.app.auth.utils import login_required


mentor_bp = Blueprint("mentor_bp", __name__)


@mentor_bp.route("/mentors", methods=["POST"])
@login_required
def sign_up_mentor():
    try:
        # Check if JSON data is provided in the request
        data = request.get_json()
        if not data:
            return jsonify({"error": "No input data provided"}), 400

        user_id = session.get("user_id")
        if not user_id:
            return jsonify({"error": "User not authenticated or session expired"}), 401

        # Validate required fields
        required_fields = ["name", "expertises", "contact_info"]
        missing_fields = [field for field in required_fields if not data.get(field)]
        if missing_fields:
            return (
                jsonify(
                    {"error": f'Missing required fields: {", ".join(missing_fields)}'}
                ),
                400,
            )

        # Check if the user already has a mentor profile
        existing_mentor = Mentor.query.filter_by(user_id=user_id).first()
        if existing_mentor:
            return (
                jsonify({"error": "Mentor profile already exists for this user"}),
                400,
            )

        # Validate expertise IDs
        expertise_ids = data.get("expertises", [])
        if not isinstance(expertise_ids, list) or not expertise_ids:
            return jsonify({"error": "Expertises must be a non-empty list of IDs"}), 400

        # Fetch expertise list from the database
        expertise_list = Expertise.query.filter(Expertise.id.in_(expertise_ids)).all()
        if not expertise_list or len(expertise_list) != len(expertise_ids):
            return jsonify({"error": "One or more expertise IDs are invalid"}), 400
        
        mentor_needs = Expertise.query.filter(Expertise.id.in_(data.get("mentor_needs", []))).all()
        print(mentor_needs)
        if not isinstance(mentor_needs, list):
            return jsonify({"error": "mentor_needs must be a list of strings"}), 400

        # Create new mentor profile
        new_mentor = Mentor(
            user_id=user_id,
            name=data["name"],
            contact_info=data["contact_info"],
            expertises=expertise_list,  # Assuming a many-to-many relationship
            linkedin=data.get("linkedin"),
            needed_expertises=mentor_needs
        )

        # Save the new mentor profile to the database
        db.session.add(new_mentor)
        db.session.commit()

        return (
            jsonify(
                {
                    "message": "Mentor profile created successfully",
                    "mentor_id": new_mentor.id,
                }
            ),
            201,
        )

    except KeyError as e:
        return jsonify({"error": f"Missing key in request data: {str(e)}"}), 400
    except Exception as e:
        # Catch-all for unexpected errors
        return jsonify({"error": f"An unexpected error occurred: {str(e)}"}), 500


# get my mentor info
@mentor_bp.route("/mentors/me", methods=["GET"])
@login_required
def get_my_mentor_info():
    user_id = session["user_id"]

    if not user_id:
        return jsonify({"error": "User ID is required"}), 400

    # Check if user exists
    user = User.query.get(user_id)
    if not user:
        return jsonify({"error": "User not found"}), 404

    # Retrieve mentor profile associated with the user
    mentor = Mentor.query.filter_by(user_id=user_id).first()
    if not mentor:
        return jsonify({"mentor": None}), 200
    
    print(mentor.needed_expertises)

    return jsonify({"mentor": (mentor.serialize())}), 200


# Route to retrieve all mentors
@mentor_bp.route("/mentors", methods=["GET"])
@login_required  # Ensure only authenticated users can retrieve mentor lists
def get_all_mentors():
    mentors = Mentor.query.all()  # Query all mentors from the database
    serialized_mentors = [
        mentor.serialize() for mentor in mentors
    ]  # Serialize all mentor objects
    # for every mentor object also get the blurb in their user profile and add it into the json
    for mentor in serialized_mentors:
        user = User.query.get(mentor["user_id"])
        mentor["bio"] = user.blurb
        mentor["location"] = user.location

    return jsonify(serialized_mentors), 200


# Route to retrieve a specific mentor
@mentor_bp.route("/mentors/<int:mentor_id>", methods=["GET"])
@login_required  # Ensure only authenticated users can retrieve mentor
def get_mentor(mentor_id):
    mentor = Mentor.query.get(mentor_id)
    if not mentor:
        return jsonify({"error": "Mentor not found"}), 404
    user = User.query.get(mentor.user_id)

    user_and_mentor_data = {"user": user.serialize(), "mentor": mentor.serialize()}
    if not mentor:
        return jsonify({"error": "Mentor not found"}), 404
    return jsonify(user_and_mentor_data), 200


# delete mentor profile
@mentor_bp.route("/mentors/<int:mentor_id>", methods=["DELETE"])
@login_required
def delete_mentor(mentor_id):
    user_id = session.get("user_id")

    # Retrieve the mentor profile by ID
    mentor = Mentor.query.get(mentor_id)

    if not mentor:
        return jsonify({"error": "Mentor profile not found"}), 404

    # Ensure the logged-in user is the owner of this mentor profile
    if mentor.user_id != user_id:
        return (
            jsonify(
                {"error": "Unauthorized: You can only delete your own mentor profile"}
            ),
            403,
        )

    # Delete the mentor profile from the database
    db.session.delete(mentor)
    db.session.commit()

    return jsonify({"message": "Mentor profile deleted successfully"}), 200


# Update the logged-in user's mentor profile
@mentor_bp.route("/mentors/me", methods=["PUT", "PATCH"])
@login_required
def update_my_mentor_profile():
    user_id = session.get("user_id")

    # Retrieve the mentor profile associated with the logged-in user
    mentor = Mentor.query.filter_by(user_id=user_id).first()

    if not mentor:
        return jsonify({"error": "Mentor profile not found"}), 404

    data = request.get_json()
    if not data:
        return jsonify({"error": "No input data provided"}), 400

    # Update mentor fields
    if "name" in data:
        mentor.name = data["name"]
    if "contact_info" in data:
        mentor.contact_info = data["contact_info"]

    if "linkedin" in data:
        mentor.linkedin = data["linkedin"]

    # Update expertise
    if "expertises" in data:
        expertise_ids = data["expertises"]
        expertise_list = Expertise.query.filter(Expertise.id.in_(expertise_ids)).all()
        mentor.expertises = expertise_list

    if "mentor_needs" in data:
        mentor_needs_ids = data["mentor_needs"] 
        expertise_list = Expertise.query.filter(Expertise.id.in_(mentor_needs_ids)).all()
        mentor.needed_expertises = expertise_list

    db.session.commit()

    return jsonify(mentor.serialize()), 200


# send expertise names and ids to the frontend
@mentor_bp.route("/expertise", methods=["GET"])
def get_all_expertises():
    expertises = Expertise.query.all()
    serialized_expertises = [expertise.serialize() for expertise in expertises]
    return jsonify(serialized_expertises), 200


# create a new expertise
@mentor_bp.route("/expertise", methods=["POST"])
@login_required
def add_expertise():
    data = request.get_json()

    # Check if data contains 'name' and 'category_id'
    if "name" not in data or "category_id" not in data:
        return jsonify({"error": "Missing required fields: name and category_id"}), 400

    expertise_name = data["name"]
    category_id = data["category_id"]

    # Validate that the category exists
    category = ExpertiseCategory.query.get(category_id)
    if not category:
        return jsonify({"error": "Invalid category ID: Category not found"}), 404

    # Check if expertise already exists under the same category
    existing_expertise = Expertise.query.filter_by(
        name=expertise_name, category_id=category_id
    ).first()
    if existing_expertise:
        return (
            jsonify(
                {"error": "This expertise already exists under the specified category"}
            ),
            400,
        )

    # Create new expertise
    new_expertise = Expertise(name=expertise_name, category_id=category_id)
    db.session.add(new_expertise)
    db.session.commit()

    return (
        jsonify(
            {
                "message": "New expertise created successfully",
                "expertise": {
                    "id": new_expertise.id,
                    "name": new_expertise.name,
                    "category_id": new_expertise.category_id,
                },
            }
        ),
        201,
    )


# get all cateogories in the database
@mentor_bp.route("/expertise/categories", methods=["GET"])
@login_required
def get_expertise_categories():
    categories = ExpertiseCategory.query.all()
    serialized_categories = [
        {"id": category.id, "name": category.name} for category in categories
    ]
    return jsonify(serialized_categories), 200

@mentor_bp.route("/matches/golden/<int:user_id>", methods=["GET"])
@login_required
def get_golden_matches(user_id):
    print(user_id)
    mentor = Mentor.query.filter_by(user_id=user_id).first()
    if not mentor:
        return jsonify({"error": "Mentor profile not found"}), 404
    
    
    # Get all mentors except the current one
    all_other_mentors = Mentor.query.filter(Mentor.user_id != user_id).all()
    golden_matches = []
    
    for other_mentor in all_other_mentors:
        match_score = 0
        my_offerings_their_needs = []
        their_offerings_my_needs = []
        
        # Check what I can offer them (my expertises vs their needs)
        for my_expertise in mentor.expertises:
            for their_need in other_mentor.needed_expertises:
                # Direct L2 match
                if my_expertise.id == their_need.id:
                    match_score += 2
                    my_offerings_their_needs.append({
                        "type": "L2",
                        "expertise": my_expertise.serialize()
                    })
                # L1 category match
                elif my_expertise.category_id == their_need.category_id:
                    match_score += 1
                    my_offerings_their_needs.append({
                        "type": "L1",
                        "expertise": my_expertise.serialize()
                    })
        
        # Check what they can offer me (their expertises vs my needs)
        for their_expertise in other_mentor.expertises:
            for my_need in mentor.needed_expertises:
                # Direct L2 match
                if their_expertise.id == my_need.id:
                    match_score += 2
                    their_offerings_my_needs.append({
                        "type": "L2",
                        "expertise": their_expertise.serialize()
                    })
                # L1 category match
                elif their_expertise.category_id == my_need.category_id:
                    match_score += 1
                    their_offerings_my_needs.append({
                        "type": "L1",
                        "expertise": their_expertise.serialize()
                    })
        
        # If there's at least one match in both directions
        if my_offerings_their_needs and their_offerings_my_needs:
            golden_matches.append({
                "mentor": other_mentor.serialize(),
                "match_score": match_score,
                "i_can_offer": my_offerings_their_needs,
                "they_can_offer": their_offerings_my_needs
            })
    
    # Sort by match score descending
    golden_matches.sort(key=lambda x: x["match_score"], reverse=True)
    
    return jsonify({
        "matches": golden_matches
    })


@mentor_bp.route('/matches/can-help/<int:user_id>', methods=['GET'])
@login_required
def get_mentors_i_can_help(user_id):
    """
    Find mentors that the current mentor can help based on their expertise
    """
    mentor = Mentor.query.filter_by(user_id=user_id).first()
    if not mentor:
        return jsonify({"error": "Mentor profile not found"}), 404
    
    # Get all mentors except the current one
    all_other_mentors = Mentor.query.filter(Mentor.user_id != user_id).all()
    potential_matches = []
    
    for other_mentor in all_other_mentors:
        matches = []
        
        # Check what I can offer them
        for my_expertise in mentor.expertises:
            for their_need in other_mentor.needed_expertises:
                # Direct L2 match
                if my_expertise.id == their_need.id:
                    matches.append({
                        "type": "L2",
                        "expertise": my_expertise.serialize()
                    })
                # L1 category match
                elif my_expertise.category_id == their_need.category_id:
                    matches.append({
                        "type": "L1",
                        "expertise": my_expertise.serialize()
                    })
        
        if matches:
            potential_matches.append({
                "mentor": other_mentor.serialize(),
                "matches": matches
            })
    
    return jsonify({
        "matches": potential_matches
    })

@mentor_bp.route('/matches/can-help-me/<int:user_id>', methods=['GET'])
@login_required
def get_mentors_who_can_help(user_id):
    """
    Find mentors that can help the current mentor based on their needs
    """
    mentor = Mentor.query.filter_by(user_id=user_id).first()
    if not mentor:
        return jsonify({"error": "Mentor profile not found"}), 404
    
    # Get all mentors except the current one
    all_other_mentors = Mentor.query.filter(Mentor.user_id != user_id).all()
    potential_matches = []
    
    for other_mentor in all_other_mentors:
        matches = []
        
        # Check what they can offer me
        for their_expertise in other_mentor.expertises:
            for my_need in mentor.needed_expertises:
                # Direct L2 match
                if their_expertise.id == my_need.id:
                    matches.append({
                        "type": "L2",
                        "expertise": their_expertise.serialize()
                    })
                # L1 category match
                elif their_expertise.category_id == my_need.category_id:
                    matches.append({
                        "type": "L1",
                        "expertise": their_expertise.serialize()
                    })
        
        if matches:
            potential_matches.append({
                "mentor": other_mentor.serialize(),
                "matches": matches
            })
    
    return jsonify({
        "matches": potential_matches
    })