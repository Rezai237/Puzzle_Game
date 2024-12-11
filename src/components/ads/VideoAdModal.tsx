import React, { useState, useEffect } from 'react';
import { X, Play, Gift, AlertCircle } from 'lucide-react';
import { useTaskStore } from '../../store/taskStore';
import { useNotificationStore } from '../../store/notificationStore';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  taskId: string;
}

export default function VideoAdModal({ isOpen, onClose, taskId }: Props) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const completeTask = useTaskStore(state => state.completeTask);
  const addNotification = useNotificationStore(state => state.addNotification);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isPlaying) {
      interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            setIsPlaying(false);
            setIsCompleted(true);
            return 100;
          }
          return prev + 2;
        });
      }, 100);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isPlaying]);

  const handleStart = () => {
    setIsPlaying(true);
    addNotification({
      type: 'info',
      message: 'Video ad started. Please wait until it finishes.',
      duration: 3000,
    });
  };

  const handleClaim = () => {
    completeTask(taskId);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg w-full max-w-md">
        <div className="p-4 border-b flex justify-between items-center">
          <h2 className="text-lg font-bold">Watch Video</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
            disabled={isPlaying}
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-6 space-y-4">
          {!isPlaying && !isCompleted ? (
            <div className="text-center space-y-4">
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                <Play className="w-10 h-10 text-blue-600" />
              </div>
              <div>
                <h3 className="font-medium mb-2">Watch a Short Video</h3>
                <p className="text-sm text-gray-600">
                  Watch a short video to earn tokens. Make sure to watch the entire video.
                </p>
              </div>
              <button
                onClick={handleStart}
                className="w-full py-3 bg-blue-600 text-white rounded-lg font-medium
                  hover:bg-blue-700 transition-colors"
              >
                Start Video
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {isPlaying ? (
                <>
                  <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center">
                    <div className="animate-pulse text-gray-400">
                      Video Playing...
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-blue-600 transition-all duration-300"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>{Math.round(progress)}%</span>
                      <span>Please wait...</span>
                    </div>
                  </div>
                </>
              ) : (
                <div className="text-center space-y-4">
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                    <Gift className="w-10 h-10 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-medium mb-2">Video Completed!</h3>
                    <p className="text-sm text-gray-600">
                      Thank you for watching. Click below to claim your reward.
                    </p>
                  </div>
                  <button
                    onClick={handleClaim}
                    className="w-full py-3 bg-green-600 text-white rounded-lg font-medium
                      hover:bg-green-700 transition-colors"
                  >
                    Claim Reward
                  </button>
                </div>
              )}
            </div>
          )}

          {!isPlaying && (
            <div className="text-xs text-gray-500 flex items-center justify-center space-x-1">
              <AlertCircle size={12} />
              <span>Video must be watched completely to earn reward</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}