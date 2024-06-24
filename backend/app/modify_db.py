import sys
import os

# Add the parent directory to the system path
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from app import create_app, db
from app.models import User

app = create_app()
app.app_context().push()

# Replace with the email of the user you want to make an admin
email_to_update = 'brightjohn@gmail.com'

user = User.query.filter_by(email=email_to_update).first()
if user:
    user.is_admin = True
    db.session.commit()
    print(f"User {user.email} updated to admin.")
else:
    print("User not found.")
