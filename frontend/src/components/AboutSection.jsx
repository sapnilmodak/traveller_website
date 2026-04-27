import React from 'react';
import { motion } from 'framer-motion';
import { FaHeart, FaShieldAlt } from 'react-icons/fa';
import { Row, Col, Typography, Button } from 'antd';
import './AboutSection.css';

const { Title, Text, Paragraph } = Typography;

const AboutSection = () => {
  return (
    <section className="about-modern section-padding">
      <div className="container">
        <Row gutter={[48, 48]} align="middle" className="about-grid-premium">
          <Col xs={24} lg={12} className="about-images-stack">
            <div className="img-main">
              <img src="https://images.unsplash.com/photo-1544085311-11a028465b03?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" alt="Ladakh Landscape" />
            </div>
            <div className="img-sub glass-card">
              <img src="https://images.unsplash.com/photo-1506461883276-594a12b11cf3?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80" alt="Ladakh Culture" />
            </div>
          </Col>
          
          <Col xs={24} lg={12} className="about-content-premium">
            <Text className="section-subtitle">Since 1999</Text>
            <Title level={2} className="section-title">Miracle Ladakh Adventure</Title>
            <Paragraph className="lead-text">
              We are more than just a travel agency; we are your gateway to the mesmerizing world of the Himalayas.
            </Paragraph>
            <Paragraph>
              At Miracle Ladakh Adventure, we believe every journey should be as unique as the traveler. Our team of local experts is dedicated to crafting personalized experiences that go beyond the ordinary, ensuring your safety and satisfaction every step of the way.
            </Paragraph>
            
            <div className="about-features">
              <div className="about-feat-item">
                <div className="feat-icon"><FaHeart /></div>
                <div>
                  <Title level={4}>Passion for Nature</Title>
                  <Text>We care deeply about preserving the pristine beauty of Ladakh.</Text>
                </div>
              </div>
              <div className="about-feat-item">
                <div className="feat-icon"><FaShieldAlt /></div>
                <div>
                  <Title level={4}>Safe & Secure</Title>
                  <Text>Your safety is our top priority with professional support.</Text>
                </div>
              </div>
            </div>

            <Button type="primary" size="large" className="mt-4">
              Learn More About Us
            </Button>
          </Col>
        </Row>
      </div>
    </section>
  );
};

export default AboutSection;
