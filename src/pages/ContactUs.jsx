import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock } from 'react-icons/fa';
import './ContactUs.css';

const ContactUs = () => {
  return (
    <div className="contact-page">
      <Navbar />
      <div className="page-header">
        <div className="container">
          <h1>Contact Us</h1>
          <p>Get in Touch with Our Experts</p>
        </div>
      </div>

      <section className="contact-section section-padding">
        <div className="container">
          <div className="contact-grid">
            <div className="contact-info-cards">
              <div className="contact-card">
                <FaMapMarkerAlt className="contact-icon" />
                <div className="contact-details">
                  <h3>Our Office</h3>
                  <p>Skara Yokma, Councilor Quarter Road, Leh Ladakh, India - 194101</p>
                </div>
              </div>

              <div className="contact-card">
                <FaPhone className="contact-icon" />
                <div className="contact-details">
                  <h3>Call Us</h3>
                  <p>+91 6005994400</p>
                  <p>+91 9858394400</p>
                </div>
              </div>

              <div className="contact-card">
                <FaEnvelope className="contact-icon" />
                <div className="contact-details">
                  <h3>Email Us</h3>
                  <p>info@overlandescape.com</p>
                  <p>overlandescape@gmail.com</p>
                </div>
              </div>

              <div className="contact-card">
                <FaClock className="contact-icon" />
                <div className="contact-details">
                  <h3>Working Hours</h3>
                  <p>Mon - Sat: 09:00 AM - 07:00 PM</p>
                  <p>Sunday: Closed</p>
                </div>
              </div>
            </div>

            <div className="contact-form-container">
              <h2>Send Us a Message</h2>
              <form className="contact-form">
                <div className="form-row">
                  <div className="form-group">
                    <label>Full Name</label>
                    <input type="text" placeholder="Enter your name" required />
                  </div>
                  <div className="form-group">
                    <label>Email Address</label>
                    <input type="email" placeholder="Enter your email" required />
                  </div>
                </div>
                
                <div className="form-row">
                  <div className="form-group">
                    <label>Phone Number</label>
                    <input type="tel" placeholder="Enter your phone" />
                  </div>
                  <div className="form-group">
                    <label>Subject</label>
                    <input type="text" placeholder="Inquiry about..." />
                  </div>
                </div>

                <div className="form-group">
                  <label>Your Message</label>
                  <textarea rows="5" placeholder="How can we help you?"></textarea>
                </div>

                <button type="submit" className="btn btn-primary btn-block">Send Message</button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <section className="map-section">
        <iframe 
          title="Leh Office"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13264.444444444444!2d77.58!3d34.15!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38fdeb!2sLeh%2C%20Ladakh!5e0!3m2!1sen!2sin!4v1234567890" 
          width="100%" 
          height="450" 
          style={{ border: 0 }} 
          allowFullScreen="" 
          loading="lazy"
        ></iframe>
      </section>

      <Footer />
    </div>
  );
};

export default ContactUs;
