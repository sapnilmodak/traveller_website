import React from 'react';
import { Link } from 'react-router-dom';
import { FaClock, FaTaxi, FaArrowRight } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { Card, Typography, Space, Badge } from 'antd';
import './PackageCard.css';

const { Title, Text } = Typography;

const PackageCard = ({ item, type = 'package' }) => {
  const isActivity = type === 'activity';
  const isCab = type === 'cab';
  const itemId = item._id || item.id || item.title;
  
  const getImageUrl = (src) => {
    if (!src) return "https://images.unsplash.com/photo-1544735745-b89b182ae4b6?auto=format&fit=crop&q=80&w=800";
    if (src.startsWith('http')) return src;
    return `${import.meta.env.VITE_API_URL.replace('/api', '')}${src}`;
  };

  return (
    <Link to={`/detail/${type}/${itemId}`} className="card-link">
      <motion.div 
        whileHover={{ y: -8 }}
        transition={{ type: 'spring', stiffness: 300 }}
      >
        <Card
          hoverable
          className="package-card-premium"
          cover={
            <div className="card-image-wrap">
              <img src={getImageUrl(item.thumbSrc || item.src)} alt={item.title} />
              <div className="card-badges">
                {(item.nights || item.days) ? (
                  <Badge 
                    count={
                      <span className="badge duration">
                        <FaClock /> {item.nights ? `${item.nights}N/` : ''}{item.days}D
                      </span>
                    } 
                  />
                ) : isCab && (
                  <Badge 
                    count={
                      <span className="badge duration">
                        <FaTaxi /> {item.type || 'Standard'}
                      </span>
                    } 
                  />
                )}
              </div>
            </div>
          }
        >
          <div className="card-body">
            <Title level={4} className="card-title">{item.title}</Title>
            
            <div className="card-price-row">
              <Space direction="vertical" size={0} className="price-info">
                <Text className="price-tag">Starting from</Text>
                <Text strong className="price-value">
                  {item.price > 0 ? `₹${item.price.toLocaleString()}` : 'On Request'}
                </Text>
              </Space>
              <div className="btn-circle-arrow">
                <FaArrowRight />
              </div>
            </div>
          </div>
        </Card>
      </motion.div>
    </Link>
  );
};

export default PackageCard;
