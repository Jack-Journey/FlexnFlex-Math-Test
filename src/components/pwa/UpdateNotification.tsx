import { useState, useEffect } from 'react';
import { Download, X } from 'lucide-react';

interface UpdateDetails {
  registration: ServiceWorkerRegistration;
  newWorker: ServiceWorker;
}

export default function UpdateNotification() {
  const [updateAvailable, setUpdateAvailable] = useState(false);
  const [updateDetails, setUpdateDetails] = useState<UpdateDetails | null>(null);

  useEffect(() => {
    // Listen for service worker update event
    const handleUpdate = (event: Event) => {
      const customEvent = event as CustomEvent<UpdateDetails>;
      setUpdateDetails(customEvent.detail);
      setUpdateAvailable(true);
    };

    window.addEventListener('swUpdateAvailable', handleUpdate as EventListener);

    return () => {
      window.removeEventListener('swUpdateAvailable', handleUpdate as EventListener);
    };
  }, []);

  const handleUpdate = () => {
    if (updateDetails?.newWorker) {
      // Tell the new service worker to skip waiting
      updateDetails.newWorker.postMessage({ type: 'SKIP_WAITING' });
      setUpdateAvailable(false);
    }
  };

  const handleDismiss = () => {
    setUpdateAvailable(false);
  };

  if (!updateAvailable) {
    return null;
  }

  return (
    <div
      className="fixed bottom-5 left-1/2 -translate-x-1/2 z-50 bg-gray-900 text-white rounded-xl shadow-2xl max-w-md w-[90%]"
      style={{
        animation: 'slideUp 0.3s ease-out'
      }}
    >
      <div className="p-4 flex items-start gap-4">
        <div className="bg-purple-600 rounded-full p-2 flex-shrink-0">
          <Download className="w-5 h-5" />
        </div>
        
        <div className="flex-1">
          <h3 className="font-semibold mb-1">🎉 New version available!</h3>
          <p className="text-sm text-gray-300">
            Update now to get the latest features and improvements.
          </p>
          
          <div className="flex gap-2 mt-3">
            <button
              onClick={handleUpdate}
              className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-lg text-sm transition-colors active:scale-98"
            >
              Update Now
            </button>
            <button
              onClick={handleDismiss}
              className="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-lg text-sm transition-colors active:scale-98"
            >
              Later
            </button>
          </div>
        </div>
        
        <button
          onClick={handleDismiss}
          className="text-gray-400 hover:text-white transition-colors p-1"
          aria-label="Dismiss"
        >
          <X className="w-5 h-5" />
        </button>
      </div>
      
      <style>{`
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
        
        .active\\:scale-98:active {
          transform: scale(0.98);
        }
      `}</style>
    </div>
  );
}
