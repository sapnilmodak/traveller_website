import React from 'react';
import { FaAward, FaUsers, FaSmile, FaSuitcase, FaShieldAlt, FaLeaf } from 'react-icons/fa';
import { motion } from 'framer-motion';
import './WhyChooseUs.css';

const WhyChooseUs = () => {
  const features = [
    { icon: <FaAward />, title: "Certified Excellence", desc: "Award-winning travel services since 2000." },
    { icon: <FaShieldAlt />, title: "Safety First", desc: "Expert guides and top-notch safety equipment." },
    { icon: <FaLeaf />, title: "Eco-Friendly", desc: "Adventure with care for the local environment." },
    { icon: <FaUsers />, title: "Local Experts", desc: "A team that knows every corner of Ladakh." }
  ];

  return (
    <section className="why-choose-us section-padding bg-white">
      <div className="container">
        <div className="text-center mb-6">
          <span className="section-subtitle">Why Miracle Ladakh</span>
          <h2 className="section-title">Beyond Ordinary Travel</h2>
        </div>
        
        <div className="features-grid-premium">
          {features.map((feature, index) => (
            <motion.div 
              key={index} 
              className="feature-card-modern"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="feature-icon-wrap">{feature.icon}</div>
              <h3>{feature.title}</h3>
              <p>{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
