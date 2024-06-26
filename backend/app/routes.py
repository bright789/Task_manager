from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from . import db
from .models import Task, User
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

@main.route('/api/tasks/<int:task_id>', methods=['PUT'])
@jwt_required()
def edit_task(task_id):
    user_id = get_jwt_identity()
    task = Task.query.filter_by(id=task_id, user_id=user_id).first_or_404()
    data = request.get_json()

    task.title = data.get('title', task.title)
    task.description = data.get('description', task.description)
    task.due_date = datetime.strptime(data['due_date'], '%Y-%m-%d').date() if 'due_date' in data else task.due_date
    task.completed = data.get('completed', task.completed)

    db.session.commit()
    return jsonify(task.to_dict()), 200

@main.route('/api/tasks/<int:task_id>', methods=['DELETE'])
@jwt_required()
def delete_task(task_id):
    user_id = get_jwt_identity()
    task = Task.query.filter_by(id=task_id, user_id=user_id).first_or_404()
    db.session.delete(task)
    db.session.commit()
    return jsonify({"message": "Task deleted successfully"}), 200

# Admin routes
@main.route('/api/admin/users', methods=['GET'])
@jwt_required()
def get_all_users():
    user_id = get_jwt_identity()
    user = User.query.get(user_id)
    if not user.is_admin:
        return jsonify({"msg": "Admin access required"}), 403

    users = User.query.all()
    users_list = [u.to_dict() for u in users]
    return jsonify(users_list), 200

@main.route('/api/admin/users/<int:user_id>', methods=['DELETE'])
@jwt_required()
def delete_user(user_id):
    admin_id = get_jwt_identity()
    admin = User.query.get(admin_id)
    if not admin.is_admin:
        return jsonify({"msg": "Admin access required"}), 403

    user = User.query.get(user_id)
    if not user:
        return jsonify({"msg": "User not found"}), 404

    db.session.delete(user)
    db.session.commit()
    return jsonify({"message": "User deleted successfully"}), 200

@main.route('/api/admin/assign_task', methods=['POST'])
@jwt_required()
def assign_task():
    admin_id = get_jwt_identity()
    admin = User.query.get(admin_id)
    if not admin.is_admin:
        return jsonify({"msg": "Admin access required"}), 403

    data = request.get_json()
    user_id = data.get('user_id')
    title = data.get('title')
    description = data.get('description', '')
    due_date_str = data.get('due_date')

    if not user_id or not title:
        return jsonify({"msg": "User ID and Title are required"}), 400

    if due_date_str:
        due_date = datetime.strptime(due_date_str, '%Y-%m-%d').date()
    else:
        due_date = None

    new_task = Task(
        title=title,
        description=description,
        due_date=due_date,
        user_id=user_id
    )
    db.session.add(new_task)
    db.session.commit()

    return jsonify(new_task.to_dict()), 201