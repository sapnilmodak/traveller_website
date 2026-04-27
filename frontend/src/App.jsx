import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { UserAuthProvider } from './context/UserAuthContext';
import PWAInstallPrompt from './components/PWAInstallPrompt';
import FloatingWhatsApp from './components/FloatingWhatsApp';
import './index.css';

// Lazy load pages
const Home = lazy(() => import('./pages/Home'));
const AboutUs = lazy(() => import('./pages/AboutUs'));
const ContactUs = lazy(() => import('./pages/ContactUs'));
const Blog = lazy(() => import('./pages/Blog'));
const Cab = lazy(() => import('./pages/Cab'));
const Rental = lazy(() => import('./pages/Rental'));
const Packages = lazy(() => import('./pages/Packages'));
const Activities = lazy(() => import('./pages/Activities'));
const PackageDetail = lazy(() => import('./pages/PackageDetail'));
const Login = lazy(() => import('./pages/Login'));
const Profile = lazy(() => import('./pages/Profile'));

// Loading fallback component
const LoadingSpinner = () => (
  <div className="flex items-center justify-center h-screen w-full">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
  </div>
);

function App() {
  return (
    <UserAuthProvider>
      <Router>
        <Suspense fallback={<LoadingSpinner />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/contact" element={<ContactUs />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/cab" element={<Cab />} />
            <Route path="/rental" element={<Rental />} />
            <Route path="/packages" element={<Packages />} />
            <Route path="/activities" element={<Activities />} />
            <Route path="/detail/:type/:id" element={<PackageDetail />} />
            <Route path="*" element={<Home />} /> 
          </Routes>
        </Suspense>
        <PWAInstallPrompt />
        <FloatingWhatsApp />
      </Router>
    </UserAuthProvider>
  );
}

export default App;
