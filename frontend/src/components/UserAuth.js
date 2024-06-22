import React, { useState, useContext } from 'react';
import { Container, TextField, Button, Typography, Link } from '@mui/material';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { useHistory } from 'react-router-dom';

const UserAuth = ({ match }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setToken } = useContext(AuthContext);
  const history = useHistory();

  const isLogin = match.path === '/login';

  const handleSubmit = async (e) => {
    e.preventDefault();
    const endpoint = isLogin ? '/api/login' : '/api/register';
    try {
      const response = await axios.post(endpoint, { email, password });
      setToken(response.data.token);
      localStorage.setItem('token', response.data.token);
      history.push('/tasks');
    } catch (error) {
      console.error('Error during authentication:', error);
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        {isLogin ? 'Login' : 'Register'}
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Email"
          fullWidth
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          label="Password"
          type="password"
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button type="submit" variant="contained" color="primary">
          {isLogin ? 'Login' : 'Register'}
        </Button>
      </form>
      <Link href="#" onClick={() => history.push(isLogin ? '/register' : '/login')}>
        {isLogin ? 'Switch to Register' : 'Switch to Login'}
      </Link>
    </Container>
  );
};

export default UserAuth;
