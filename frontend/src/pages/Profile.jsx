import React from 'react';
import { useUserAuth } from '../context/UserAuthContext';
import { useUser } from "@clerk/clerk-react";
import './Profile.css';

const Profile = () => {
  const { user: manualUser } = useUserAuth();
  const { user: clerkUser, isLoaded } = useUser();

  const user = manualUser || (isLoaded ? {
    name: clerkUser?.fullName,
    email: clerkUser?.primaryEmailAddress?.emailAddress,
    avatar: clerkUser?.imageUrl
  } : null);

  if (!user) {
    return <div className="profile-loading">Loading profile...</div>;
  }

  return (
    <div className="profile-page fade-in">
      <div className="container">
        <div className="profile-card">
          <div className="profile-header">
            <div className="profile-avatar">
              {user.avatar ? (
                <img src={user.avatar} alt={user.name} />
              ) : (
                <div className="avatar-placeholder">{user.name?.charAt(0)}</div>
              )}
            </div>
            <h1>{user.name}</h1>
            <p className="profile-email">{user.email}</p>
          </div>

          <div className="profile-content">
            <div className="info-section">
              <h3>Account Information</h3>
              <div className="info-grid">
                <div className="info-item">
                  <label>Full Name</label>
                  <p>{user.name}</p>
                </div>
                <div className="info-item">
                  <label>Email Address</label>
                  <p>{user.email}</p>
                </div>
                <div className="info-item">
                  <label>Account Type</label>
                  <p>{manualUser ? 'Email/Password' : 'OAuth (Google)'}</p>
                </div>
              </div>
            </div>

            <div className="booking-section">
              <h3>My Bookings</h3>
              <div className="empty-state">
                <p>You haven't made any bookings yet.</p>
                <button className="btn btn-primary">Explore Packages</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
