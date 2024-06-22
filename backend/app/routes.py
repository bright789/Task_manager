"""
Main routes for the Flask application.
"""

from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from . import db
from .models import Task

main = Blueprint('main', __name__)

@main.route('/api/tasks', methods=['GET'])
@jwt_required()
def get_tasks():
    """
    Get all tasks for the current user.
    """
    user_id = get_jwt_identity()
    tasks = Task.query.filter_by(user_id=user_id).all()
    return jsonify([task.to_dict() for task in tasks])

@main.route('/api/tasks', methods=['POST'])
@jwt_required()
def add_task():
    """
    Add a new task for the current user.
    """
    data = request.get_json()
    user_id = get_jwt_identity()
    new_task = Task(
        title=data['title'],
        description=data.get('description', ''),
        due_date=data.get('due_date'),
        user_id=user_id
    )
    db.session.add(new_task)
    db.session.commit()
    return jsonify(new_task.to_dict()), 201
