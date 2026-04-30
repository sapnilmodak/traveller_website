import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube, FaPaperPlane } from 'react-icons/fa';
import { Row, Col, Input, Button, Typography } from 'antd';
import logo from '../assets/logo.png';
import './Footer.css';

const { Title, Text } = Typography;

const Footer = () => {
  const [newsletterEmail, setNewsletterEmail] = React.useState('');

  const handleNewsletterSubmit = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(newsletterEmail)) {
      alert('Please enter a valid email address');
      return;
    }
    alert('Thank you for subscribing to our newsletter!');
    setNewsletterEmail('');
  };
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
            <p className="footer-desc">Crafting extraordinary journeys in the heart of the Himalayas since 2000. Experience the miracle of nature with us.</p>
            <div className="social-pills">
              <a href="#" className="social-pill"><FaFacebook /></a>
              <a href="https://www.youtube.com/@miracle_ladakh_adventure_" target="_blank" rel="noopener noreferrer" className="social-pill"><FaYoutube /></a>
              <a href="#" className="social-pill"><FaInstagram /></a>
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
              <li><a href="/contact">Contact Us</a></li>
            </ul>
          </Col>

          <Col xs={12} sm={6} lg={4} className="footer-links-col">
            <Title level={4}>Contact Us</Title>
            <ul className="contact-list">
              <li><Text type="secondary" style={{color: "#94a3b8"}}>+91 9419283663</Text></li>
              <li><Text type="secondary" style={{color: "#94a3b8"}}>+91 9622135607</Text></li>
              <li><Text type="secondary" style={{color: "#94a3b8"}}>+91 7051109162</Text></li>
              <li><Text type="secondary" style={{color: "#94a3b8"}}>enquiry@miracleladakhadventure.com</Text></li>
            </ul>
          </Col>

          <Col xs={24} sm={12} lg={4} className="footer-newsletter-col">
            <Title level={4}>Newsletter</Title>
            <div className="newsletter-form">
              <Input 
                placeholder="Email" 
                size="large"
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                suffix={
                  <Button 
                    type="primary" 
                    icon={<FaPaperPlane />} 
                    onClick={handleNewsletterSubmit}
                  />
                }
              />
            </div>
          </Col>
        </Row>

        <div className="footer-bottom-row">
          <p>&copy; {new Date().getFullYear()} Miracle Ladakh Adventure. Built for Explorers.</p>
          <div className="footer-bottom-links">
            <a href="/policy/privacy-policy">Privacy Policy</a>
            <a href="/policy/terms-conditions">Terms & Conditions</a>
            <a href="/policy/refund-policy">Refund Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
