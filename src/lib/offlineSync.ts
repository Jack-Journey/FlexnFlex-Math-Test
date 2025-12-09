// Offline Sync - Background sync for game scores and user data

interface QueuedScore {
  id?: number;
  character: string;
  score: number;
  totalQuestions: number;
  operation: string;
  range: string;
  timestamp: number;
}

const DB_NAME = 'FloFlexMathDB';
const DB_VERSION = 1;
const STORE_NAME = 'queuedScores';

// Open IndexedDB
function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result);

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      
      // Create object store if it doesn't exist
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        const store = db.createObjectStore(STORE_NAME, {
          keyPath: 'id',
          autoIncrement: true
        });
        
        // Create indexes
        store.createIndex('timestamp', 'timestamp', { unique: false });
      }
    };
  });
}

// Queue a score for syncing when online
export async function queueScore(scoreData: Omit<QueuedScore, 'id' | 'timestamp'>): Promise<void> {
  try {
    const db = await openDB();
    const transaction = db.transaction([STORE_NAME], 'readwrite');
    const store = transaction.objectStore(STORE_NAME);

    const score: Omit<QueuedScore, 'id'> = {
      ...scoreData,
      timestamp: Date.now()
    };

    await new Promise<void>((resolve, reject) => {
      const request = store.add(score);
      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });

    console.log('✅ Score queued for sync:', score);

    // Try to trigger background sync
    if ('serviceWorker' in navigator && 'sync' in (navigator as any).serviceWorker) {
      const registration = await navigator.serviceWorker.ready;
      await (registration as any).sync.register('sync-game-scores');
      console.log('📡 Background sync registered');
    }
  } catch (error) {
    console.error('❌ Failed to queue score:', error);
  }
}

// Get all queued scores
export async function getQueuedScores(): Promise<QueuedScore[]> {
  try {
    const db = await openDB();
    const transaction = db.transaction([STORE_NAME], 'readonly');
    const store = transaction.objectStore(STORE_NAME);

    return new Promise((resolve, reject) => {
      const request = store.getAll();
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  } catch (error) {
    console.error('❌ Failed to get queued scores:', error);
    return [];
  }
}

// Remove a synced score from queue
export async function removeQueuedScore(id: number): Promise<void> {
  try {
    const db = await openDB();
    const transaction = db.transaction([STORE_NAME], 'readwrite');
    const store = transaction.objectStore(STORE_NAME);

    await new Promise<void>((resolve, reject) => {
      const request = store.delete(id);
      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });

    console.log('✅ Score removed from queue:', id);
  } catch (error) {
    console.error('❌ Failed to remove score:', error);
  }
}

// Clear all queued scores
export async function clearQueuedScores(): Promise<void> {
  try {
    const db = await openDB();
    const transaction = db.transaction([STORE_NAME], 'readwrite');
    const store = transaction.objectStore(STORE_NAME);

    await new Promise<void>((resolve, reject) => {
      const request = store.clear();
      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });

    console.log('✅ All queued scores cleared');
  } catch (error) {
    console.error('❌ Failed to clear scores:', error);
  }
}

// Get count of queued scores
export async function getQueuedScoresCount(): Promise<number> {
  try {
    const db = await openDB();
    const transaction = db.transaction([STORE_NAME], 'readonly');
    const store = transaction.objectStore(STORE_NAME);

    return new Promise((resolve, reject) => {
      const request = store.count();
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  } catch (error) {
    console.error('❌ Failed to get score count:', error);
    return 0;
  }
}

// Listen for sync events from service worker
export function listenForSyncEvents(callback: (score: QueuedScore) => void): void {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.addEventListener('message', (event) => {
      if (event.data && event.data.type === 'SCORE_SYNCED') {
        callback(event.data.score);
      }
    });
  }
}

// Check if user is online
export function isOnline(): boolean {
  return navigator.onLine;
}

// Wait for online connection
export function waitForOnline(): Promise<void> {
  return new Promise((resolve) => {
    if (navigator.onLine) {
      resolve();
    } else {
      const handleOnline = () => {
        window.removeEventListener('online', handleOnline);
        resolve();
      };
      window.addEventListener('online', handleOnline);
    }
  });
}
