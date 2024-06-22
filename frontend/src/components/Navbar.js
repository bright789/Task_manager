import React, { useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
  const { setToken } = useContext(AuthContext);
  const history = useHistory();

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken('');
    history.push('/login');
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          Task Manager
        </Typography>
        <Button color="inherit" component={Link} to="/tasks">
          Tasks
        </Button>
        <Button color="inherit" component={Link} to="/add-task">
          Add Task
        </Button>
        <Button color="inherit" onClick={handleLogout}>
          Logout
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
