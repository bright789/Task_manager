// src/components/Login.js
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../redux/actions';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const dispatch = useDispatch();

  const handleLogin = async (event) => {
    event.preventDefault();

    if (!email || !password) {
      setError('Email and password are required');
      return;
    }

    try {
      await dispatch(login(email, password));
      setError('');
    } catch (error) {
      setError(error.response?.data?.message || 'Error logging in');
    }
  };

  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">Login</h5>
        {error && <div className="alert alert-danger">{error}</div>}
        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label htmlFor="loginEmail" className="form-label">Email:</label>
            <input
              type="email"
              id="loginEmail"
              className="form-control"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="loginPassword" className="form-label">Password:</label>
            <input
              type="password"
              id="loginPassword"
              className="form-control"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
