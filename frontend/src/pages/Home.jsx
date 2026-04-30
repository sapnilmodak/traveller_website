import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import AboutSection from '../components/AboutSection';
import SliderSection from '../components/SliderSection';
import WhyChooseUs from '../components/WhyChooseUs';
import Testimonials from '../components/Testimonials';
import Footer from '../components/Footer';
import { packageService, activityService, cabService, rentalService, accessoryService } from '../services/api';
import holidayImg from '../assets/themes/holiday.png';
import adventureImg from '../assets/themes/adventure.png';
import spiritualImg from '../assets/themes/spiritual.png';
import trekkingImg from '../assets/themes/trekking.png';
import motorbikeImg from '../assets/themes/motorbike.png';

const Home = () => {
  const [featuredPackages, setFeaturedPackages] = useState([]);
  const [adventureActivities, setAdventureActivities] = useState([]);
  const [featuredCabs, setFeaturedCabs] = useState([]);
  const [featuredRentals, setFeaturedRentals] = useState([]);
  const [featuredAccessories, setFeaturedAccessories] = useState([]);
  const [dynamicThemes, setDynamicThemes] = useState([]);

  useEffect(() => {
    const fetchHomeData = async () => {
      try {
        const [pkgs, acts, cabs, cats, rents, accs] = await Promise.all([
          packageService.getAll({ isFeatured: true, limit: 10 }),
          activityService.getAll({ isFeatured: true, limit: 10 }),
          cabService.getAll({ isFeatured: true, limit: 10 }),
          packageService.getCategories(),
          rentalService.getAll({ limit: 10 }),
          accessoryService.getAll({ limit: 10 })
        ]);

        setFeaturedPackages(pkgs.data);
        setAdventureActivities(acts.data);
        setFeaturedCabs(cabs.data);
        setFeaturedRentals(rents.data);
        setFeaturedAccessories(accs.data);

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

      <SliderSection 
        title="Explore on Bike Rental" 
        subtitle="Premium Bike Rental"
        data={featuredRentals} 
        type="rental"
      />

      <SliderSection 
        title="Equipment Rental" 
        subtitle="Gear Up for Your Adventure"
        data={featuredAccessories} 
        type="accessory"
      />

      <Footer />
    </div>
  );
};

export default Home;
