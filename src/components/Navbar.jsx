import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaPlane, FaSuitcase, FaHiking, FaHotel, FaTaxi, FaMotorcycle, FaBars, FaUserCircle, FaChevronDown } from 'react-icons/fa';
import logo from '../assets/logo.png';
import './Navbar.css';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="container">
        <div className="navbar-top">
          <Link to="/" className="logo-container">
            <img src={logo} alt="Miracle Ladakh Adventure" className="logo-img" />
            <div className="logo-text">
              <span className="brand-name">Miracle Ladakh</span>
              <span className="brand-sub">Adventure</span>
            </div>
          </Link>

          <div className="nav-actions">
            <ul className="main-menu">
              <li><Link to="/packages">Packages</Link></li>
              <li><Link to="/activities">Activities</Link></li>
              <li><Link to="/cab">Cab</Link></li>
              <li><Link to="/rental">Rental</Link></li>
              <li className="has-dropdown">
                <Link to="#">Company <FaChevronDown className="chevron" /></Link>
                <ul className="dropdown">
                  <li><Link to="/about">About Us</Link></li>
                  <li><Link to="/team">Our Team</Link></li>
                  <li><Link to="/blog">Travel Blog</Link></li>
                  <li><Link to="/contact">Contact Us</Link></li>
                </ul>
              </li>
            </ul>

            <Link to="/login" className="btn btn-primary btn-account">
              <FaUserCircle /> Account
            </Link>

            <button className="mobile-toggle" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              <FaBars />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
