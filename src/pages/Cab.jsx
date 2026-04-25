import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import './ListingPage.css';

const Cab = () => {
  const cabs = [
    { id: 1, title: "Toyota Innova Crysta", type: "SUV", capacity: "6+1", price: 3500, src: "https://www.overlandescape.com/storage/cabs/thumb/230925042742-star1.webp" },
    { id: 2, title: "Mahindra Xylo", type: "SUV", capacity: "6+1", price: 2800, src: "https://www.overlandescape.com/storage/cabs/thumb/230925042742-star1.webp" },
    { id: 3, title: "Tempo Traveler", type: "Van", capacity: "12+1", price: 5500, src: "https://www.overlandescape.com/storage/cabs/thumb/230925042742-star1.webp" },
    { id: 4, title: "Swift Dzire", type: "Sedan", capacity: "4+1", price: 2200, src: "https://www.overlandescape.com/storage/cabs/thumb/230925042742-star1.webp" }
  ];

  return (
    <div className="listing-page">
      <Navbar />
      <div className="page-header">
        <div className="container">
          <h1>Cab Services</h1>
          <p>Reliable and Comfortable Transportation in Ladakh</p>
        </div>
      </div>

      <section className="listing-section section-padding">
        <div className="container">
          <div className="listing-grid">
            <aside className="sidebar">
              <div className="filter-widget">
                <h3>Vehicle Type</h3>
                <label><input type="checkbox" /> SUV</label>
                <label><input type="checkbox" /> Sedan</label>
                <label><input type="checkbox" /> Tempo Traveler</label>
              </div>
            </aside>

            <main className="main-content">
              <div className="items-grid">
                {cabs.map(cab => (
                  <div key={cab.id} className="item-card">
                    <div className="item-image">
                      <img src="https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" alt={cab.title} />
                    </div>
                    <div className="item-info">
                      <h3>{cab.title}</h3>
                      <div className="item-meta">
                        <span>Type: {cab.type}</span>
                        <span>Capacity: {cab.capacity}</span>
                      </div>
                      <div className="item-price">
                        <span className="price-label">Starting From:</span>
                        <span className="price-value">₹{cab.price.toLocaleString()}/Day</span>
                      </div>
                      <button className="btn btn-primary btn-block">Book Now</button>
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

export default Cab;
