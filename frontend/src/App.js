// src/App.js
import React from 'react';
import Register from './components/Register';
import Login from './components/Login';
import Tasks from './components/Tasks';
import { useSelector } from 'react-redux';

const App = () => {
  const token = useSelector((state) => state.auth.token);

  return (
    <div>
      <h1>Task Manager</h1>
      <Register />
      <Login />
      {token && <Tasks />}
    </div>
  );
};

export default App;
