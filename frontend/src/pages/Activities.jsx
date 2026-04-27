import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import PackageCard from '../components/PackageCard';
import { activityService } from '../services/api';
import './ListingPage.css';

import { useLocation } from 'react-router-dom';

const Activities = () => {
  const location = useLocation();
  const [activities, setActivities] = useState([]);
  const [categories, setCategories] = useState([]);
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedDestinations, setSelectedDestinations] = useState([]);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const initialDest = queryParams.get('destination');
    if (initialDest) {
      setSelectedDestinations([initialDest]);
    }
    fetchInitialData(initialDest);
  }, []);

  const fetchInitialData = async (initialDest) => {
    try {
      setLoading(true);
      const [activitiesRes, categoriesRes, destinationsRes] = await Promise.all([
        activityService.getAll(initialDest ? { destination: initialDest } : {}),
        activityService.getCategories(),
        activityService.getDestinations()
      ]);
      setActivities(activitiesRes.data);
      setCategories(categoriesRes.data);
      setDestinations(destinationsRes.data);
    } catch (error) {
      console.error('Error fetching activity data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = async (cat, dest) => {
    let updatedCats = [...selectedCategories];
    if (cat) {
      if (updatedCats.includes(cat)) {
        updatedCats = updatedCats.filter(c => c !== cat);
      } else {
        updatedCats.push(cat);
      }
      setSelectedCategories(updatedCats);
    }

    let updatedDests = [...selectedDestinations];
    if (dest) {
      if (updatedDests.includes(dest)) {
        updatedDests = updatedDests.filter(d => d !== dest);
      } else {
        updatedDests.push(dest);
      }
      setSelectedDestinations(updatedDests);
    }
    
    // Fetch filtered data
    try {
      setLoading(true);
      const { data } = await activityService.getAll({ 
        category: updatedCats.length > 0 ? updatedCats.join(',') : undefined,
        destination: updatedDests.length > 0 ? updatedDests.join(',') : undefined
      });
      setActivities(data);
    } catch (error) {
      console.error('Error filtering activities:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="listing-page">
      <Navbar />
      <div className="page-header">
        <div className="container">
          <h1>Activities</h1>
          <p>Adventure and Fun in the Heart of Himalayas</p>
        </div>
      </div>

      <section className="listing-section section-padding">
        <div className="container">
          <div className="listing-grid">
            <aside className="sidebar">
              <div className="filter-widget">
                <h3>Activity Category</h3>
                {categories.length > 0 ? (
                  categories.map(cat => (
                    <label key={cat}>
                      <input 
                        type="checkbox" 
                        checked={selectedCategories.includes(cat)}
                        onChange={() => handleFilterChange(cat, null)}
                      /> {cat}
                    </label>
                  ))
                ) : (
                  <p className="no-filters">No categories found</p>
                )}
              </div>

              <div className="filter-widget">
                <h3>Destination</h3>
                {destinations.length > 0 ? (
                  destinations.map(dest => (
                    <label key={dest}>
                      <input 
                        type="checkbox" 
                        checked={selectedDestinations.includes(dest)}
                        onChange={() => handleFilterChange(null, dest)}
                      /> {dest}
                    </label>
                  ))
                ) : (
                  <p className="no-filters">No destinations found</p>
                )}
              </div>
            </aside>

            <main className="main-content">
              {loading ? (
                <div className="loading">Loading activities...</div>
              ) : (
                <div className="items-grid">
                  {activities.length > 0 ? (
                    activities.map((activity) => (
                      <PackageCard key={activity._id} item={activity} type="activity" />
                    ))
                  ) : (
                    <p>No activities found.</p>
                  )}
                </div>
              )}
            </main>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Activities;
