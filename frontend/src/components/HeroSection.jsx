import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaMapMarkerAlt, FaCalendarAlt, FaSearch, FaCompass } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { Row, Col, Select, Input, Button, Typography } from 'antd';
import heroVideo from '../assets/hero-video.mp4';
import './HeroSection.css';

const { Title, Text } = Typography;
const { Option } = Select;

const HeroSection = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('Packages');
  const [searchParams, setSearchParams] = useState({
    destination: '',
    duration: '',
    month: ''
  });

  const handleSearch = (e) => {
    if (e) e.preventDefault();
    const destination = searchParams.destination;
    
    if (activeTab === 'Packages') {
      navigate(`/packages?destination=${destination}`);
    } else if (activeTab === 'Activities') {
      navigate(`/activities?destination=${destination}`);
    } else if (activeTab === 'Cab/Rental') {
      navigate(`/cab?destination=${destination}`);
    }
  };

  return (
    <section className="hero">
      <div className="hero-video-container">
        <video autoPlay muted loop playsInline className="hero-video">
          <source src={heroVideo} type="video/mp4" />
        </video>
        <div className="hero-overlay"></div>
      </div>
      
      <div className="container">
        <div className="hero-content">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="hero-subtitle"><FaCompass /> Your Journey Starts Here</span>
            <Title level={1} className="hero-title">
              Discover the Miracle of <span className="text-gradient">Ladakh</span>
            </Title>
            <Text className="hero-desc">
              Experience the mesmerizing landscapes and spiritual serene of the Himalayas with our curated adventure tours.
            </Text>
          </motion.div>
          
          <motion.div 
            className="search-container glass-card"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="search-tabs">
              {['Packages', 'Activities', 'Cab/Rental'].map(tab => (
                <button 
                  key={tab}
                  className={activeTab === tab ? 'active' : ''}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab}
                </button>
              ))}
            </div>
            
            <form onSubmit={handleSearch}>
              <Row gutter={[24, 24]} align="bottom">
                <Col xs={24} md={8} lg={9}>
                  <div className="search-input">
                    <label><FaMapMarkerAlt /> Destination</label>
                    <Input 
                      placeholder="Where do you want to go?" 
                      value={searchParams.destination}
                      onChange={(e) => setSearchParams({...searchParams, destination: e.target.value})}
                      size="large"
                      prefix={<FaMapMarkerAlt style={{ color: 'var(--primary)' }} />}
                    />
                  </div>
                </Col>
                
                <Col xs={12} md={5} lg={5}>
                  <div className="search-input">
                    <label><FaCalendarAlt /> Duration</label>
                    <Select 
                      placeholder="Any Duration"
                      value={searchParams.duration}
                      onChange={(val) => setSearchParams({...searchParams, duration: val})}
                      size="large"
                      style={{ width: '100%' }}
                    >
                      <Option value="">Any Duration</Option>
                      <Option value="1-4">1-4 Days</Option>
                      <Option value="5-8">5-8 Days</Option>
                      <Option value="9+">9+ Days</Option>
                    </Select>
                  </div>
                </Col>

                <Col xs={12} md={5} lg={5}>
                  <div className="search-input">
                    <label><FaCalendarAlt /> Month</label>
                    <Select
                      placeholder="Select Month"
                      value={searchParams.month}
                      onChange={(val) => setSearchParams({...searchParams, month: val})}
                      size="large"
                      style={{ width: '100%' }}
                    >
                      <Option value="">Select Month</Option>
                      <Option value="4">April</Option>
                      <Option value="5">May</Option>
                      <Option value="6">June</Option>
                      <Option value="7">July</Option>
                      <Option value="8">August</Option>
                      <Option value="9">September</Option>
                    </Select>
                  </div>
                </Col>

                <Col xs={24} md={6} lg={5}>
                  <Button 
                    type="primary" 
                    icon={<FaSearch />} 
                    onClick={handleSearch} 
                    size="large" 
                    block 
                    className="search-submit"
                  >
                    Explore Now
                  </Button>
                </Col>
              </Row>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
