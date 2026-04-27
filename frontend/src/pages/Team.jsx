import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { teamService } from '../services/api';
import './Team.css';

const Team = () => {
  const [teamMembers, setTeamMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const { data } = await teamService.getAll();
        setTeamMembers(data);
      } catch (error) {
        console.error('Error fetching team:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTeams();
  }, []);

  return (
    <div className="team-page">
      <Navbar />
      <div className="page-header">
        <div className="container">
          <h1>Our Team</h1>
          <p>The People Behind Miracle Ladakh Adventure</p>
        </div>
      </div>

      <section className="team-intro section-padding">
        <div className="container">
          <div className="text-center mb-6">
            <h2>Meet Our Professionals</h2>
            <p className="max-w-800">Our team consists of dedicated individuals who are passionate about travel and committed to providing the best service to our guests.</p>
          </div>
          
          <div className="team-full-grid">
            {loading ? (
              <div className="loading">Loading team...</div>
            ) : (
              teamMembers.length > 0 ? (
                teamMembers.map((member, index) => (
                  <div key={member._id || index} className="team-card">
                    <div className="team-image">
                      <img src={member.teamSrc} alt={member.title} />
                    </div>
                    <div className="team-info">
                      <h3>{member.title}</h3>
                      <p className="designation">{member.designation}</p>
                      <p className="sub-title">{member.sub_title}</p>
                    </div>
                  </div>
                ))
              ) : (
                <p>No team members found.</p>
              )
            )}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Team;
