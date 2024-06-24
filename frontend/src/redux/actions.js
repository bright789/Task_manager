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

    // Store the token in localStorage/sessionStorage
    localStorage.setItem('token', token);
    // sessionStorage.setItem('token', token); // Uncomment if using sessionStorage

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



export const logout = () => (dispatch) => {
  // Remove the token from localStorage/sessionStorage
  localStorage.removeItem('token');
  sessionStorage.removeItem('token'); // In case you're using sessionStorage

  // Dispatch actions to clear the state
  dispatch(setToken(null));
  dispatch(setAdmin(false));
  dispatch(setTasks([])); // Clear tasks or any other state if needed
};
