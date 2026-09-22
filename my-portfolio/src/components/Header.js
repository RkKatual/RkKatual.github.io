import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import './styling/Home.css';

export default function Header() {
  const [dark, setDark] = useState(() => {
    try {
      const saved = localStorage.getItem('portfolio-theme');
      return saved ? saved === 'dark' : true;
    } catch (error) {
      return true;
    }
  });

  useEffect(() => {
    const theme = dark ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', theme);

    try {
      localStorage.setItem('portfolio-theme', theme);
    } catch (error) {
      // Ignore storage failures in private/shared browsing.
    }
  }, [dark]);

  return (
    <header className="site-header" role="banner">
      <div className="header-inner">
        <motion.div className="brand" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <Link to="/" className="brand-link">Ramakanta Katual</Link>
        </motion.div>

        <div className="controls">
          <button
            className="theme-btn"
            onClick={() => setDark(d => !d)}
            aria-label="Toggle theme"
            aria-pressed={dark}
          >
            {dark ? 'Light' : 'Dark'}
          </button>
        </div>
      </div>
    </header>
  );
}