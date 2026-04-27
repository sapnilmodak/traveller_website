import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import './ListingPage.css';

const Rental = () => {
  const bikes = [
    { id: 1, title: "Royal Enfield Himalayan 411", type: "Adventure", engine: "411cc", price: 1500, src: "https://images.unsplash.com/photo-1558981403-c5f91cbba527?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" },
    { id: 2, title: "Royal Enfield Classic 350", type: "Cruiser", engine: "350cc", price: 1200, src: "https://images.unsplash.com/photo-1558981403-c5f91cbba527?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" },
    { id: 3, title: "Royal Enfield Hunter 350", type: "Modern Retro", engine: "350cc", price: 1300, src: "https://images.unsplash.com/photo-1558981403-c5f91cbba527?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" },
    { id: 4, title: "KTM Adventure 390", type: "Adventure", engine: "390cc", price: 1800, src: "https://images.unsplash.com/photo-1558981403-c5f91cbba527?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" }
  ];

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
                <label><input type="checkbox" /> Adventure</label>
                <label><input type="checkbox" /> Cruiser</label>
                <label><input type="checkbox" /> Modern Retro</label>
              </div>
            </aside>

            <main className="main-content">
              <div className="items-grid">
                {bikes.map(bike => (
                  <div key={bike.id} className="item-card">
                    <div className="item-image">
                      <img src={bike.src} alt={bike.title} />
                    </div>
                    <div className="item-info">
                      <h3>{bike.title}</h3>
                      <div className="item-meta">
                        <span>Type: {bike.type}</span>
                        <span>Engine: {bike.engine}</span>
                      </div>
                      <div className="item-price">
                        <span className="price-label">Daily Rental:</span>
                        <span className="price-value">₹{bike.price.toLocaleString()}/Day</span>
                      </div>
                      <button className="btn btn-primary btn-block">Rent Now</button>
                    </div>
                  </div>
                ))}
              </div>
            </main>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Rental;
