// src/App.js
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Register from './components/Register';
import Login from './components/Login';
import Tasks from './components/Tasks';
import Admin from './components/Admin';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import './style.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const Home = () => (
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
  </div>
);

const App = () => {
  const token = useSelector((state) => state.auth.token);
  const isAdmin = useSelector((state) => state.auth.isAdmin);

  useEffect(() => {
    const currentTheme = localStorage.getItem('theme') || 'light';
    document.body.classList.add(`${currentTheme}-mode`);
  }, []);

  return (
    <Router>
      <div className="d-flex flex-column min-vh-100">
        <Navigation />
        <main className="flex-fill">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/tasks" element={<Tasks />} />
            {isAdmin && <Route path="/admin" element={<Admin />} />}
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
