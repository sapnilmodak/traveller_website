import React from 'react';
import { FaClock, FaCalendarAlt, FaMapMarkerAlt, FaStar } from 'react-icons/fa';
import { motion } from 'framer-motion';
import './PackageCard.css';

const PackageCard = ({ item, type = 'package' }) => {
  const isHotel = type === 'hotel';
  const isActivity = type === 'activity';

  return (
    <motion.div 
      className="package-card-premium"
      whileHover={{ y: -10 }}
      transition={{ type: 'spring', stiffness: 300 }}
    >
      <div className="card-image-wrap">
        <img src={item.thumbSrc || item.src} alt={item.title} />
        <div className="card-badges">
          {(item.nights || item.days) && (
            <span className="badge duration">
              <FaClock /> {item.nights ? `${item.nights}N/` : ''}{item.days}D
            </span>
          )}
          {isHotel && item.rating && (
            <span className="badge rating">
              <FaStar /> {item.rating}
            </span>
          )}
        </div>
      </div>
      
      <div className="card-body">
        {isHotel && (
          <div className="card-location">
            <FaMapMarkerAlt /> {item.location}
          </div>
        )}
        <h3 className="card-title">{item.title}</h3>
        
        <div className="card-price-row">
          <div className="price-info">
            <span className="price-tag">Starting from</span>
            <span className="price-value">
              {item.price > 0 ? `₹${item.price.toLocaleString()}` : 'On Request'}
            </span>
          </div>
          <button className="btn-circle-arrow">
            →
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default PackageCard;
