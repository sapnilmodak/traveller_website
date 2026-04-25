import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import AboutUs from './pages/AboutUs';
import Team from './pages/Team';
import ContactUs from './pages/ContactUs';
import Blog from './pages/Blog';
import Cab from './pages/Cab';
import Rental from './pages/Rental';
import Packages from './pages/Packages';
import Activities from './pages/Activities';
import './index.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/team" element={<Team />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/cab" element={<Cab />} />
        <Route path="/rental" element={<Rental />} />
        <Route path="/packages" element={<Packages />} />
        <Route path="/activities" element={<Activities />} />
        <Route path="*" element={<Home />} /> 
      </Routes>
    </Router>
  );
}

export default App;
