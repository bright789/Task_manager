// src/redux/store.js
import { createStore, combineReducers } from 'redux';
import authReducer from './authReducer';
import tasksReducer from './tasksReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  tasks: tasksReducer,
});

const store = createStore(rootReducer);

export default store;
