from app import create_app, db
from app.models import User, Task

# Initialize the Flask app
app = create_app()

# Define the emails of the users to be deleted
user_emails = ['test@example.com', 'test_58833fcb-2abf-4d71-a87d-06e6ab2e5cad@example.com', 'test_fb104eb0-34da-46ce-abf6-d3c2e824657c@example.com']

with app.app_context():
    # Find the users by email
    users = User.query.filter(User.email.in_(user_emails)).all()

    for user in users:
        # Find and delete associated tasks
        Task.query.filter_by(user_id=user.id).delete()
        # Delete the user
        db.session.delete(user)

    # Commit the changes
    db.session.commit()

print("Deleted specified users and their tasks.")
