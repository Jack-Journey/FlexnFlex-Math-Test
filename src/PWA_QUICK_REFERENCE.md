# PWA Quick Reference Card

## 🔧 Update Service Worker Version

**File:** `/public/service-worker.js`
```javascript
const VERSION = 'v1.0.1'; // ← Change this
```

## 📦 Cache Names

| Cache | Purpose | Max Items | Expiration |
|-------|---------|-----------|------------|
| `precache-v1.0.0` | App shell | Unlimited | Never |
| `runtime-v1.0.0` | Dynamic content | 50 | Never |
| `images-v1.0.0` | Images | 60 | 90 days |
| `api-v1.0.0` | API responses | 30 | 30 days |

## 🎯 Caching Strategies

### Cache-First (Static Assets)
```javascript
// JS, CSS, Fonts, Images
1. Check cache
2. If hit → return cached
3. If miss → fetch from network
4. Cache response
```

### Network-First (API, HTML)
```javascript
// API calls, HTML pages
1. Try network first
2. If success → cache and return
3. If fail → return cached (if available)
4. If no cache → show offline page
```

## 📁 File Structure

```
/public/
├── service-worker.js      # Main SW logic
├── register-sw.js         # Registration
├── offline.html           # Offline fallback
├── manifest.json          # PWA manifest
├── icon-192.png          # App icon
└── icon-512.png          # App icon (large)

/components/pwa/
├── OfflineIndicator.tsx   # Online/offline banner
├── UpdateNotification.tsx # Update prompt
└── SyncStatus.tsx        # Sync status badge

/lib/
└── offlineSync.ts        # IndexedDB & sync logic
```

## 🔄 Background Sync

### Queue a Score
```typescript
import { queueScore } from './lib/offlineSync';

await queueScore({
  character: 'flo',
  score: 18,
  totalQuestions: 20,
  operation: 'addition',
  range: '1-10'
});
```

### Listen for Sync Events
```typescript
import { listenForSyncEvents } from './lib/offlineSync';

listenForSyncEvents((score) => {
  console.log('Score synced:', score);
});
```

## 🎨 React Components

### Add to App
```tsx
import OfflineIndicator from './components/pwa/OfflineIndicator';
import UpdateNotification from './components/pwa/UpdateNotification';
import SyncStatus from './components/pwa/SyncStatus';

<App>
  <OfflineIndicator />
  <UpdateNotification />
  <SyncStatus />
  {/* Your content */}
</App>
```

## 🐛 Debug Commands

### Chrome DevTools Console
```javascript
// Check service worker status
navigator.serviceWorker.getRegistration()

// Get all caches
caches.keys()

// Check cache contents
caches.open('flo-flex-math-precache-v1.0.0')
  .then(cache => cache.keys())

// Unregister service worker
navigator.serviceWorker.getRegistration()
  .then(reg => reg.unregister())

// Force update
navigator.serviceWorker.getRegistration()
  .then(reg => reg.update())
```

### IndexedDB Check
```javascript
// DevTools → Application → IndexedDB → FloFlexMathDB

// Or programmatically:
const db = await indexedDB.open('FloFlexMathDB', 1);
const tx = db.transaction(['queuedScores'], 'readonly');
const store = tx.objectStore('queuedScores');
const all = await store.getAll();
console.log(all);
```

## 📊 Lighthouse Checklist

Run: DevTools → Lighthouse → Generate Report

**Target Scores:**
- Performance: 90+
- PWA: 90+
- Best Practices: 90+
- Accessibility: 90+

**PWA Criteria:**
- ✅ Fast page load
- ✅ Works offline
- ✅ Installable
- ✅ Uses HTTPS
- ✅ Responsive
- ✅ Valid manifest
- ✅ Service worker

## 🚀 Deployment Checklist

- [ ] Icons generated (`icon-192.png`, `icon-512.png`)
- [ ] Version updated in service-worker.js
- [ ] Build successful (`npm run build`)
- [ ] `netlify.toml` configured
- [ ] Deployed to Netlify
- [ ] HTTPS working
- [ ] Service worker registered
- [ ] Manifest loads
- [ ] App installs on mobile
- [ ] Offline works
- [ ] Updates notify users

## 🔑 Key Files to Edit

### Add New Route to Precache
```javascript
// /public/service-worker.js
const PRECACHE_URLS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/offline.html',
  '/new-route.html', // ← Add here
];
```

### Change Cache Sizes
```javascript
// /public/service-worker.js
const MAX_RUNTIME_CACHE_SIZE = 100; // ← Change
const MAX_IMAGES_CACHE_SIZE = 200;  // ← Change
const MAX_API_CACHE_SIZE = 50;      // ← Change
```

### Change Expiration Times
```javascript
// /public/service-worker.js
const API_CACHE_EXPIRATION = 60 * 24 * 60 * 60; // ← 60 days
const IMAGE_CACHE_EXPIRATION = 180 * 24 * 60 * 60; // ← 180 days
```

## 📱 Test Offline Mode

### Desktop
1. DevTools (F12) → Network
2. Select "Offline" from throttling dropdown
3. Refresh page

### Mobile (Chrome)
1. Settings → More tools → Developer options
2. Enable "WebView debugging"
3. Chrome → Inspect → Network → Offline

### Real Device
1. Install PWA
2. Enable Airplane Mode
3. Open app from home screen

## 🔔 Events to Listen

```javascript
// Online/Offline
window.addEventListener('online', () => {});
window.addEventListener('offline', () => {});

// Service Worker Update
window.addEventListener('swUpdateAvailable', (e) => {
  const { registration, newWorker } = e.detail;
});

// Score Synced
navigator.serviceWorker.addEventListener('message', (e) => {
  if (e.data.type === 'SCORE_SYNCED') {
    console.log(e.data.score);
  }
});
```

## ⚡ Performance Tips

1. **Minimize precache** - Only critical files
2. **Lazy load** - Non-critical assets on demand
3. **Compress assets** - Use build tools
4. **Optimize images** - WebP format, proper sizing
5. **Code splitting** - Split bundles by route
6. **Cache headers** - Set appropriate max-age
7. **CDN** - Serve static assets from CDN

## 🎯 Common Tasks

### Force Users to Update
```javascript
// Auto-update without user consent
self.addEventListener('install', (event) => {
  self.skipWaiting(); // ← Force immediate activation
});
```

### Clear All Caches
```javascript
// /public/service-worker.js activate event
caches.keys().then(names => {
  return Promise.all(names.map(name => caches.delete(name)));
});
```

### Add API Endpoint to Cache
```javascript
// /public/service-worker.js fetch event
if (url.pathname.startsWith('/api/scores')) {
  event.respondWith(
    networkFirstWithCache(request, API_CACHE_NAME, API_CACHE_EXPIRATION)
  );
}
```

## 📖 Resources

- [MDN Service Workers](https://mdn.io/service-worker)
- [Web.dev PWA](https://web.dev/pwa)
- [Can I Use](https://caniuse.com/?search=service%20worker)
- [PWA Builder](https://www.pwabuilder.com)

## 🆘 Emergency Fixes

### Service Worker Stuck
```javascript
// Unregister all service workers
navigator.serviceWorker.getRegistrations().then(registrations => {
  registrations.forEach(reg => reg.unregister());
});
```

### Clear Everything
```javascript
// Clear caches
caches.keys().then(names => {
  names.forEach(name => caches.delete(name));
});

// Clear IndexedDB
indexedDB.deleteDatabase('FloFlexMathDB');

// Unregister SW
navigator.serviceWorker.getRegistrations().then(regs => {
  regs.forEach(reg => reg.unregister());
});

// Hard refresh
location.reload(true);
```

---

**Last Updated:** v1.0.0
