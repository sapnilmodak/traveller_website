import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { TEAMS } from '../data/mockData';
import './Team.css';

const Team = () => {
  // Adding more team members for the full page
  const extendedTeams = [
    ...TEAMS,
    {
      title: "Soman Wangail",
      sub_title: "Reservation Manager",
      designation: "Reservation Manager",
      teamSrc: "https://www.overlandescape.com/storage/teammanagements/5caefcb07ed5f151_karma-lobsang12.jpg"
    },
    {
      title: "Tsewang Namgyal",
      sub_title: "Ticketing Executive",
      designation: "Ticketing Executive",
      teamSrc: "https://www.overlandescape.com/storage/teammanagements/5caf0592f09ed158_urgain-dolker12.jpg"
    }
  ];

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
            {extendedTeams.map((member, index) => (
              <div key={index} className="team-card">
                <div className="team-image">
                  <img src={member.teamSrc} alt={member.title} />
                </div>
                <div className="team-info">
                  <h3>{member.title}</h3>
                  <p className="designation">{member.designation}</p>
                  <p className="sub-title">{member.sub_title}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Team;
