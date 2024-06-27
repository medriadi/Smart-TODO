# backend/routes/users.py
from flask import Blueprint, jsonify
from models import User

bp = Blueprint('users', __name__)

@bp.route('/users', methods=['GET'])
def get_users():
    users = User.query.all()
    return jsonify([user.username for user in users])
