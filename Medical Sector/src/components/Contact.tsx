import React from 'react';
import '../styles/Contact.css';

const Contact: React.FC = () => {
  return (
    <section className="contact" id="contact">
      <div className="contact-container">
        <div className="contact-header">
          <h2 className="contact-title">Get in Touch</h2>
          <p className="contact-subtitle">
            Have questions? We're here to help. Reach out to us anytime.
          </p>
        </div>

        <div className="contact-content">
          <div className="contact-info">
            <div className="info-card">
              <div className="info-icon">📍</div>
              <h3>Location</h3>
              <p>123 Medical Plaza, Health Street</p>
              <p>New York, NY 10001</p>
            </div>

            <div className="info-card">
              <div className="info-icon">📞</div>
              <h3>Phone</h3>
              <p>+1 (555) 123-4567</p>
              <p>Mon-Fri: 9AM - 6PM EST</p>
            </div>

            <div className="info-card">
              <div className="info-icon">✉️</div>
              <h3>Email</h3>
              <p>contact@medcare.com</p>
              <p>response within 24 hours</p>
            </div>

            <div className="info-card">
              <div className="info-icon">⏰</div>
              <h3>Hours</h3>
              <p>Emergency: 24/7 Open</p>
              <p>Regular: 8AM - 8PM Daily</p>
            </div>
          </div>

          <form className="contact-form">
            <div className="form-group">
              <input
                type="text"
                placeholder="Your Name"
                className="form-input"
                disabled
              />
            </div>

            <div className="form-group">
              <input
                type="email"
                placeholder="Your Email"
                className="form-input"
                disabled
              />
            </div>

            <div className="form-group">
              <input
                type="text"
                placeholder="Subject"
                className="form-input"
                disabled
              />
            </div>

            <div className="form-group">
              <textarea
                placeholder="Your Message"
                rows={6}
                className="form-textarea"
                disabled
              ></textarea>
            </div>

            <button type="submit" className="form-button" disabled>
              Send Message
            </button>
          </form>
        </div>

        <div className="contact-map">
          <div className="map-placeholder">
            <div className="map-icon">🗺️</div>
            <p>Interactive Map Coming Soon</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;