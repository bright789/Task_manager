# Task Management System

![image](https://github.com/bright789/Task_manager/assets/22407572/6d2e4ce5-b6af-4219-998f-c61d8e072ef2)

A web-based Task Management System built using Flask for the backend and React for the frontend. This system allows users to register, log in, and manage their tasks.

## Features

- User registration and authentication
- Task creation, viewing, and management
- JWT-based authentication
- State management using Redux
- Responsive UI designed with Bootstrap

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Python 3.x
- Node.js and npm
- Flask
- React

## Installation

### Backend

1. Clone the repository:

    ```sh
    git clone https://github.com/yourusername/task-management-system.git
    cd task-management-system/backend
    ```

2. Create a virtual environment and activate it:

    ```sh
    python -m venv .venv
    .venv\Scripts\activate
    ```

3. Install the required packages:

    ```sh
    pip install -r requirements.txt
    ```

4. Set up the environment variables:

    Create a `.env` file in the `backend` directory and add the following:

    ```sh
    FLASK_APP=run.py
    FLASK_ENV=development
    SECRET_KEY=your_secret_key
    SQLALCHEMY_DATABASE_URI=sqlite:///db.sqlite3
    JWT_SECRET_KEY=your_jwt_secret_key
    ```

5. Initialize the database:

    ```sh
    flask db init
    flask db migrate
    flask db upgrade
    ```

6. Run the backend server:

    ```sh
    flask run
    ```

### Frontend

1. Navigate to the `frontend` directory:

    ```sh
    cd ../frontend
    ```

2. Install the required packages:

    ```sh
    npm install
    ```

3. Start the React development server:

    ```sh
    npm start
    ```

## Usage

1. Open your web browser and navigate to `http://localhost:3000`.
2. Register a new account or log in with an existing account.
3. Manage your tasks by creating, viewing, and updating them.

## Project Structure

```sh
task-management-system/
├── backend/
│   ├── .venv/
│   ├── app/
│   │   ├── __init__.py
│   │   ├── models.py
│   │   ├── routes.py
│   ├── migrations/
│   ├── .env
│   ├── requirements.txt
│   ├── run.py
├── frontend/
│   ├── node_modules/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── redux/
│   │   ├── App.js
│   │   ├── index.js
│   ├── .env
│   ├── package.json