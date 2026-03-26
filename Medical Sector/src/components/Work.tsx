import React from 'react';
import '../styles/Work.css';

interface ServiceCard {
  id: number;
  icon: string;
  title: string;
  description: string;
  features: string[];
}

const Work: React.FC = () => {
  const services: ServiceCard[] = [
    {
      id: 1,
      icon: '🔬',
      title: 'Laboratory Services',
      description: 'Comprehensive diagnostic testing with advanced equipment',
      features: ['Blood Tests', 'Pathology', 'Genetic Testing'],
    },
    {
      id: 2,
      icon: '🩺',
      title: 'General Consultation',
      description: 'Expert medical advice from experienced physicians',
      features: ['General Check-up', 'Health History', 'Diagnosis'],
    },
    {
      id: 3,
      icon: '💉',
      title: 'Vaccination Program',
      description: 'Complete immunization for all age groups',
      features: ['Pediatric', 'Adult Vaccines', 'Travel Health'],
    },
    {
      id: 4,
      icon: '🏥',
      title: 'In-Patient Care',
      description: 'Comfortable rooms with modern medical facilities',
      features: ['24/7 Nursing', 'ICU Support', 'Private Rooms'],
    },
    {
      id: 5,
      icon: '👁️',
      title: 'Eye Care',
      description: 'Vision correction and eye disease treatment',
      features: ['Eye Exams', 'LASIK Surgery', 'Contact Lens'],
    },
    {
      id: 6,
      icon: '🦷',
      title: 'Dental Health',
      description: 'Professional dental care and cosmetic procedures',
      features: ['Cleaning', 'Root Canal', 'Whitening'],
    },
  ];

  return (
    <section className="work" id="services">
      <div className="work-container">
        <div className="work-header">
          <h2 className="work-title">Our Medical Services</h2>
          <p className="work-subtitle">
            Comprehensive healthcare solutions tailored to your needs
          </p>
          <div className="title-underline"></div>
        </div>

        <div className="services-grid">
          {services.map((service) => (
            <div key={service.id} className="service-card">
              <div className="card-icon">{service.icon}</div>
              <h3 className="card-title">{service.title}</h3>
              <p className="card-description">{service.description}</p>
              <div className="card-features">
                {service.features.map((feature, idx) => (
                  <span key={idx} className="feature-tag">
                    ✓ {feature}
                  </span>
                ))}
              </div>
              <button className="card-button">Read More</button>
            </div>
          ))}
        </div>

        <div className="work-stats">
          <div className="stat">
            <h3>10K+</h3>
            <p>Happy Patients</p>
          </div>
          <div className="stat">
            <h3>50+</h3>
            <p>Medical Staff</p>
          </div>
          <div className="stat">
            <h3>25+</h3>
            <p>Years Experience</p>
          </div>
          <div className="stat">
            <h3>24/7</h3>
            <p>Available Service</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Work;