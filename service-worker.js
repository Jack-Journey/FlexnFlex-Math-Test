// Service Worker Version - Update this to trigger new SW installation
const VERSION = 'v1.0.0';
const CACHE_PREFIX = 'flo-flex-math';
const PRECACHE_NAME = `${CACHE_PREFIX}-precache-${VERSION}`;
const RUNTIME_CACHE_NAME = `${CACHE_PREFIX}-runtime-${VERSION}`;
const IMAGES_CACHE_NAME = `${CACHE_PREFIX}-images-${VERSION}`;
const API_CACHE_NAME = `${CACHE_PREFIX}-api-${VERSION}`;

// Maximum cache sizes (in items)
const MAX_RUNTIME_CACHE_SIZE = 50;
const MAX_IMAGES_CACHE_SIZE = 60;
const MAX_API_CACHE_SIZE = 30;

// Cache expiration times (in seconds)
const API_CACHE_EXPIRATION = 30 * 24 * 60 * 60; // 30 days
const IMAGE_CACHE_EXPIRATION = 90 * 24 * 60 * 60; // 90 days

// App Shell - Critical files to precache
const PRECACHE_URLS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/offline.html',
  '/icon-192.png',
  '/icon-512.png'
];

// Helper: Add timestamp to cached items for expiration
function addTimestamp(response) {
  const clonedResponse = response.clone();
  const headers = new Headers(clonedResponse.headers);
  headers.append('sw-cache-timestamp', Date.now().toString());
  
  return clonedResponse.arrayBuffer().then(buffer => {
    return new Response(buffer, {
      status: clonedResponse.status,
      statusText: clonedResponse.statusText,
      headers: headers
    });
  });
}

// Helper: Check if cached item is expired
async function isExpired(response, maxAge) {
  const timestamp = response.headers.get('sw-cache-timestamp');
  if (!timestamp) return false;
  
  const age = (Date.now() - parseInt(timestamp)) / 1000;
  return age > maxAge;
}

// Helper: Limit cache size
async function limitCacheSize(cacheName, maxItems) {
  const cache = await caches.open(cacheName);
  const keys = await cache.keys();
  
  if (keys.length > maxItems) {
    // Delete oldest entries
    const keysToDelete = keys.slice(0, keys.length - maxItems);
    await Promise.all(keysToDelete.map(key => cache.delete(key)));
  }
}

// INSTALL EVENT - Precache app shell
self.addEventListener('install', (event) => {
  console.log(`[SW ${VERSION}] Installing...`);
  
  event.waitUntil(
    caches.open(PRECACHE_NAME)
      .then((cache) => {
        console.log(`[SW ${VERSION}] Precaching app shell`);
        return cache.addAll(PRECACHE_URLS);
      })
      .then(() => {
        console.log(`[SW ${VERSION}] Installation complete`);
        // Don't skip waiting automatically - let user choose
        return self.skipWaiting();
      })
      .catch((error) => {
        console.error(`[SW ${VERSION}] Installation failed:`, error);
      })
  );
});

// ACTIVATE EVENT - Clean up old caches
self.addEventListener('activate', (event) => {
  console.log(`[SW ${VERSION}] Activating...`);
  
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            // Delete caches that don't match current version
            if (cacheName.startsWith(CACHE_PREFIX) && !cacheName.includes(VERSION)) {
              console.log(`[SW ${VERSION}] Deleting old cache:`, cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => {
        console.log(`[SW ${VERSION}] Activation complete`);
        return self.clients.claim();
      })
  );
});

// FETCH EVENT - Strategic caching based on request type
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);
  
  // Skip non-GET requests
  if (request.method !== 'GET') {
    return;
  }
  
  // Handle different request types with appropriate strategies
  
  // 1. API Requests - Network-first with cache fallback
  if (url.pathname.startsWith('/api/')) {
    event.respondWith(networkFirstWithCache(request, API_CACHE_NAME, API_CACHE_EXPIRATION));
    return;
  }
  
  // 2. Images - Cache-first with network fallback
  if (request.destination === 'image' || /\.(jpg|jpeg|png|gif|svg|webp|ico)$/i.test(url.pathname)) {
    event.respondWith(cacheFirstWithNetwork(request, IMAGES_CACHE_NAME, IMAGE_CACHE_EXPIRATION));
    return;
  }
  
  // 3. Static Assets (JS, CSS, Fonts) - Cache-first
  if (request.destination === 'script' || 
      request.destination === 'style' || 
      request.destination === 'font' ||
      /\.(js|css|woff|woff2|ttf|eot)$/i.test(url.pathname)) {
    event.respondWith(cacheFirstWithNetwork(request, PRECACHE_NAME));
    return;
  }
  
  // 4. App Shell (HTML) - Network-first with cache fallback, offline page as last resort
  if (request.destination === 'document' || url.pathname.endsWith('.html')) {
    event.respondWith(networkFirstWithOfflineFallback(request));
    return;
  }
  
  // 5. Everything else - Network-first with runtime cache
  event.respondWith(networkFirstWithCache(request, RUNTIME_CACHE_NAME));
});

// Strategy: Cache-first with network fallback
async function cacheFirstWithNetwork(request, cacheName, maxAge = null) {
  const cache = await caches.open(cacheName);
  const cached = await cache.match(request);
  
  // Check if cached response exists and is not expired
  if (cached && (!maxAge || !(await isExpired(cached, maxAge)))) {
    return cached;
  }
  
  try {
    const response = await fetch(request);
    
    if (response && response.status === 200) {
      const responseToCache = await addTimestamp(response);
      cache.put(request, responseToCache.clone());
      
      // Limit cache size
      if (cacheName === IMAGES_CACHE_NAME) {
        limitCacheSize(cacheName, MAX_IMAGES_CACHE_SIZE);
      }
      
      return responseToCache;
    }
    
    return response;
  } catch (error) {
    // Network failed, return cached version even if expired
    if (cached) {
      return cached;
    }
    
    // Return offline placeholder for images
    if (request.destination === 'image') {
      return createOfflineImageResponse();
    }
    
    throw error;
  }
}

// Strategy: Network-first with cache fallback
async function networkFirstWithCache(request, cacheName, maxAge = null) {
  const cache = await caches.open(cacheName);
  
  try {
    const response = await fetch(request);
    
    if (response && response.status === 200) {
      const responseToCache = await addTimestamp(response);
      cache.put(request, responseToCache.clone());
      
      // Limit cache size
      if (cacheName === API_CACHE_NAME) {
        limitCacheSize(cacheName, MAX_API_CACHE_SIZE);
      } else if (cacheName === RUNTIME_CACHE_NAME) {
        limitCacheSize(cacheName, MAX_RUNTIME_CACHE_SIZE);
      }
      
      return responseToCache;
    }
    
    return response;
  } catch (error) {
    const cached = await cache.match(request);
    
    // Return cached version if available and not expired
    if (cached && (!maxAge || !(await isExpired(cached, maxAge)))) {
      return cached;
    }
    
    // Return cached even if expired as last resort
    if (cached) {
      return cached;
    }
    
    throw error;
  }
}

// Strategy: Network-first for HTML with offline fallback page
async function networkFirstWithOfflineFallback(request) {
  try {
    const response = await fetch(request);
    
    if (response && response.status === 200) {
      const cache = await caches.open(PRECACHE_NAME);
      cache.put(request, response.clone());
      return response;
    }
    
    return response;
  } catch (error) {
    const cache = await caches.open(PRECACHE_NAME);
    const cached = await cache.match(request);
    
    if (cached) {
      return cached;
    }
    
    // Last resort - return offline page
    const offlinePage = await cache.match('/offline.html');
    if (offlinePage) {
      return offlinePage;
    }
    
    throw error;
  }
}

// Create SVG placeholder for failed image loads
function createOfflineImageResponse() {
  const svg = `
    <svg width="400" height="300" xmlns="http://www.w3.org/2000/svg">
      <rect width="400" height="300" fill="#f3f4f6"/>
      <text x="200" y="150" font-family="Arial" font-size="20" fill="#9ca3af" text-anchor="middle">
        Image unavailable offline
      </text>
    </svg>
  `;
  
  return new Response(svg, {
    headers: {
      'Content-Type': 'image/svg+xml',
      'Cache-Control': 'no-store'
    }
  });
}

// BACKGROUND SYNC - Queue offline actions
self.addEventListener('sync', (event) => {
  console.log(`[SW ${VERSION}] Background sync:`, event.tag);
  
  if (event.tag === 'sync-game-scores') {
    event.waitUntil(syncGameScores());
  }
});

async function syncGameScores() {
  try {
    // Get queued scores from IndexedDB
    const db = await openDatabase();
    const scores = await getQueuedScores(db);
    
    if (scores.length === 0) {
      return;
    }
    
    // Sync each score
    for (const score of scores) {
      try {
        // Send to API (would be actual endpoint in production)
        // await fetch('/api/scores', {
        //   method: 'POST',
        //   body: JSON.stringify(score)
        // });
        
        // Remove from queue after successful sync
        await removeQueuedScore(db, score.id);
        
        // Notify clients of successful sync
        self.clients.matchAll().then(clients => {
          clients.forEach(client => {
            client.postMessage({
              type: 'SCORE_SYNCED',
              score: score
            });
          });
        });
      } catch (error) {
        console.error('[SW] Failed to sync score:', error);
      }
    }
  } catch (error) {
    console.error('[SW] Background sync failed:', error);
  }
}

// IndexedDB helpers for background sync
function openDatabase() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open('FloFlexMathDB', 1);
    
    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result);
    
    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains('queuedScores')) {
        db.createObjectStore('queuedScores', { keyPath: 'id', autoIncrement: true });
      }
    };
  });
}

function getQueuedScores(db) {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(['queuedScores'], 'readonly');
    const store = transaction.objectStore('queuedScores');
    const request = store.getAll();
    
    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result);
  });
}

function removeQueuedScore(db, id) {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(['queuedScores'], 'readwrite');
    const store = transaction.objectStore('queuedScores');
    const request = store.delete(id);
    
    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve();
  });
}

// MESSAGE EVENT - Handle messages from clients
self.addEventListener('message', (event) => {
  console.log(`[SW ${VERSION}] Message received:`, event.data);
  
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
  
  if (event.data && event.data.type === 'CLIENTS_CLAIM') {
    self.clients.claim();
  }
});

console.log(`[SW ${VERSION}] Loaded`);
