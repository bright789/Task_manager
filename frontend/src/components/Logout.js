// src/components/Logout.js
import React from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../redux/actions';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/'); // Redirect to home page after logout
  };

  return (
    <button onClick={handleLogout} className="btn btn-secondary">
      Logout
    </button>
  );
};

export default Logout;
