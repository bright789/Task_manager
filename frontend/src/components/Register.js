// src/components/Register.js
import React, { useState } from 'react';
import axios from 'axios';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleRegister = async () => {
    if (!email || !password) {
      setError('Email and Password are required');
      return;
    }

    try {
      const response = await axios.post('http://127.0.0.1:5000/api/register', {
        email,
        password,
      });
      alert(response.data.message);
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">Register</h5>
        {error && <div className="alert alert-danger">{error}</div>}
        <div className="mb-3">
          <label htmlFor="registerEmail" className="form-label">Email:</label>
          <input type="email" id="registerEmail" className="form-control" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="mb-3">
          <label htmlFor="registerPassword" className="form-label">Password:</label>
          <input type="password" id="registerPassword" className="form-control" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button onClick={handleRegister} className="btn btn-primary">Register</button>
      </div>
    </div>
  );
};

export default Register;
