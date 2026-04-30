import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import logo from '../assets/logo.png';
import './AboutUs.css';

const AboutUs = () => {
  return (
    <div className="about-page">
      <Navbar />
      <div className="page-header">
        <div className="container">
          <h1>About Us</h1>
          <p>Miracle Ladakh Adventure - Explore The World of Adventure Professionally Reliable</p>
        </div>
      </div>

      <section className="about-detail section-padding">
        <div className="container">
          <div className="about-grid">
            <div className="about-image">
              <img src={logo} alt="Miracle Ladakh Adventure Logo" className="large-logo" />
            </div>
            <div className="about-text">
              <h2>Established in 2000</h2>
              <p>Miracle Ladakh Adventure is one of the leading travel companies in Ladakh, India. Since our inception in 2000, we have been committed to providing unique and personalized travel experiences to our guests.</p>
              <p>Our philosophy is "Adventure With Care For Nature". We believe in sustainable tourism and strive to minimize our environmental impact while maximizing the positive contribution to the local community.</p>

              <h3>Our Mission</h3>
              <p>To provide high-quality travel services that showcase the beauty and culture of Ladakh while ensuring the safety and satisfaction of our guests.</p>

              <h3>Our Values</h3>
              <ul>
                <li><strong>Sustainability:</strong> We promote eco-friendly travel practices.</li>
                <li><strong>Local Expertise:</strong> Our team consists of local experts who know Ladakh inside out.</li>
                <li><strong>Customer Focus:</strong> We tailor our tours to meet the specific needs and interests of our guests.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="stats section-padding bg-gray">
        <div className="container">
          <div className="stats-grid">
            <div className="stat-item">
              <span className="stat-value">25+</span>
              <span className="stat-label">Years of Experience</span>
            </div>
            <div className="stat-item">
              <span className="stat-value">5000+</span>
              <span className="stat-label">Tours Conducted</span>
            </div>
            <div className="stat-item">
              <span className="stat-value">98%</span>
              <span className="stat-label">Customer Satisfaction</span>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AboutUs;
