from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from . import db
from .models import Task
from datetime import datetime

main = Blueprint('main', __name__)

@main.route('/')
def home():
    return "Hello, this is the home page!"

@main.route('/api/tasks', methods=['GET'])
@jwt_required()
def get_tasks():
    user_id = get_jwt_identity()
    tasks = Task.query.filter_by(user_id=user_id).all()
    return jsonify([task.to_dict() for task in tasks])

@main.route('/api/tasks', methods=['POST'])
@jwt_required()
def add_task():
    data = request.get_json()
    print("Received data:", data)  # Log received data

    if not data or 'title' not in data:
        print("Missing title in data")
        return jsonify({"msg": "Missing title parameter"}), 400

    user_id = get_jwt_identity()

    # Convert due_date to a Python date object
    due_date_str = data.get('due_date')
    if due_date_str:
        due_date = datetime.strptime(due_date_str, '%Y-%m-%d').date()
    else:
        due_date = None

    new_task = Task(
        title=data['title'],
        description=data.get('description', ''),
        due_date=due_date,
        user_id=user_id
    )
    db.session.add(new_task)
    db.session.commit()
    print("Task added:", new_task.to_dict())  # Log added task

    return jsonify(new_task.to_dict()), 201
