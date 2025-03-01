
from .startup import User
from .startup import Mentor
from .startup import Industry  # Ensure this line is included for Industry model
from .startup import Expertise, ExpertiseCategory

# Ensure that db is available for all models
from backend.app import db
