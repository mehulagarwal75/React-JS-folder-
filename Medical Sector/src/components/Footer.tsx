import React from 'react';
import '../styles/Footer.css';

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-section">
            <div className="footer-logo">
              <div className="footer-logo-icon">💊</div>
              <h3>MedCare</h3>
            </div>
            <p className="footer-description">
              Providing world-class healthcare services with compassion and excellence.
            </p>
            <div className="social-links">
              <a href="#" className="social-icon">f</a>
              <a href="#" className="social-icon">𝕏</a>
              <a href="#" className="social-icon">in</a>
              <a href="#" className="social-icon">📷</a>
            </div>
          </div>

          <div className="footer-section">
            <h4 className="footer-title">Quick Links</h4>
            <ul className="footer-links">
              <li><a href="#home">Home</a></li>
              <li><a href="#services">Services</a></li>
              <li><a href="#work">Our Work</a></li>
              <li><a href="#contact">Contact Us</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4 className="footer-title">Services</h4>
            <ul className="footer-links">
              <li><a href="#services">Laboratory Tests</a></li>
              <li><a href="#services">Consultations</a></li>
              <li><a href="#services">Emergency Care</a></li>
              <li><a href="#services">Surgical Services</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4 className="footer-title">Information</h4>
            <ul className="footer-links">
              <li><a href="#privacy">Privacy Policy</a></li>
              <li><a href="#terms">Terms & Conditions</a></li>
              <li><a href="#careers">Careers</a></li>
              <li><a href="#faq">FAQ</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4 className="footer-title">Newsletter</h4>
            <p className="footer-text">Subscribe for health tips and updates</p>
            <div className="newsletter-form">
              <input
                type="email"
                placeholder="Enter your email"
                className="newsletter-input"
                disabled
              />
              <button className="newsletter-button" disabled>
                Subscribe
              </button>
            </div>
          </div>
        </div>

        <div className="footer-divider"></div>

        <div className="footer-bottom">
          <p className="footer-text-center">
            &copy; 2024 MedCare Healthcare Solutions. All rights reserved.
          </p>
          <div className="footer-badges">
            <span className="badge">ISO Certified</span>
            <span className="badge">HIPAA Compliant</span>
            <span className="badge">24/7 Support</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;