import './style.css';
import { App, bindAppEvents } from './App';
import { Login, bindLoginEvents } from './components/Login';

import { registerSW } from 'virtual:pwa-register';

// Register Service Worker for PWA
registerSW({ immediate: true });

// Global: redirect ke login ketika session/token expired (401)
(window as any).handleSessionExpired = () => {
  localStorage.removeItem('isAuthenticated');
  localStorage.removeItem('accessToken');
  localStorage.removeItem('userData');

  const appContainer = document.getElementById('app');
  if (!appContainer) return;

  // Tampilkan notifikasi singkat sebelum redirect
  appContainer.innerHTML = `
    <div style="display:flex;align-items:center;justify-content:center;min-height:100vh;background:#1a1a1a;font-family:sans-serif;">
      <div style="text-align:center;color:white;padding:2rem;">
        <div style="font-size:3rem;margin-bottom:1rem;">🔒</div>
        <h2 style="font-size:1.25rem;font-weight:700;margin-bottom:0.5rem;">Sesi Berakhir</h2>
        <p style="color:#a1a1aa;font-size:0.875rem;">Token Anda telah kadaluarsa. Mengalihkan ke halaman login...</p>
      </div>
    </div>
  `;

  setTimeout(() => {
    appContainer.innerHTML = Login();
    bindLoginEvents(() => {
      localStorage.setItem('isAuthenticated', 'true');
      renderApp();
    });
  }, 1500);
};

// Render Application Function
const renderApp = () => {
  const appContainer = document.getElementById('app');
  if (appContainer) {
    const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
    
    if (isAuthenticated) {
      appContainer.innerHTML = App();
      bindAppEvents();
    } else {
      appContainer.innerHTML = Login();
      bindLoginEvents(() => {
        localStorage.setItem('isAuthenticated', 'true');
        renderApp();
      });
    }
  }
};

document.addEventListener('DOMContentLoaded', renderApp);
