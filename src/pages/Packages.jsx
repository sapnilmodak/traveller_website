import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import PackageCard from '../components/PackageCard';
import { FEATURED_PACKAGES } from '../data/mockData';
import './ListingPage.css';

const Packages = () => {
  return (
    <div className="listing-page">
      <Navbar />
      <div className="page-header">
        <div className="container">
          <h1>Holiday Packages</h1>
          <p>Explore the Best of Ladakh and Beyond</p>
        </div>
      </div>

      <section className="listing-section section-padding">
        <div className="container">
          <div className="listing-grid">
            <aside className="sidebar">
              <div className="filter-widget">
                <h3>Destination</h3>
                <label><input type="checkbox" /> Ladakh</label>
                <label><input type="checkbox" /> Kashmir</label>
                <label><input type="checkbox" /> Himachal</label>
                <label><input type="checkbox" /> Sri Lanka</label>
              </div>

              <div className="filter-widget">
                <h3>Duration</h3>
                <label><input type="checkbox" /> 1-4 Days</label>
                <label><input type="checkbox" /> 5-8 Days</label>
                <label><input type="checkbox" /> 9+ Days</label>
              </div>

              <div className="filter-widget">
                <h3>Package Type</h3>
                <label><input type="checkbox" /> Group Tour</label>
                <label><input type="checkbox" /> Fixed Tour</label>
                <label><input type="checkbox" /> Open Tour</label>
              </div>
            </aside>

            <main className="main-content">
              <div className="items-grid">
                {FEATURED_PACKAGES.map(pkg => (
                  <PackageCard key={pkg.id} item={pkg} />
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

export default Packages;
