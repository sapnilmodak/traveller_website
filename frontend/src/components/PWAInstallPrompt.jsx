import React, { useState, useEffect } from 'react';
import { IoDownloadOutline, IoClose } from 'react-icons/io5';
import logo from '../assets/logo.png';

const PWAInstallPrompt = () => {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showPrompt, setShowPrompt] = useState(false);

  const [showGuidance, setShowGuidance] = useState(false);

  useEffect(() => {
    const handler = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setTimeout(() => setShowPrompt(true), 3000);
    };

    if (window.matchMedia('(display-mode: standalone)').matches) {
      return;
    }

    window.addEventListener('beforeinstallprompt', handler);

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
      setShowGuidance(true);
      return;
    }
    
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    setDeferredPrompt(null);
    setShowPrompt(false);
  };

  if (!showPrompt) return null;

  return (
    <>
      {/* Guidance Modal */}
      {showGuidance && (
        <div 
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(15, 23, 42, 0.8)',
            backdropFilter: 'blur(8px)',
            zIndex: 11000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px'
          }}
          onClick={() => setShowGuidance(false)}
        >
          <div 
            style={{
              background: 'white',
              borderRadius: '24px',
              padding: '30px',
              maxWidth: '400px',
              width: '100%',
              textAlign: 'center',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
              position: 'relative',
              animation: 'popIn 0.3s cubic-bezier(0.34, 1.56, 0.64, 1) forwards'
            }}
            onClick={e => e.stopPropagation()}
          >
            <button 
              onClick={() => setShowGuidance(false)}
              style={{
                position: 'absolute',
                top: '20px',
                right: '20px',
                background: '#f1f5f9',
                border: 'none',
                borderRadius: '50%',
                width: '32px',
                height: '32px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                color: '#64748b'
              }}
            >
              <IoClose size={20} />
            </button>

            <div style={{
              width: '80px',
              height: '80px',
              background: 'rgba(135, 206, 235, 0.1)',
              borderRadius: '24px',
              margin: '0 auto 20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#87CEEB'
            }}>
              <IoDownloadOutline size={40} />
            </div>

            <h2 style={{ fontSize: '22px', fontWeight: 800, color: '#0f172a', marginBottom: '12px' }}>
              Almost There!
            </h2>
            <p style={{ fontSize: '15px', color: '#64748b', lineHeight: 1.6, marginBottom: '25px' }}>
              Your browser hasn't enabled the automatic install yet. You can still install manually:
            </p>

            <div style={{ textAlign: 'left', background: '#f8fafc', padding: '20px', borderRadius: '16px', marginBottom: '25px', gap: '12px', display: 'flex', flexDirection: 'column' }}>
              <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                <span style={{ width: '24px', height: '24px', background: '#87CEEB', color: 'white', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: 800 }}>1</span>
                <span style={{ fontSize: '14px', fontWeight: 600, color: '#334155' }}>Click the browser menu (three dots)</span>
              </div>
              <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                <span style={{ width: '24px', height: '24px', background: '#87CEEB', color: 'white', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: 800 }}>2</span>
                <span style={{ fontSize: '14px', fontWeight: 600, color: '#334155' }}>Select "Add to Home Screen"</span>
              </div>
            </div>

            <button 
              onClick={() => setShowGuidance(false)}
              style={{
                width: '100%',
                padding: '16px',
                borderRadius: '14px',
                border: 'none',
                background: '#87CEEB',
                color: 'white',
                fontWeight: 800,
                fontSize: '16px',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              Got it!
            </button>
          </div>
        </div>
      )}

      {/* Main Prompt Card */}
      <div 
        className="pwa-prompt-container"
        style={{
          position: 'fixed',
          bottom: '110px',
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
            gap: '15px',
            position: 'relative'
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
          @keyframes popIn {
            from { transform: scale(0.9); opacity: 0; }
            to { transform: scale(1); opacity: 1; }
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
    </>
  );
};

export default PWAInstallPrompt;
