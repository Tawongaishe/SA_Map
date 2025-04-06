from functools import wraps

from flask import jsonify, session
#from flask_mail import Message

#from app import mail


def login_required(func):
    """
    Decorator to require user authentication.

    This decorator checks if a user is signed in by verifying the presence of "user_id" in the session.

    :param func: The function to be decorated
    :return: The decorated function
    """

    @wraps(func)
    def decorated_function(*args, **kwargs):
        # Check if "user_id" is in the session
        if "user_id" not in session:
            # Return a 401 Unauthorized response if the user is not signed in
            return jsonify(message="User not signed in"), 401

        # If the user is signed in, execute the decorated function
        return func(*args, **kwargs)

    # Return the decorated function
    return decorated_function


