import './style.css';
import { App, bindAppEvents } from './App';
import { Login, bindLoginEvents } from './components/Login';

import { registerSW } from 'virtual:pwa-register';

// Register Service Worker for PWA
registerSW({ immediate: true });

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
