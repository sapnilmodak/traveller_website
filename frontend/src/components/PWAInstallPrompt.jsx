import React, { useState, useEffect } from 'react';
import { IoDownloadOutline, IoClose } from 'react-icons/io5';
import logo from '../assets/logo.png';

const PWAInstallPrompt = () => {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showPrompt, setShowPrompt] = useState(false);

  useEffect(() => {
    const handler = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setTimeout(() => setShowPrompt(true), 3000);
    };

    // If already installed, don't show anything
    if (window.matchMedia('(display-mode: standalone)').matches) {
      return;
    }

    window.addEventListener('beforeinstallprompt', handler);

    // FALLBACK: If the event doesn't fire (e.g. browser is being picky), 
    // show the prompt anyway after 10 seconds to inform the user.
    const timer = setTimeout(() => {
      if (!showPrompt && !deferredPrompt) {
        setShowPrompt(true);
      }
    }, 10000);

    return () => {
      window.removeEventListener('beforeinstallprompt', handler);
      clearTimeout(timer);
    };
  }, [showPrompt, deferredPrompt]);

  const handleInstallClick = async () => {
    if (!deferredPrompt) {
      // If the browser hasn't given us the prompt yet, guide the user
      alert('To install: Please click the "Install" icon in your browser address bar (top right) or selection "Add to Home Screen" in your browser menu.');
      return;
    }
    
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    console.log(`User response to the install prompt: ${outcome}`);
    setDeferredPrompt(null);
    setShowPrompt(false);
  };

  if (!showPrompt) return null;

  return (
    <div 
      className="pwa-prompt-container"
      style={{
        position: 'fixed',
        bottom: '110px', // Above the WhatsApp button
        right: '20px',
        zIndex: 10000,
        maxWidth: '350px',
        width: 'calc(100% - 40px)',
        animation: 'slideUp 0.5s ease-out forwards'
      }}
    >
      <div 
        className="pwa-prompt-card"
        style={{
          background: 'white',
          borderRadius: '20px',
          boxShadow: '0 15px 40px rgba(0,0,0,0.15)',
          padding: '20px',
          border: '1px solid rgba(135, 206, 235, 0.2)',
          display: 'flex',
          flexDirection: 'column',
          gap: '15px'
        }}
      >
        <button 
          onClick={() => setShowPrompt(false)}
          style={{
            position: 'absolute',
            top: '10px',
            right: '10px',
            background: 'none',
            border: 'none',
            color: '#94a3b8',
            cursor: 'pointer',
            fontSize: '20px'
          }}
        >
          <IoClose />
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          <div style={{
            width: '60px',
            height: '60px',
            borderRadius: '15px',
            overflow: 'hidden',
            flexShrink: 0,
            background: '#f8fafc',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <img src={logo} alt="App Logo" style={{ width: '80%', height: 'auto' }} />
          </div>
          <div>
            <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 800, color: '#1e293b' }}>
              Miracle Ladakh Adventure
            </h3>
            <p style={{ margin: 0, fontSize: '13px', color: '#64748b' }}>
              Install our app for a faster experience & offline access.
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <button 
            onClick={() => setShowPrompt(false)}
            style={{
              flex: 1,
              padding: '12px',
              borderRadius: '12px',
              border: '1px solid #e2e8f0',
              background: 'white',
              color: '#64748b',
              fontWeight: 700,
              cursor: 'pointer',
              fontSize: '14px'
            }}
          >
            Later
          </button>
          <button 
            onClick={handleInstallClick}
            style={{
              flex: 2,
              padding: '12px',
              borderRadius: '12px',
              border: 'none',
              background: '#87CEEB',
              color: 'white',
              fontWeight: 800,
              cursor: 'pointer',
              fontSize: '14px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              boxShadow: '0 4px 12px rgba(135, 206, 235, 0.3)'
            }}
          >
            <IoDownloadOutline fontSize="18px" />
            Install Now
          </button>
        </div>
      </div>
      <style>{`
        @keyframes slideUp {
          from { transform: translateY(100px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        @media (max-width: 480px) {
          .pwa-prompt-container {
            bottom: 90px !important;
            right: 15px !important;
            width: calc(100% - 30px) !important;
          }
        }
      `}</style>
    </div>
  );
};

export default PWAInstallPrompt;
