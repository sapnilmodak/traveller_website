import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import AboutSection from '../components/AboutSection';
import SliderSection from '../components/SliderSection';
import WhyChooseUs from '../components/WhyChooseUs';
import Testimonials from '../components/Testimonials';
import Footer from '../components/Footer';
import { packageService, activityService, cabService } from '../services/api';
import holidayImg from '../assets/themes/holiday.png';
import adventureImg from '../assets/themes/adventure.png';
import spiritualImg from '../assets/themes/spiritual.png';
import trekkingImg from '../assets/themes/trekking.png';
import motorbikeImg from '../assets/themes/motorbike.png';

const Home = () => {
  const [featuredPackages, setFeaturedPackages] = useState([]);
  const [adventureActivities, setAdventureActivities] = useState([]);
  const [featuredCabs, setFeaturedCabs] = useState([]);
  const [dynamicThemes, setDynamicThemes] = useState([]);

  useEffect(() => {
    const fetchHomeData = async () => {
      try {
        const [pkgs, acts, cabs, cats] = await Promise.all([
          packageService.getAll({ isFeatured: true, limit: 10 }),
          activityService.getAll({ isFeatured: true, limit: 10 }),
          cabService.getAll({ isFeatured: true, limit: 10 }),
          packageService.getCategories()
        ]);

        setFeaturedPackages(pkgs.data);
        setAdventureActivities(acts.data);
        setFeaturedCabs(cabs.data);

        // Map dynamic categories to visual themes
        const imageMap = {
          'Adventure': adventureImg,
          'Spiritual': spiritualImg,
          'Trekking': trekkingImg,
          'Motorbike': motorbikeImg,
          'Mountain Biking': motorbikeImg,
          'Wildlife': holidayImg, // Can update with wildlifeImg if available
          'Holiday': holidayImg
        };

        const themes = cats.data.map(cat => ({
          title: cat,
          thumbSrc: Object.keys(imageMap).find(k => cat.includes(k)) ? imageMap[Object.keys(imageMap).find(k => cat.includes(k))] : holidayImg,
          slug: cat.toLowerCase().replace(/\s+/g, '-')
        }));

        setDynamicThemes(themes);
      } catch (error) {
        console.error('Error fetching home data:', error);
      }
    };

    fetchHomeData();
  }, []);

  return (
    <div className="home-page">
      <Navbar />
      <HeroSection />
      
      <SliderSection 
        title="Explore by Theme" 
        subtitle="Tailored Experiences"
        data={dynamicThemes} 
        type="category" 
      />

      <AboutSection />

      <SliderSection 
        title="Featured Holidays" 
        subtitle="Most Popular"
        data={featuredPackages} 
      />

      <SliderSection 
        title="Adventure Activities" 
        subtitle="Feel the Rush"
        data={adventureActivities} 
        type="activity"
      />

      <WhyChooseUs />

      <Testimonials />

      <SliderSection 
        title="Premium Cab Service" 
        subtitle="Comfortable Rides"
        data={featuredCabs} 
        type="cab"
      />

      <Footer />
    </div>
  );
};

export default Home;
