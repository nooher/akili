// main.tsx — Akili console entry point. Mounts the App into #root.
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './App';
import { ErrorBoundary } from './components/ErrorBoundary';
import { track } from './lib/telemetry';
import './styles.css';

const rootEl = document.getElementById('root');
if (!rootEl) throw new Error('Akili: #root haijapatikana.');

createRoot(rootEl).render(
  <StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </StrictMode>,
);

// Register the service worker for offline/installable PWA support.
// Guarded: production builds only, secure context only, never crashes dev.
if (
  import.meta.env.PROD &&
  typeof window !== 'undefined' &&
  'serviceWorker' in navigator &&
  window.isSecureContext
) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/sw.js')
      .then(() => track('sw_registered'))
      .catch(() => {
        // Registration failure must not affect the app.
        track('sw_register_failed');
      });
  });
}
