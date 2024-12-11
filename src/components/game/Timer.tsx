import React, { useEffect, useState } from 'react';
import { Clock } from 'lucide-react';
import { useGameStore } from '../../store/gameStore';
import { formatTime } from '../../utils/gameUtils';

export default function Timer() {
  const { startTime, endTime } = useGameStore();
  const [currentTime, setCurrentTime] = useState<number>(0);

  useEffect(() => {
    if (!startTime || endTime) return;

    const interval = setInterval(() => {
      setCurrentTime(Date.now() - startTime);
    }, 100);

    return () => clearInterval(interval);
  }, [startTime, endTime]);

  if (!startTime) return null;

  return (
    <div className="flex items-center space-x-2 text-gray-600">
      <Clock size={20} />
      <span>{formatTime(currentTime)}</span>
    </div>
  );
}