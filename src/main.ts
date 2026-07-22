import './style.css';
import { App, bindAppEvents } from './App';

import { registerSW } from 'virtual:pwa-register';

// Register Service Worker for PWA
registerSW({ immediate: true });

// Render Application
document.addEventListener('DOMContentLoaded', () => {
  const appContainer = document.getElementById('app');
  if (appContainer) {
    appContainer.innerHTML = App();
    bindAppEvents();
  }
});
