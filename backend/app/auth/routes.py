from flask import Blueprint, jsonify, request, session
from werkzeug.exceptions import NotFound
from werkzeug.security import check_password_hash, generate_password_hash

from backend.app import db
from backend.app.auth.utils import login_required
from backend.app.models.startup import User, Industry

auth = Blueprint("auth", __name__)


@auth.route("/signup", methods=["POST"])
def signup_post():
    response_data = {}

    data = request.get_json()

    # Check if the request contains JSON data
    if not data:
            response_data["message"] = "No JSON data received"
            return jsonify(response_data), 400

    # code to validate and add user to the database goes here
    email = data["email"]
    name = data["name"]
    password = data["password"]
    location = data["location"]
    blurb = data["blurb"]
   
   #collect industries ids
    industries = data.get('industries', [])

    #fetch industry list from the database based on provided IDs
    industry_list = Industry.query.filter(Industry.id.in_(industries)).all()
    if not industry_list or len(industry_list) != len(industries):
        response_data["message"] = "One or more industry IDs are invalid"
        return jsonify(response_data), 400

    #Check if all fields are filled
    if not email or not name or not password:
        response_data["message"] = "All fields are required"
        return jsonify(response_data), 400

    # If this returns a user, then the email already exists in the database
    user = User.query.filter_by(email=email).first()

    # If a user is found, we want to return a JSON response indicating the email already exists
    if user:
        response_data["message"] = "Email already exists"
        return jsonify(response_data), 400  # 400 Bad Request

    # Create a new user with the form data. Hash the password so the plaintext version isn't saved.
    new_user = User(
        email=email,
        name=name,
        password=generate_password_hash(password, method="pbkdf2:sha256"),
        location=location,
        blurb=blurb,
        industries=industry_list
    )

    # Add the new user to the database
    db.session.add(new_user)
    db.session.commit()
    session["user_id"] = new_user.id

    response_data["message"] = "User registered successfully"

    return jsonify(response_data), 201  # 201 Created


@auth.route("/login", methods=["POST"])
def login_post():
    response_data = {}

    data = request.get_json()
    # Get user input from the request
    email = data["email"]
    password = data["password"]

    # Try to find the user by email in the database
    user = User.query.filter_by(email=email).first()

    # If no user with that email is found, return an error response
    if user is None:
        response_data["message"] = "User not found"
        return jsonify(response_data), 404  # 401 Unauthorized

    # Check if the provided password matches the stored hashed password
    if not check_password_hash(user.password, password):
        response_data["message"] = "Incorrect password"
        return jsonify(response_data), 401  # 401 Unauthorized

    response_data["message"] = "Login successful"
    response_data['session'] = user.id
    session["user_id"] = user.id
    return jsonify(response_data), 200  # 200 OK


@auth.route("/logout", methods=["GET"])
@login_required
def logout():
    """
    Log out a user.

    This route allows a logged-in user to log out, terminating their session.

    Returns:
    - A JSON response indicating successful logout with a 200 status code.

    Args:
    - None
    """
    response_data = {}
    # Clear the user's session and log them out
    session.pop("user_id", None)
    response_data["message"] = "Logout successful"
    return jsonify(response_data), 200  # 200 OK


"""For now comment out the reset password routes until we download all the dependencies """

# @auth.route("/reset_password", methods=["GET", "POST"])
# def request_reset_password():
#     response_data = {}

#     data = request.get_json()
#     email = data["email"]

#     try:
#         user = User.query.filter_by(email=email).first_or_404()

#     except NotFound:
#         response_data["message"] = "Email does not exist"
#         return jsonify(response_data), 400

#     send_reset_email(user)
#     response_data["message"] = "Email to reset password sent"
#     return jsonify(response_data), 200


# @auth.route("/reset_password/<token>", methods=["GET", "POST"])
# def reset_token(token):
#     response_data = {}
#     user = User.verify_reset_token(token)
#     if not user:
#         response_data["message"] = "That is an invalid or expired token"
#         return jsonify(response_data), 404

#     data = request.get_json()

#     new_password = data["new_password"]
#     confirm_password = data["confirm_password"]

#     if new_password == confirm_password:
#         hashed_pw = generate_password_hash(confirm_password, method="sha256")
#         user.password = hashed_pw
#         db.session.commit()

#         response_data["message"] = "Success! You are now able to login"
#         return jsonify(response_data), 200

#     response_data["message"] = "Both passwords don't match"
#     return jsonify(response_data), 400
