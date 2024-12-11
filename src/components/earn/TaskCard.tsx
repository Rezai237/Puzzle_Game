import React, { useState } from 'react';
import { Gift } from 'lucide-react';
import type { Task } from '../../types/tasks';
import VideoAdModal from '../ads/VideoAdModal';
import TaskIcon from './TaskIcon';

interface Props {
  task: Task;
  onComplete: (taskId: string) => void;
}

export default function TaskCard({ task, onComplete }: Props) {
  const [showVideoAd, setShowVideoAd] = useState(false);

  const handleClick = () => {
    if (task.id === 'watch-ad') {
      setShowVideoAd(true);
    } else {
      onComplete(task.id);
    }
  };

  return (
    <>
      <div className="p-4 hover:bg-gray-50 transition-colors">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className={`p-2 rounded-lg ${
              task.completed ? 'bg-green-100' : 'bg-gray-100'
            }`}>
              <TaskIcon
                taskId={task.id}
                className={task.completed ? 'text-green-600' : 'text-gray-600'}
              />
            </div>
            <div>
              <h3 className="font-medium">{task.title}</h3>
              <p className="text-sm text-gray-600">{task.description}</p>
              {task.progress !== undefined && task.total !== undefined && (
                <div className="mt-2">
                  <div className="h-1.5 w-32 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-blue-600 transition-all duration-300"
                      style={{ width: `${(task.progress / task.total) * 100}%` }}
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    {task.progress} / {task.total}
                  </p>
                </div>
              )}
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <Gift size={18} className="text-yellow-500" />
              <span className="font-medium">{task.reward}</span>
            </div>
            <button
              onClick={handleClick}
              className={`px-4 py-2 rounded-lg text-sm font-medium
                ${task.completed
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800'
                }`}
              disabled={task.completed}
            >
              {task.completed ? 'Claimed' : 'Claim'}
            </button>
          </div>
        </div>
      </div>

      {task.id === 'watch-ad' && (
        <VideoAdModal
          isOpen={showVideoAd}
          onClose={() => setShowVideoAd(false)}
          taskId={task.id}
        />
      )}
    </>
  );
}