import React from 'react';
import { motion } from 'framer-motion';
import { FaCompass, FaHeart, FaShieldAlt } from 'react-icons/fa';
import './AboutSection.css';

const AboutSection = () => {
  return (
    <section className="about-modern section-padding">
      <div className="container">
        <div className="about-grid-premium">
          <div className="about-images-stack">
            <div className="img-main">
              <img src="https://images.unsplash.com/photo-1544085311-11a028465b03?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" alt="Ladakh Landscape" />
            </div>
            <div className="img-sub glass-card">
              <img src="https://images.unsplash.com/photo-1506461883276-594a12b11cf3?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80" alt="Ladakh Culture" />
            </div>
          </div>
          
          <div className="about-content-premium">
            <span className="section-subtitle">Since 1999</span>
            <h2 className="section-title">Miracle Ladakh Adventure</h2>
            <p className="lead-text">We are more than just a travel agency; we are your gateway to the mesmerizing world of the Himalayas.</p>
            <p>At Miracle Ladakh Adventure, we believe every journey should be as unique as the traveler. Our team of local experts is dedicated to crafting personalized experiences that go beyond the ordinary, ensuring your safety and satisfaction every step of the way.</p>
            
            <div className="about-features">
              <div className="about-feat-item">
                <div className="feat-icon"><FaHeart /></div>
                <div>
                  <h4>Passion for Nature</h4>
                  <p>We care deeply about preserving the pristine beauty of Ladakh.</p>
                </div>
              </div>
              <div className="about-feat-item">
                <div className="feat-icon"><FaShieldAlt /></div>
                <div>
                  <h4>Safe & Secure</h4>
                  <p>Your safety is our top priority with professional support.</p>
                </div>
              </div>
            </div>

            <button className="btn btn-primary mt-4">Learn More About Us</button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
