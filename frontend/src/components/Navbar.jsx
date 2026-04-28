import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaUserCircle, FaChevronDown, FaSignOutAlt, FaBars } from 'react-icons/fa';
import { useUserAuth } from '../context/UserAuthContext';
import { SignedIn, SignedOut, UserButton } from "@clerk/clerk-react";
import { Drawer, Grid, Button } from 'antd';
import logo from '../assets/logo.png';
import './Navbar.css';

const { useBreakpoint } = Grid;

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, logout } = useUserAuth();
  const screens = useBreakpoint();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = [
    { label: 'Packages', path: '/packages' },
    { label: 'Activities', path: '/activities' },
    { label: 'Cab', path: '/cab' },
    { label: 'Rental', path: '/rental' },
  ];

  const companyItems = [
    { label: 'About Us', path: '/about' },
    { label: 'Travel Blog', path: '/blog' },
    { label: 'Contact Us', path: '/contact' },
  ];

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
            {screens.lg && (
              <ul className="main-menu">
                {menuItems.map(item => (
                  <li key={item.path}><Link to={item.path}>{item.label}</Link></li>
                ))}
                <li className="has-dropdown">
                  <Link to="#">Company <FaChevronDown className="chevron" /></Link>
                  <ul className="dropdown">
                    {companyItems.map(item => (
                      <li key={item.path}><Link to={item.path}>{item.label}</Link></li>
                    ))}
                  </ul>
                </li>
              </ul>
            )}

            <div className="user-nav">
              <SignedIn>
                <UserButton afterSignOutUrl="/" />
              </SignedIn>

              <SignedOut>
                {user ? (
                  <div className="manual-user-dropdown has-dropdown">
                    <div className="user-profile-trigger">
                      <FaUserCircle />
                      <span>{user.name?.split(' ')[0]}</span>
                    </div>
                    <ul className="dropdown">
                      <li><Link to="/profile">My Profile</Link></li>
                      <li><button onClick={logout} className="logout-btn"><FaSignOutAlt /> Logout</button></li>
                    </ul>
                  </div>
                ) : (
                  <Link to="/login" className="btn btn-primary btn-account">
                    <FaUserCircle /> Account
                  </Link>
                )}
              </SignedOut>

              {!screens.lg && (
                <Button 
                  type="text" 
                  className="mobile-toggle" 
                  icon={<FaBars />} 
                  onClick={() => setIsMobileMenuOpen(true)}
                  style={{ color: isScrolled ? 'var(--text-dark)' : 'white' }}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      <Drawer
        title="Menu"
        placement="right"
        onClose={() => setIsMobileMenuOpen(false)}
        open={isMobileMenuOpen}
        width={280}
      >
        <div className="mobile-menu-content">
          <ul className="mobile-menu-list">
            {menuItems.map(item => (
              <li key={item.path}>
                <Link to={item.path} onClick={() => setIsMobileMenuOpen(false)}>{item.label}</Link>
              </li>
            ))}
            <li className="mobile-menu-divider">Company</li>
            {companyItems.map(item => (
              <li key={item.path}>
                <Link to={item.path} onClick={() => setIsMobileMenuOpen(false)}>{item.label}</Link>
              </li>
            ))}
          </ul>
        </div>
      </Drawer>
    </nav>
  );
};

export default Navbar;
