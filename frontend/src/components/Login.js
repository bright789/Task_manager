// src/components/Login.js
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { setToken } from '../redux/actions';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://127.0.0.1:5000/api/login', {
        email,
        password,
      });
      dispatch(setToken(response.data.token));
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">Login</h5>
        <div className="mb-3">
          <label htmlFor="loginEmail" className="form-label">Email:</label>
          <input type="email" id="loginEmail" className="form-control" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="mb-3">
          <label htmlFor="loginPassword" className="form-label">Password:</label>
          <input type="password" id="loginPassword" className="form-control" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button onClick={handleLogin} className="btn btn-primary">Login</button>
      </div>
    </div>
  );
};

export default Login;
