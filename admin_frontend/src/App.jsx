import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import AdminLayout from './layouts/AdminLayout';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import ManagePackages from './pages/ManagePackages';
import ManageActivities from './pages/ManageActivities';
import ManageCabs from './pages/ManageCabs';
import ManageRentals from './pages/ManageRentals';
import ManageBlogs from './pages/ManageBlogs';
import ManageTeam from './pages/ManageTeam';
import Enquiries from './pages/Enquiries';
import Messages from './pages/Messages';
import ManageAccessories from './pages/ManageAccessories';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          
          <Route element={<AdminLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/packages" element={<ManagePackages />} />
            <Route path="/activities" element={<ManageActivities />} />
            <Route path="/cabs" element={<ManageCabs />} />
            <Route path="/rentals" element={<ManageRentals />} />
            <Route path="/blogs" element={<ManageBlogs />} />
            <Route path="/team" element={<ManageTeam />} />
            <Route path="/enquiries" element={<Enquiries />} />
            <Route path="/messages" element={<Messages />} />
            <Route path="/accessories" element={<ManageAccessories />} />
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
          </Route>
          
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
