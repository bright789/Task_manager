# Task Management System

![image](https://github.com/bright789/Task_manager/assets/22407572/43aba94d-628a-4d1c-ad19-119438b29801)

A web-based Task Management System built using Flask for the backend and React for the frontend. This system allows users to register, log in, and manage their tasks.

## Features

- User registration and authentication
- Task creation, viewing, and management
- JWT-based authentication
- State management using Redux
- Responsive UI designed with Bootstrap

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Docker
- Docker Compose

## Installation

### Using Docker

1. Clone the repository:

    ```sh
    git clone https://github.com/yourusername/Task_manager.git 
    cd Task_manager
    ```

2. Build and run the containers:

    ```sh
    docker-compose up --build
    ```

This command will build the Docker images for both the backend and frontend services, and start the containers.

3. Access the application:

    - Backend API: `http://localhost:5000`
    - Frontend UI: `http://localhost:3000`

### Traditional Installation (without Docker)

#### Backend

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

#### Frontend

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

1. Open your web browser and navigate to:
   - Backend API: `http://localhost:5000`
   - Frontend UI: `http://localhost:3000`

2. Register a new account or log in with an existing account.
3. Manage your tasks by creating, viewing, and updating them.

## Project Structure

```sh
Task_manager/
├── backend/
│   ├── .dockerignore
│   ├── .env
│   ├── delete_users.py
│   ├── Dockerfile
│   ├── requirements.txt
│   ├── run.py
│   └── app/
│       ├── __init__.py
│       ├── routes.py
│       ├── models.py
│       └── config.py
├── frontend/
│   ├── public/
│   │   ├── index.html
│   │   └── ...
│   ├── src/
│   │   ├── components/
│   │   │   ├── Register.js
│   │   │   ├── Login.js
│   │   │   ├── Dashboard.js
│   │   │   └── ...
│   │   ├── App.css
│   │   ├── App.js
│   │   ├── index.css
│   │   ├── index.js
│   │   └── ...
│   ├── Dockerfile
│   ├── package.json
│   └── ...
├── .gitignore
├── docker-compose.yml
├── project_structure.txt
├── README.md
└── api_tests.py
```

## Contributing
Fork the repository.

Create a new branch (git checkout -b feature-branch).

Make your changes.

Commit your changes (git commit -m 'Add new feature').

Push to the branch (git push origin feature-branch).

Open a Pull Request.

## Successful Docker Build

![image](https://github.com/bright789/Task_manager/assets/22407572/aee85ee9-4336-4f86-84ed-e83ccf94bbb2)

## License
This project is licensed under the MIT License - see the LICENSE file for details.

Feel free to modify the above as needed, especially the specific details in the Features, Usage, and Contributing sections.

This updated `README.md` includes detailed instructions on how to set up and run the application using Docker, as well as the traditional method without Docker.

