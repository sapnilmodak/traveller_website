import React from 'react';
import { FaMapMarkerAlt, FaCalendarAlt, FaSearch, FaCompass } from 'react-icons/fa';
import { motion } from 'framer-motion';
import heroVideo from '../assets/hero-video.mp4';
import './HeroSection.css';

const HeroSection = () => {
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
            <h1>Discover the Miracle of <span className="text-gradient">Ladakh</span></h1>
            <p>Experience the mesmerizing landscapes and spiritual serene of the Himalayas with our curated adventure tours.</p>
          </motion.div>
          
          <motion.div 
            className="search-container glass-card"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="search-tabs">
              <button className="active">Packages</button>
              <button>Activities</button>
              <button>Hotels</button>
              <button>Cab/Rental</button>
            </div>
            
            <form className="search-grid">
              <div className="search-input">
                <label><FaMapMarkerAlt /> Destination</label>
                <input type="text" placeholder="Where do you want to go?" />
              </div>
              
              <div className="search-input">
                <label><FaCalendarAlt /> Duration</label>
                <select>
                  <option value="">Any Duration</option>
                  <option value="1-4">1-4 Days</option>
                  <option value="5-8">5-8 Days</option>
                  <option value="9+">9+ Days</option>
                </select>
              </div>

              <div className="search-input">
                <label><FaCalendarAlt /> Month</label>
                <select>
                  <option value="">Select Month</option>
                  <option value="4">April</option>
                  <option value="5">May</option>
                  <option value="6">June</option>
                </select>
              </div>

              <button type="submit" className="btn btn-primary search-submit">
                <FaSearch /> Explore Now
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
