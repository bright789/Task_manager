// src/App.js
import React from 'react';
import Register from './components/Register';
import Login from './components/Login';
import Tasks from './components/Tasks';
import { useSelector } from 'react-redux';
import './style.css';

const App = () => {
  const token = useSelector((state) => state.auth.token);

  return (
    <div className="container mt-3">
      <h1 className="text-center">Task Manager</h1>
      <div className="row">
        <div className="col-md-6">
          <Register />
        </div>
        <div className="col-md-6">
          <Login />
        </div>
      </div>
      {token && <Tasks />}
    </div>
  );
};

export default App;
