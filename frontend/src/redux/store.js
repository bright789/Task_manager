import { createStore, applyMiddleware, combineReducers } from 'redux';
import { createLogger } from 'redux-logger';
import { thunk } from 'redux-thunk';
import authReducer from './authReducer';
import tasksReducer from './tasksReducer';
import { setToken, setAdmin, logout } from './actions';
import axios from 'axios';

const rootReducer = combineReducers({
  auth: authReducer,
  tasks: tasksReducer,
});

const logger = createLogger();

const store = createStore(
  rootReducer,
  applyMiddleware(thunk, logger)
);

// Load token from localStorage/sessionStorage
const token = localStorage.getItem('token');
// const token = sessionStorage.getItem('token'); // Uncomment if using sessionStorage

if (token) {
  store.dispatch(setToken(token));

  // Fetch user details to check if admin
  axios.get('http://127.0.0.1:5000/api/user', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then(response => {
      store.dispatch(setAdmin(response.data.is_admin));
    })
    .catch(error => {
      console.error('Error fetching user details:', error);
      store.dispatch(logout()); // Clear token if fetching user details fails
    });
}

export default store;
