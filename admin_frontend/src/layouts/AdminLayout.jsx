import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import { useAuth } from '../context/AuthContext';
import './AdminLayout.css';

const AdminLayout = () => {
  const { admin, loading } = useAuth();

  if (loading) return <div className="loading-screen">Loading...</div>;

  if (!admin) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="admin-layout">
      <Sidebar />
      <main className="admin-main">
        <header className="admin-header">
          <div className="header-left">
            <h2>Welcome, {admin.email || 'Admin'}</h2>
          </div>
          <div className="header-right">
            <div className="admin-profile">
              <div className="avatar">A</div>
              <span>Administrator</span>
            </div>
          </div>
        </header>
        <div className="admin-content">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
