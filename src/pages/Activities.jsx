import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import PackageCard from '../components/PackageCard';
import { SHORT_ACTIVITIES } from '../data/mockData';
import './ListingPage.css';

const Activities = () => {
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
                <label><input type="checkbox" /> Trekking</label>
                <label><input type="checkbox" /> River Rafting</label>
                <label><input type="checkbox" /> Sightseeing</label>
                <label><input type="checkbox" /> Biking</label>
              </div>
            </aside>

            <main className="main-content">
              <div className="items-grid">
                {SHORT_ACTIVITIES.map((activity, index) => (
                  <PackageCard key={index} item={activity} type="activity" />
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

export default Activities;
