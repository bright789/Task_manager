// src/components/ThemeToggle.js
import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun as faSunSolid, faMoon } from '@fortawesome/free-solid-svg-icons';
import { faSun as faSunRegular } from '@fortawesome/free-regular-svg-icons';

const ThemeToggle = () => {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    const currentTheme = localStorage.getItem('theme') || 'light';
    setTheme(currentTheme);
    document.body.classList.add(`${currentTheme}-mode`);
    updateNavbarAndCards(currentTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.body.classList.remove('light-mode', 'dark-mode');
    document.body.classList.add(`${newTheme}-mode`);
    localStorage.setItem('theme', newTheme);
    updateNavbarAndCards(newTheme);
  };

  const updateNavbarAndCards = (theme) => {
    const navbar = document.querySelector('.navbar');
    const cards = document.querySelectorAll('.card');

    if (theme === 'light') {
      navbar.classList.remove('navbar-dark-mode');
      navbar.classList.add('navbar-light-mode');
      cards.forEach(card => {
        card.classList.remove('card-dark-mode');
        card.classList.add('card-light-mode');
      });
    } else {
      navbar.classList.remove('navbar-light-mode');
      navbar.classList.add('navbar-dark-mode');
      cards.forEach(card => {
        card.classList.remove('card-light-mode');
        card.classList.add('card-dark-mode');
      });
    }
  };

  return (
    <button onClick={toggleTheme} className="theme-toggle-btn">
      <FontAwesomeIcon icon={theme === 'light' ? faMoon : faSunSolid} />
    </button>
  );
};

export default ThemeToggle;
