// main.tsx — Akili console entry point. Mounts the App into #root.
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './App';
import './styles.css';

const rootEl = document.getElementById('root');
if (!rootEl) throw new Error('Akili: #root haijapatikana.');

createRoot(rootEl).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
