import React from "react";
import ReactDOM from "react-dom/client";
import { ClerkProvider } from "@clerk/clerk-react";
import { ConfigProvider } from 'antd';
import App from "./App";
import "./index.css";
import { registerSW } from 'virtual:pwa-register';

// Explicitly register service worker
registerSW({ immediate: true });

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;
const isClerkValid = PUBLISHABLE_KEY && PUBLISHABLE_KEY.startsWith('pk_');

ReactDOM.createRoot(document.getElementById("app")).render(
  <React.StrictMode>
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#87CEEB', // Matching the primary color from CSS
          borderRadius: 12,
          fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
        },
      }}
    >
      {isClerkValid ? (
        <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
          <App />
        </ClerkProvider>
      ) : (
        <App />
      )}
    </ConfigProvider>
  </React.StrictMode>
);