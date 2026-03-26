import React from 'react';
import '../styles/Header.css';

const Header: React.FC = () => {

  return (
    <header className="header">
      <div className="header-container">
        <div className="logo">
          <div className="logo-icon">💊</div>
          <div className="logo-text">
            <h1>MedCare</h1>
            <p>Healthcare Solutions</p>
          </div>
        </div>

        <nav className="navbar">
          <ul className="nav-links">
            <li><a href="#home" className="nav-link">Home</a></li>
            <li><a href="#services" className="nav-link">Services</a></li>
            <li><a href="#work" className="nav-link">Our Work</a></li>
            <li><a href="#contact" className="nav-link">Contact</a></li>
          </ul>
        </nav>

        <button className="cta-button">Book Appointment</button>
      </div>

      <div className="header-divider"></div>
    </header>
  );
};

export default Header;