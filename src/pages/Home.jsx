import React from 'react';
import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import AboutSection from '../components/AboutSection';
import SliderSection from '../components/SliderSection';
import WhyChooseUs from '../components/WhyChooseUs';
import Testimonials from '../components/Testimonials';
import Footer from '../components/Footer';
import { FEATURED_PACKAGES, SHORT_ACTIVITIES, HOTELS, CATEGORIES, TEAMS } from '../data/mockData';

const Home = () => {
  return (
    <div className="home-page">
      <Navbar />
      <HeroSection />
      
      <SliderSection 
        title="Explore by Theme" 
        subtitle="Tailored Experiences"
        data={CATEGORIES} 
        type="category" 
      />

      <AboutSection />

      <SliderSection 
        title="Featured Holidays" 
        subtitle="Most Popular"
        data={FEATURED_PACKAGES} 
      />

      <SliderSection 
        title="Adventure Activities" 
        subtitle="Feel the Rush"
        data={SHORT_ACTIVITIES} 
        type="activity"
      />

      <WhyChooseUs />

      <Testimonials />

      <SliderSection 
        title="Premium Stays" 
        subtitle="Handpicked Hotels"
        data={HOTELS} 
        type="hotel"
      />

      <Footer />
    </div>
  );
};

export default Home;
