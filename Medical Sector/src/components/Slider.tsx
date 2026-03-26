import React, { useState, useEffect } from 'react';
import '../styles/Slider.css';

interface SlideItem {
  id: number;
  title: string;
  subtitle: string;
  image: string;
  icon: string;
}

const Slider: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides: SlideItem[] = [
    {
      id: 1,
      title: 'Advanced Medical Care',
      subtitle: 'State-of-the-art facilities and expert physicians',
      image: '🏥',
      icon: '🔬',
    },
    {
      id: 2,
      title: 'Emergency Services',
      subtitle: '24/7 Emergency Response Team Available',
      image: '🚑',
      icon: '⚕️',
    },
    {
      id: 3,
      title: 'Patient Wellness',
      subtitle: 'Comprehensive health check-ups and consultations',
      image: '💪',
      icon: '🩺',
    },
    {
      id: 4,
      title: 'Specialist Doctors',
      subtitle: 'Experienced medical professionals for all specialties',
      image: '👨‍⚕️',
      icon: '📋',
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <section className="slider" id="home">
      <div className="slider-container">
        <div className="slides-wrapper">
          {slides.map((slide, index) => (
            <div
              key={slide.id}
              className={`slide ${index === currentSlide ? 'active' : ''}`}
            >
              <div className="slide-content">
                <div className="slide-icon-large">{slide.image}</div>
                <h2 className="slide-title">{slide.title}</h2>
                <p className="slide-subtitle">{slide.subtitle}</p>
                <button className="slide-button">Learn More</button>
              </div>
            </div>
          ))}
        </div>

        <button className="slider-button prev" onClick={prevSlide}>
          ‹
        </button>
        <button className="slider-button next" onClick={nextSlide}>
          ›
        </button>

        <div className="slider-dots">
          {slides.map((_, index) => (
            <button
              key={index}
              className={`dot ${index === currentSlide ? 'active' : ''}`}
              onClick={() => setCurrentSlide(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Slider;