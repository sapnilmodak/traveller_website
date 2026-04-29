import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { accessoryService } from '../services/api';
import './ListingPage.css';

const EquipmentRental = () => {
  const [accessories, setAccessories] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategories, setSelectedCategories] = useState([]);

  useEffect(() => {
    fetchInitialData();
  }, []);

  const fetchInitialData = async () => {
    try {
      setLoading(true);
      const [accessoriesRes, categoriesRes] = await Promise.all([
        accessoryService.getAll(),
        accessoryService.getCategories()
      ]);
      setAccessories(accessoriesRes.data);
      setCategories(categoriesRes.data);
    } catch (error) {
      console.error('Error fetching gear data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = async (category) => {
    let updatedCategories = [...selectedCategories];
    if (updatedCategories.includes(category)) {
      updatedCategories = updatedCategories.filter(c => c !== category);
    } else {
      updatedCategories.push(category);
    }
    setSelectedCategories(updatedCategories);
    
    // Fetch filtered data
    try {
      setLoading(true);
      const { data } = await accessoryService.getAll({ 
        category: updatedCategories.length > 0 ? updatedCategories.join(',') : undefined
      });
      setAccessories(data);
    } catch (error) {
      console.error('Error filtering gear:', error);
    } finally {
      setLoading(false);
    }
  };

  const getImageUrl = (url) => {
    if (!url) return 'https://via.placeholder.com/400x300?text=No+Image';
    if (url.startsWith('http')) return url;
    const apiBase = import.meta.env.VITE_API_URL ? import.meta.env.VITE_API_URL.replace(/\/api$/, '') : 'http://localhost:5000';
    return `${apiBase}${url}`;
  };

  return (
    <div className="listing-page">
      <Navbar />
      <div className="page-header" style={{ background: 'linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url("https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80") center/cover no-repeat' }}>
        <div className="container">
          <h1>Equipment Rental</h1>
          <p>Professional Gear for Your Himalayan Adventure</p>
        </div>
      </div>

      <section className="listing-section section-padding">
        <div className="container">
          <div className="listing-grid">
            <aside className="sidebar">
              <div className="filter-widget">
                <h3>Gear Category</h3>
                {categories.length > 0 ? (
                  categories.map(cat => (
                    <label key={cat}>
                      <input 
                        type="checkbox" 
                        checked={selectedCategories.includes(cat)}
                        onChange={() => handleFilterChange(cat)}
                      /> {cat}
                    </label>
                  ))
                ) : (
                  <p className="no-filters">No categories found</p>
                )}
              </div>
            </aside>

            <main className="main-content">
              {loading ? (
                <div className="loading">Loading professional gear...</div>
              ) : (
                <div className="items-grid">
                  {accessories.length > 0 ? (
                    accessories.map(item => (
                      <div key={item._id} className="item-card">
                        <div className="item-image" style={{ height: '200px' }}>
                          <img src={getImageUrl(item.thumbSrc)} alt={item.name} />
                        </div>
                        <div className="item-info">
                          <span className="badge badge-primary" style={{ fontSize: '0.7rem', padding: '2px 8px', marginBottom: '8px', display: 'inline-block' }}>
                            {item.category || 'Equipment'}
                          </span>
                          <h3>{item.name}</h3>
                          <p className="item-description" style={{ fontSize: '0.9rem', color: '#666', height: '40px', overflow: 'hidden' }}>
                            {item.description || 'Quality gear for trekking and mountaineering.'}
                          </p>
                          <div className="item-price" style={{ borderTop: '1px solid #eee', paddingTop: '15px', marginTop: '15px' }}>
                            <span className="price-label">Daily Rent:</span>
                            <span className="price-value" style={{ color: '#e67e22', fontWeight: '700', fontSize: '1.2rem' }}>
                              ₹{item.price}<span style={{ fontSize: '0.8rem', color: '#999' }}>/Day</span>
                            </span>
                          </div>
                          <button 
                            className="btn btn-primary btn-block mt-3"
                            onClick={() => window.open(`https://wa.me/919419284833?text=I%20want%20to%20rent%20${item.name}`, '_blank')}
                          >
                            Enquire Now
                          </button>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-10 w-full">
                      <p>No equipment items available for rental at the moment.</p>
                    </div>
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

export default EquipmentRental;
