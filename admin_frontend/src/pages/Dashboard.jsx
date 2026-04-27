import React, { useState, useEffect } from 'react';
import { 
  FaSuitcase, FaBiking, FaQuestionCircle, FaEnvelope,
  FaArrowUp, FaArrowDown
} from 'react-icons/fa';
import { getStats } from '../services/api';
import './Dashboard.css';

const Dashboard = () => {
  const [stats, setStats] = useState({
    packages: 0,
    activities: 0,
    enquiries: 0,
    messages: 0,
    recentEnquiries: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { data } = await getStats();
        setStats(prev => ({ ...prev, ...data }));
      } catch (error) {
        console.error('Error fetching stats:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  const statCards = [
    { title: 'Total Packages', value: stats.packages, icon: <FaSuitcase />, color: '#3b82f6' },
    { title: 'Activities', value: stats.activities, icon: <FaBiking />, color: '#10b981' },
    { title: 'New Enquiries', value: stats.enquiries, icon: <FaQuestionCircle />, color: '#f59e0b' },
    { title: 'Messages', value: stats.messages, icon: <FaEnvelope />, color: '#ef4444' },
  ];

  if (loading) return <div className="loading">Loading stats...</div>;

  return (
    <div className="dashboard-page fade-in">
      <div className="stats-grid">
        {statCards.map((card, index) => (
          <div key={index} className="stat-card card">
            <div className="stat-icon" style={{ backgroundColor: `${card.color}15`, color: card.color }}>
              {card.icon}
            </div>
            <div className="stat-details">
              <h3>{card.title}</h3>
              <p className="stat-value">{card.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="dashboard-grid">
        <div className="recent-activity card">
          <div className="card-header">
            <h3>Recent Enquiries</h3>
            <button className="btn btn-outline btn-sm">View All</button>
          </div>
          <div className="activity-list">
            {stats.recentEnquiries?.length > 0 ? (
              stats.recentEnquiries.map((enq, index) => (
                <div key={index} className="activity-item">
                  <div className="activity-info">
                    <h4>{enq.name}</h4>
                    <p>Inquiry for: {enq.destination}</p>
                  </div>
                  <div className="activity-meta">
                    <span className="date">{new Date(enq.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>
              ))
            ) : (
              <p className="empty-state">No recent enquiries found.</p>
            )}
          </div>
        </div>

        <div className="quick-actions card">
          <div className="card-header">
            <h3>Quick Actions</h3>
          </div>
          <div className="actions-grid">
            <button className="action-btn">Add New Package</button>
            <button className="action-btn">Post New Blog</button>
            <button className="action-btn">Update Fleet</button>
            <button className="action-btn">Manage Team</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
