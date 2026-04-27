import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaPaperPlane } from 'react-icons/fa';
import { Row, Col, Input, Button, Typography } from 'antd';
import logo from '../assets/logo.png';
import './Footer.css';

const { Title, Text } = Typography;

const Footer = () => {
  return (
    <footer className="footer-premium">
      <div className="container">
        <Row gutter={[40, 40]} className="footer-top-row">
          <Col xs={24} lg={8} className="footer-brand-col">
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
          </Col>

          <Col xs={12} sm={6} lg={4} className="footer-links-col">
            <Title level={4}>Quick Links</Title>
            <ul>
              <li><a href="/packages">Holiday Packages</a></li>
              <li><a href="/activities">Activities</a></li>
              <li><a href="/cab">Cab Services</a></li>
              <li><a href="/rental">Bike Rental</a></li>
            </ul>
          </Col>

          <Col xs={12} sm={6} lg={4} className="footer-links-col">
            <Title level={4}>Support</Title>
            <ul>
              <li><a href="/about">About Us</a></li>
              <li><a href="/team">Our Team</a></li>
              <li><a href="/contact">Contact Us</a></li>
              <li><a href="/faq">Help & FAQ</a></li>
            </ul>
          </Col>

          <Col xs={24} sm={12} lg={8} className="footer-newsletter-col">
            <Title level={4}>Newsletter</Title>
            <p>Subscribe to get special offers and travel updates.</p>
            <div className="newsletter-form">
              <Input 
                placeholder="Your email address" 
                size="large"
                suffix={
                  <Button type="primary" icon={<FaPaperPlane />} />
                }
              />
            </div>
          </Col>
        </Row>

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
