import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock } from 'react-icons/fa';
import { contactService } from '../services/api';
import './ContactUs.css';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await contactService.submit(formData);
      alert('Message sent successfully! We will get back to you soon.');
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
    } catch (error) {
      console.error('Error sending message:', error);
      alert('Failed to send message. Please try again later.');
    }
  };

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
                  <p>+91 9419283663</p>
                  <p>+91 9622135607</p>
                  <p>+91 7051109162</p>
                </div>
              </div>

              <div className="contact-card">
                <FaEnvelope className="contact-icon" />
                <div className="contact-details">
                  <h3>Email Us</h3>
                  <p>enquiry@miracleladakhadventure.com</p>
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
              <form className="contact-form" onSubmit={handleSubmit}>
                <div className="form-row">
                  <div className="form-group">
                    <label>Full Name</label>
                    <input 
                      type="text" 
                      name="name"
                      placeholder="Enter your name" 
                      required 
                      value={formData.name}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group">
                    <label>Email Address</label>
                    <input 
                      type="email" 
                      name="email"
                      placeholder="Enter your email" 
                      required 
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                
                <div className="form-row">
                  <div className="form-group">
                    <label>Phone Number</label>
                    <input 
                      type="tel" 
                      name="phone"
                      placeholder="Enter your phone" 
                      value={formData.phone}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group">
                    <label>Subject</label>
                    <input 
                      type="text" 
                      name="subject"
                      placeholder="Inquiry about..." 
                      value={formData.subject}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>Your Message</label>
                  <textarea 
                    name="message"
                    rows="5" 
                    placeholder="How can we help you?"
                    value={formData.message}
                    onChange={handleChange}
                  ></textarea>
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
