import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaPhone, FaEnvelope, FaMapMarkerAlt, FaPaperPlane } from 'react-icons/fa';
import logo from '../assets/logo.png';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer-premium">
      <div className="container">
        <div className="footer-top-row">
          <div className="footer-brand-col">
            <div className="footer-logo">
              <img src={logo} alt="Miracle Ladakh Adventure" />
              <div className="logo-text">
                <span className="brand-name">Miracle Ladakh</span>
                <span className="brand-sub">Adventure</span>
              </div>
            </div>
            <p className="footer-desc">Crafting extraordinary journeys in the heart of the Himalayas since 1999. Experience the miracle of nature with us.</p>
            <div className="social-pills">
              <a href="#" className="social-pill"><FaFacebook /></a>
              <a href="#" className="social-pill"><FaTwitter /></a>
              <a href="#" className="social-pill"><FaInstagram /></a>
              <a href="#" className="social-pill"><FaLinkedin /></a>
            </div>
          </div>

          <div className="footer-links-col">
            <h3>Quick Links</h3>
            <ul>
              <li><a href="/packages">Holiday Packages</a></li>
              <li><a href="/activities">Activities</a></li>
              <li><a href="/cab">Cab Services</a></li>
              <li><a href="/rental">Bike Rental</a></li>
            </ul>
          </div>

          <div className="footer-links-col">
            <h3>Support</h3>
            <ul>
              <li><a href="/about">About Us</a></li>
              <li><a href="/team">Our Team</a></li>
              <li><a href="/contact">Contact Us</a></li>
              <li><a href="/faq">Help & FAQ</a></li>
            </ul>
          </div>

          <div className="footer-newsletter-col">
            <h3>Newsletter</h3>
            <p>Subscribe to get special offers and travel updates.</p>
            <form className="newsletter-form">
              <input type="email" placeholder="Your email address" />
              <button type="submit"><FaPaperPlane /></button>
            </form>
          </div>
        </div>

        <div className="footer-bottom-row">
          <p>&copy; {new Date().getFullYear()} Miracle Ladakh Adventure. Built for Explorers.</p>
          <div className="footer-bottom-links">
            <a href="/privacy">Privacy Policy</a>
            <a href="/terms">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
