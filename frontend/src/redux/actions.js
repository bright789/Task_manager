import axios from 'axios';

export const setToken = (token) => ({
  type: 'SET_TOKEN',
  payload: token,
});

export const setAdmin = (isAdmin) => ({
  type: 'SET_ADMIN',
  payload: isAdmin,
});

export const setTasks = (tasks) => ({
  type: 'SET_TASKS',
  payload: tasks,
});

export const updateTask = (updatedTask) => ({
  type: 'UPDATE_TASK',
  payload: updatedTask,
});

export const deleteTask = (taskId) => ({
  type: 'DELETE_TASK',
  payload: taskId,
});

export const login = (email, password) => async (dispatch) => {
  try {
    const response = await axios.post('http://127.0.0.1:5000/api/login', {
      email,
      password,
    });
    const token = response.data.token;
    console.log('JWT Token:', token);  // Log the token
    dispatch(setToken(token));

    // Fetch user details to check if admin
    const userResponse = await axios.get('http://127.0.0.1:5000/api/user', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log('User details:', userResponse.data); // Log user details
    dispatch(setAdmin(userResponse.data.is_admin));
  } catch (error) {
    console.error('Error logging in:', error);
  }
};

