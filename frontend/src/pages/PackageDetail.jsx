import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { motion } from 'framer-motion';
import { 
  FaCalendarAlt, FaUsers, FaClock, FaCheckCircle, 
  FaTimesCircle, FaMapMarkerAlt, FaPhoneAlt, FaEnvelope 
} from 'react-icons/fa';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { 
  packageService, 
  activityService, 
  cabService, 
  rentalService,
  enquiryService 
} from '../services/api';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './PackageDetail.css';

const PackageDetail = () => {
  const { type, id } = useParams();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    destination: '',
    travelDate: '',
    days: '',
    persons: '',
    comments: ''
  });
  const [activeImage, setActiveImage] = useState('');

  useEffect(() => {
    const fetchItem = async () => {
      setLoading(true);
      try {
        let response;
        if (type === 'package') {
          response = await packageService.getById(id);
        } else if (type === 'activity') {
          response = await activityService.getById(id);
        } else if (type === 'cab') {
          response = await cabService.getById(id);
        } else if (type === 'rental') {
          response = await rentalService.getById(id);
        }

        if (response && response.data) {
          setItem(response.data);
          setFormData(prev => ({ ...prev, destination: response.data.title }));
          
          // Set initial active image
          const initialImages = (response.data.images && response.data.images.length > 0) 
            ? response.data.images 
            : [response.data.thumbSrc || response.data.src];
          setActiveImage(initialImages[0]);
        }
      } catch (error) {
        console.error(`Error fetching ${type}:`, error);
      } finally {
        setLoading(false);
      }
    };

    fetchItem();
    window.scrollTo(0, 0);
  }, [type, id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validations
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9]{10}$/;

    if (!emailRegex.test(formData.email)) {
      alert('Please enter a valid email address');
      return;
    }
    if (!phoneRegex.test(formData.phone)) {
      alert('Please enter a valid 10-digit phone number');
      return;
    }

    try {
      await enquiryService.submit(formData);
      alert('Enquiry submitted successfully! We will contact you soon.');
      setFormData({
        name: '',
        phone: '',
        email: '',
        destination: item?.title || '',
        travelDate: '',
        days: '',
        persons: '',
        comments: ''
      });
    } catch (error) {
      console.error('Error submitting enquiry:', error);
      alert('Failed to submit enquiry. Please try again later.');
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <Navbar />
        <div className="loading-message">
          <h2>Loading {type} details...</h2>
        </div>
        <Footer />
      </div>
    );
  }

  if (!item) {
    return (
      <div className="loading-container">
        <Navbar />
        <div className="error-message">
          <h2>Item not found</h2>
          <Link to="/">Go back home</Link>
        </div>
        <Footer />
      </div>
    );
  }

  // Use values from item or defaults
  const description = item.description || "Experience the breathtaking beauty of this destination with our curated package. This journey takes you through iconic landmarks, hidden gems, and local cultures, ensuring an unforgettable adventure.";
  
  const highlights = item.highlights?.length > 0 ? item.highlights : [
    "Expert guided tours to major attractions",
    "Handpicked premium accommodations",
    "Private transfers and comfortable transportation",
    "Local cultural experiences and authentic cuisine",
    "Breathtaking landscapes and photo opportunities"
  ];

  const inclusions = item.inclusions?.length > 0 ? item.inclusions : [
    "All airport transfers in private vehicle",
    "Daily breakfast and dinner",
    "Taxes and service charges",
    "English-speaking professional guide",
    "Entrance fees to monuments and parks"
  ];

  const exclusions = item.exclusions?.length > 0 ? item.exclusions : [
    "International or domestic flights",
    "Lunch and snacks",
    "Personal expenses (laundry, tips, etc.)",
    "Travel insurance",
    "Anything not mentioned in inclusions"
  ];

  // Use real images from the database if available
  const displayImages = (item.images && item.images.length > 0) 
    ? item.images 
    : [item.thumbSrc || item.src];

  const getFullImageUrl = (img) => {
    if (!img) return '';
    if (img.startsWith('http')) return img;
    return `${import.meta.env.VITE_API_URL.replace(/\/api$/, '')}${img}`;
  };

  return (
    <div className="package-detail-page">
      <Navbar />
      
      {/* Main Image Banner */}
      <div className="hero-banner-container">
        <div className="main-image-display">
          <img src={getFullImageUrl(activeImage)} alt={item.title} />
          <div className="banner-overlay">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              {item.title}
            </motion.h1>
          </div>
        </div>

        {displayImages.length > 1 && (
          <div className="thumbnail-strip-container">
            <div className="container">
              <div className="thumbnail-grid">
                {displayImages.map((img, index) => (
                  <div 
                    key={index} 
                    className={`thumb-item ${activeImage === img ? 'active' : ''}`}
                    onClick={() => setActiveImage(img)}
                  >
                    <img src={getFullImageUrl(img)} alt={`Thumbnail ${index + 1}`} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="detail-content-wrapper">
        <div className="container">
          <div className="detail-grid">
            {/* Left Content */}
            <div className="main-content">
              <section className="info-summary">
                <div className="info-badge">
                  <FaClock /> {item.days || 1} Days / {item.nights || 0} Nights
                </div>
                {item.price > 0 && (
                  <div className="info-badge price-badge">
                    Starting from ₹{item.price.toLocaleString()}
                  </div>
                )}
              </section>

              <section className="overview">
                <h2>Overview</h2>
                <p>{description}</p>
              </section>

              <section className="highlights">
                <h2>Highlights</h2>
                <ul>
                  {highlights.map((h, i) => (
                    <li key={i}><FaCheckCircle className="icon" /> {h}</li>
                  ))}
                </ul>
              </section>

              <div className="in-ex-grid">
                <section className="inclusions">
                  <h3>Inclusions</h3>
                  <ul>
                    {inclusions.map((inc, i) => (
                      <li key={i}><FaCheckCircle className="icon inc" /> {inc}</li>
                    ))}
                  </ul>
                </section>
                <section className="exclusions">
                  <h3>Exclusions</h3>
                  <ul>
                    {exclusions.map((exc, i) => (
                      <li key={i}><FaTimesCircle className="icon exc" /> {exc}</li>
                    ))}
                  </ul>
                </section>
              </div>

              {item.itinerary?.length > 0 && (
                <section className="itinerary">
                  <h2>Itinerary</h2>
                  <div className="itinerary-list">
                    {item.itinerary.map((day, idx) => (
                      <div className="itinerary-item" key={idx}>
                        <div className="day-circle">Day {day.day || idx + 1}</div>
                        <div className="day-content">
                          <h4>{day.title || 'Exploration'}</h4>
                          <p>{day.description || 'Experiences the highlights of this destination.'}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              )}
            </div>

            {/* Right Sidebar - Enquiry Form */}
            <div className="sidebar">
              <div className="enquiry-card sticky-sidebar">
                <h3>Your Preference</h3>
                <p>Tell us what you are looking for</p>
                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <input 
                      type="text" 
                      name="name" 
                      placeholder="Full Name *" 
                      required 
                      value={formData.name}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <input 
                        type="tel" 
                        name="phone" 
                        placeholder="Phone Number *" 
                        required 
                        value={formData.phone}
                        onChange={handleChange}
                        maxLength="10"
                      />
                    </div>
                    <div className="form-group">
                      <input 
                        type="email" 
                        name="email" 
                        placeholder="Email Address *" 
                        required 
                        value={formData.email}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <input 
                      type="text" 
                      name="destination" 
                      placeholder="Destination" 
                      value={formData.destination}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Travel Date</label>
                      <input 
                        type="date" 
                        name="travelDate" 
                        required 
                        value={formData.travelDate}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <input 
                        type="number" 
                        name="days" 
                        placeholder="No. of Days" 
                        value={formData.days}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="form-group">
                      <input 
                        type="number" 
                        name="persons" 
                        placeholder="No. of Persons" 
                        value={formData.persons}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <textarea 
                      name="comments" 
                      placeholder="Special Requirements / Comments"
                      rows="3"
                      value={formData.comments}
                      onChange={handleChange}
                    ></textarea>
                  </div>
                  <button type="submit" className="submit-btn">Submit Enquiry</button>
                </form>
                
                <div className="quick-contact">
                  <p>Or Contact Us Directly:</p>
                  <div className="contact-item">
                    <FaPhoneAlt /> <span>+91 9419283663 / 9622135607</span>
                  </div>
                  <div className="contact-item">
                    <FaPhoneAlt /> <span>+91 7051109162</span>
                  </div>
                  <div className="contact-item">
                    <FaEnvelope /> <span>enquiry@miracleladakhadventure.com</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default PackageDetail;
