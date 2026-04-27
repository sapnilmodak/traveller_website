import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { rentalService } from '../services/api';
import './ListingPage.css';

const Rental = () => {
  const [rentals, setRentals] = useState([]);
  const [types, setTypes] = useState([]);
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [selectedDestinations, setSelectedDestinations] = useState([]);

  useEffect(() => {
    fetchInitialData();
  }, []);

  const fetchInitialData = async () => {
    try {
      setLoading(true);
      const [rentalsRes, typesRes, destinationsRes] = await Promise.all([
        rentalService.getAll(),
        rentalService.getTypes(),
        rentalService.getDestinations()
      ]);
      setRentals(rentalsRes.data);
      setTypes(typesRes.data);
      setDestinations(destinationsRes.data);
    } catch (error) {
      console.error('Error fetching rental data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = async (type, dest) => {
    let updatedTypes = [...selectedTypes];
    if (type) {
      if (updatedTypes.includes(type)) {
        updatedTypes = updatedTypes.filter(t => t !== type);
      } else {
        updatedTypes.push(type);
      }
      setSelectedTypes(updatedTypes);
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
      const { data } = await rentalService.getAll({ 
        type: updatedTypes.length > 0 ? updatedTypes.join(',') : undefined,
        destination: updatedDests.length > 0 ? updatedDests.join(',') : undefined
      });
      setRentals(data);
    } catch (error) {
      console.error('Error filtering rentals:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="listing-page">
      <Navbar />
      <div className="page-header">
        <div className="container">
          <h1>Motorbike Rental</h1>
          <p>Ride Across the Himalayas with Ease</p>
        </div>
      </div>

      <section className="listing-section section-padding">
        <div className="container">
          <div className="listing-grid">
            <aside className="sidebar">
              <div className="filter-widget">
                <h3>Bike Type</h3>
                {types.length > 0 ? (
                  types.map(type => (
                    <label key={type}>
                      <input 
                        type="checkbox" 
                        checked={selectedTypes.includes(type)}
                        onChange={() => handleFilterChange(type, null)}
                      /> {type}
                    </label>
                  ))
                ) : (
                  <p className="no-filters">No types found</p>
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
                <div className="loading">Loading bikes...</div>
              ) : (
                <div className="items-grid">
                  {rentals.length > 0 ? (
                    rentals.map(bike => (
                      <div key={bike._id} className="item-card">
                        <div className="item-image">
                          <img src={bike.thumbSrc || bike.src} alt={bike.title} />
                        </div>
                        <div className="item-info">
                          <h3>{bike.title}</h3>
                          <div className="item-meta">
                            <span>Type: {bike.type || 'Standard'}</span>
                            <span>Engine: {bike.engine}</span>
                          </div>
                          <div className="item-price">
                            <span className="price-label">Daily Rental:</span>
                            <span className="price-value">₹{(bike.price || 0).toLocaleString()}/Day</span>
                          </div>
                          <Link to={`/detail/rental/${bike._id}`} className="btn-link">
                            <button className="btn btn-primary btn-block">Rent Now</button>
                          </Link>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p>No bikes available for rental.</p>
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

export default Rental;
