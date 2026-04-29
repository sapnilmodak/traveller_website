import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  FaChartPie, FaSuitcase, FaBiking, FaCar, FaMotorcycle, 
  FaHotel, FaEdit, FaUsers, FaQuestionCircle, FaEnvelope,
  FaSignOutAlt, FaTools
} from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';
import logo from '../assets/logo.png';
import './Sidebar.css';

const Sidebar = () => {
  const { logout } = useAuth();

  const menuItems = [
    { path: '/dashboard', name: 'Dashboard', icon: <FaChartPie /> },
    { path: '/packages', name: 'Packages', icon: <FaSuitcase /> },
    { path: '/activities', name: 'Activities', icon: <FaBiking /> },
    { path: '/cabs', name: 'Cabs', icon: <FaCar /> },
    { path: '/rentals', name: 'Bike Rentals', icon: <FaMotorcycle /> },
    { path: '/accessories', name: 'Equipment Rentals', icon: <FaTools /> },
    { path: '/blogs', name: 'Blogs', icon: <FaEdit /> },
    { path: '/team', name: 'Team', icon: <FaUsers /> },
    { path: '/enquiries', name: 'Enquiries', icon: <FaQuestionCircle /> },
    { path: '/messages', name: 'Messages', icon: <FaEnvelope /> },
  ];

  return (
    <aside className="admin-sidebar">
      <div className="sidebar-brand">
        <img src={logo} alt="Logo" />
        <span>Admin Panel</span>
      </div>

      <nav className="sidebar-nav">
        {menuItems.map((item) => (
          <NavLink 
            key={item.path} 
            to={item.path} 
            className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}
          >
            <span className="icon">{item.icon}</span>
            <span className="name">{item.name}</span>
          </NavLink>
        ))}
      </nav>

      <div className="sidebar-footer">
        <button onClick={logout} className="logout-btn">
          <FaSignOutAlt /> <span>Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
