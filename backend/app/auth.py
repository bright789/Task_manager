from flask import Blueprint, request, jsonify
from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required
from werkzeug.security import generate_password_hash, check_password_hash
from .models import User
from . import db

auth = Blueprint('auth', __name__)

@auth.route('/api/user', methods=['GET'])
@jwt_required()
def get_user():
    user_id = get_jwt_identity()
    user = User.query.get(user_id)
    if not user:
        return jsonify({"msg": "User not found"}), 404

    return jsonify({
        'email': user.email,
        'is_admin': user.is_admin
    }), 200

@auth.route('/api/register', methods=['POST'])
def register():
    data = request.get_json()
    existing_user = User.query.filter_by(email=data['email']).first()
    if existing_user:
        return jsonify({'message': 'Email already exists'}), 400

    hashed_password = generate_password_hash(data['password'], method='pbkdf2:sha256')
    #new_user = User(email=data['email'], password=hashed_password)
    is_admin = data.get('is_admin', False)  # Get is_admin from request, default to False
    new_user = User(email=data['email'], password=hashed_password, is_admin=is_admin)
    db.session.add(new_user)
    db.session.commit()

    return jsonify({'message': 'User registered successfully'}), 201


@auth.route('/api/login', methods=['POST'])
def login():
    data = request.get_json()
    # Validate request data
    if 'email' not in data or 'password' not in data:
        return jsonify({'message': 'Email and password are required'}), 400
    user = User.query.filter_by(email=data['email']).first()
    if not user or not check_password_hash(user.password, data['password']):
        return jsonify({'message': 'Invalid credentials'}), 401
    access_token = create_access_token(identity=user.id)
    return jsonify({'token': access_token}), 200


