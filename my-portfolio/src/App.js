import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './components/Home';
import './styles/global.css';

export default function App() {
  return (
    <BrowserRouter>
      <div className="app-shell">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="*" element={<Home />} />
        </Routes>

        <footer className="site-footer">
          <div className="footer-inner">
            <span>© 2026 Ramakanta Katual</span>
            <span>Cybersecurity Consultant</span>
          </div>
        </footer>
      </div>
    </BrowserRouter>
  );
}
