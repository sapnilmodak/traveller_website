import React, { useState, useEffect } from 'react';
import { IoDownloadOutline } from 'react-icons/io5';

const PWAInstallPrompt = () => {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showPrompt, setShowPrompt] = useState(false);

  useEffect(() => {
    const handler = (e) => {
      // Prevent Chrome 67 and earlier from automatically showing the prompt
      e.preventDefault();
      // Stash the event so it can be triggered later.
      setDeferredPrompt(e);
      // Update UI notify the user they can add to home screen
      setShowPrompt(true);
    };

    window.addEventListener('beforeinstallprompt', handler);

    return () => {
      window.removeEventListener('beforeinstallprompt', handler);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;

    // Show the prompt
    deferredPrompt.prompt();

    // Wait for the user to respond to the prompt
    const { outcome } = await deferredPrompt.userChoice;
    console.log(`User response to the install prompt: ${outcome}`);

    // We've used the prompt, and can't use it again, throw it away
    setDeferredPrompt(null);
    setShowPrompt(false);
  };

  if (!showPrompt) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 z-[9999] md:left-auto md:right-8 md:bottom-8 md:w-80">
      <div className="bg-white rounded-2xl shadow-2xl p-4 border border-blue-100 flex items-center justify-between gap-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center text-white text-2xl shadow-lg">
            <IoDownloadOutline />
          </div>
          <div>
            <h3 className="font-bold text-slate-800 text-sm">Install App</h3>
            <p className="text-slate-500 text-xs">Access traveler offline</p>
          </div>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={() => setShowPrompt(false)}
            className="px-3 py-2 text-slate-400 hover:text-slate-600 transition-colors text-sm font-medium"
          >
            Later
          </button>
          <button 
            onClick={handleInstallClick}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-all shadow-md active:scale-95 text-sm font-bold"
          >
            Install
          </button>
        </div>
      </div>
    </div>
  );
};

export default PWAInstallPrompt;
