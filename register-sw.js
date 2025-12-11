// Service Worker Registration with Update Detection
(function() {
  'use strict';

  if (!('serviceWorker' in navigator)) {
    console.log('Service Worker not supported');
    return;
  }

  let refreshing = false;
  let registration = null;

  // Reload page when new service worker takes control
  navigator.serviceWorker.addEventListener('controllerchange', () => {
    if (refreshing) return;
    refreshing = true;
    window.location.reload();
  });

  // Register service worker
  window.addEventListener('load', async () => {
    try {
      registration = await navigator.serviceWorker.register('/service-worker.js', {
        scope: '/'
      });

      console.log('✅ Service Worker registered:', registration.scope);

      // Expose registration globally for React components
      window.swRegistration = registration;

      // Check for updates immediately
      registration.update();

      // Check for updates every hour
      setInterval(() => {
        registration.update();
      }, 60 * 60 * 1000);

      // Listen for updates
      registration.addEventListener('updatefound', () => {
        const newWorker = registration.installing;
        
        newWorker.addEventListener('statechange', () => {
          if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
            // New service worker available
            console.log('🔄 New version available!');
            showUpdateNotification(newWorker);
          }
        });
      });

    } catch (error) {
      console.error('❌ Service Worker registration failed:', error);
    }
  });

  // Show update notification to user
  function showUpdateNotification(newWorker) {
    // Dispatch custom event that React can listen to
    window.dispatchEvent(new CustomEvent('swUpdateAvailable', {
      detail: { registration, newWorker }
    }));

    // Also create a visible notification banner
    createUpdateBanner(newWorker);
  }

  // Create update notification banner
  function createUpdateBanner(newWorker) {
    // Remove existing banner if present
    const existing = document.getElementById('sw-update-banner');
    if (existing) {
      existing.remove();
    }

    // Create banner
    const banner = document.createElement('div');
    banner.id = 'sw-update-banner';
    banner.style.cssText = `
      position: fixed;
      bottom: 20px;
      left: 50%;
      transform: translateX(-50%);
      background: #1f2937;
      color: white;
      padding: 16px 24px;
      border-radius: 12px;
      box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
      z-index: 10000;
      display: flex;
      align-items: center;
      gap: 16px;
      max-width: 90%;
      animation: slideUp 0.3s ease-out;
    `;

    banner.innerHTML = `
      <style>
        @keyframes slideUp {
          from {
            transform: translateX(-50%) translateY(100px);
            opacity: 0;
          }
          to {
            transform: translateX(-50%) translateY(0);
            opacity: 1;
          }
        }
        
        #sw-update-banner button {
          background: #9333ea;
          color: white;
          border: none;
          padding: 8px 20px;
          border-radius: 6px;
          font-weight: 600;
          cursor: pointer;
          font-size: 14px;
          white-space: nowrap;
          transition: background 0.2s;
        }
        
        #sw-update-banner button:hover {
          background: #7c3aed;
        }
        
        #sw-update-banner button:active {
          transform: scale(0.98);
        }
        
        #sw-update-banner .close-btn {
          background: transparent;
          padding: 4px 8px;
          margin-left: 8px;
        }
        
        #sw-update-banner .close-btn:hover {
          background: rgba(255, 255, 255, 0.1);
        }
      </style>
      <div style="flex: 1;">
        <div style="font-weight: 600; margin-bottom: 4px;">🎉 New version available!</div>
        <div style="font-size: 14px; opacity: 0.9;">Update now to get the latest features.</div>
      </div>
      <button id="sw-update-btn">Update Now</button>
      <button class="close-btn" id="sw-dismiss-btn">✕</button>
    `;

    document.body.appendChild(banner);

    // Update button click
    document.getElementById('sw-update-btn').addEventListener('click', () => {
      newWorker.postMessage({ type: 'SKIP_WAITING' });
      banner.remove();
      
      // Show loading indicator
      showUpdateProgress();
    });

    // Dismiss button click
    document.getElementById('sw-dismiss-btn').addEventListener('click', () => {
      banner.remove();
    });
  }

  // Show update progress
  function showUpdateProgress() {
    const progress = document.createElement('div');
    progress.id = 'sw-update-progress';
    progress.style.cssText = `
      position: fixed;
      bottom: 20px;
      left: 50%;
      transform: translateX(-50%);
      background: #1f2937;
      color: white;
      padding: 16px 24px;
      border-radius: 12px;
      box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
      z-index: 10000;
      display: flex;
      align-items: center;
      gap: 12px;
    `;

    progress.innerHTML = `
      <div class="spinner" style="
        width: 20px;
        height: 20px;
        border: 3px solid rgba(255, 255, 255, 0.3);
        border-top-color: white;
        border-radius: 50%;
        animation: spin 1s linear infinite;
      "></div>
      <div>Updating app...</div>
      <style>
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      </style>
    `;

    document.body.appendChild(progress);
  }

  // Monitor online/offline status
  window.addEventListener('online', () => {
    console.log('📡 Online');
    // Trigger background sync if registered
    if (registration && registration.sync) {
      registration.sync.register('sync-game-scores').catch(err => {
        console.log('Background sync registration failed:', err);
      });
    }
    
    // Dispatch event for React components
    window.dispatchEvent(new Event('online'));
  });

  window.addEventListener('offline', () => {
    console.log('📡 Offline');
    window.dispatchEvent(new Event('offline'));
  });

})();
