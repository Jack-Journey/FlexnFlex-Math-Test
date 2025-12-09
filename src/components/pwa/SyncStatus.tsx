import { useState, useEffect } from 'react';
import { Cloud, CloudOff, CheckCircle } from 'lucide-react';
import { getQueuedScoresCount, listenForSyncEvents } from '../../lib/offlineSync';

export default function SyncStatus() {
  const [queuedCount, setQueuedCount] = useState(0);
  const [showSyncSuccess, setShowSyncSuccess] = useState(false);
  const [isOnline, setIsOnline] = useState(true);

  useEffect(() => {
    // Initial count
    updateQueuedCount();

    // Set online status
    setIsOnline(navigator.onLine);

    // Listen for online/offline events
    const handleOnline = () => {
      setIsOnline(true);
      updateQueuedCount();
    };

    const handleOffline = () => {
      setIsOnline(false);
      updateQueuedCount();
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Listen for sync events from service worker
    listenForSyncEvents(() => {
      updateQueuedCount();
      showSyncNotification();
    });

    // Update count periodically
    const interval = setInterval(updateQueuedCount, 5000);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      clearInterval(interval);
    };
  }, []);

  const updateQueuedCount = async () => {
    const count = await getQueuedScoresCount();
    setQueuedCount(count);
  };

  const showSyncNotification = () => {
    setShowSyncSuccess(true);
    setTimeout(() => setShowSyncSuccess(false), 3000);
  };

  // Don't show if nothing queued and online
  if (queuedCount === 0 && isOnline && !showSyncSuccess) {
    return null;
  }

  return (
    <>
      {/* Queued items indicator */}
      {queuedCount > 0 && (
        <div
          className="fixed top-20 right-4 z-40 bg-gray-900 text-white px-4 py-2 rounded-lg shadow-lg flex items-center gap-2 text-sm"
          style={{
            animation: 'fadeIn 0.3s ease-out'
          }}
        >
          {isOnline ? (
            <>
              <Cloud className="w-4 h-4 animate-pulse" />
              <span>Syncing {queuedCount} score{queuedCount !== 1 ? 's' : ''}...</span>
            </>
          ) : (
            <>
              <CloudOff className="w-4 h-4" />
              <span>{queuedCount} score{queuedCount !== 1 ? 's' : ''} queued</span>
            </>
          )}
        </div>
      )}

      {/* Sync success notification */}
      {showSyncSuccess && (
        <div
          className="fixed top-20 right-4 z-40 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg flex items-center gap-2 text-sm"
          style={{
            animation: 'slideInRight 0.3s ease-out'
          }}
        >
          <CheckCircle className="w-4 h-4" />
          <span>Scores synced successfully!</span>
        </div>
      )}

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        
        @keyframes slideInRight {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
      `}</style>
    </>
  );
}
