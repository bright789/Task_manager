import requests
import json
import uuid

# API endpoints
register_url = "http://127.0.0.1:5000/api/register"
login_url = "http://127.0.0.1:5000/api/login"
tasks_url = "http://127.0.0.1:5000/api/tasks"

# Headers
headers = {
    "Content-Type": "application/json"
}

# Generate a unique email for each registration attempt
unique_email = f"test_{uuid.uuid4()}@example.com"

# Register user
register_data = {
    "email": unique_email,
    "password": "password"
}
register_response = requests.post(register_url, headers=headers, json=register_data)
print("Register Response:", register_response.json())

# If registration fails due to existing user, proceed to login
if register_response.status_code != 201 and "Email already exists" not in register_response.json().get("message", ""):
    print("Registration failed with status code:", register_response.status_code)
    print("Registration failed with response:", register_response.text)
else:
    # Login user
    login_data = {
        "email": unique_email,
        "password": "password"
    }
    login_response = requests.post(login_url, headers=headers, json=login_data)
    print("Login Response:", login_response.text)
    if login_response.status_code == 200:
        # Extract token correctly
        token = login_response.json().get("token")
        print("Token:", token)
    else:
        print("Login failed with status code:", login_response.status_code)
        print("Login failed with response:", login_response.text)
        token = None

    if token:
        # Add Authorization header
        auth_headers = {
            "Content-Type": "application/json",
            "Authorization": f"Bearer {token}"
        }

        # Create a new task
        task_data = {
            "title": "New Task",
            "description": "Task description",
            "due_date": "2024-06-30"
        }
        create_task_response = requests.post(tasks_url, headers=auth_headers, json=task_data)
        print("Create Task Status Code:", create_task_response.status_code)
        print("Create Task Response Text:", create_task_response.text)

        # Get tasks
        get_tasks_response = requests.get(tasks_url, headers=auth_headers)
        print("Get Tasks Response:", get_tasks_response.json())
    else:
        print("Token is not available, cannot proceed with creating or fetching tasks.")
