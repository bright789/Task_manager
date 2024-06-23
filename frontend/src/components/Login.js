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
    <div>
      <h2>Login</h2>
      <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Login;
