import React from 'react';
import { Trophy, Clock, Gift } from 'lucide-react';
import { useGameStore } from '../../store/gameStore';
import { formatTime } from '../../utils/gameUtils';

export default function WinModal() {
  const { startTime, endTime, moves, difficulty } = useGameStore();

  if (!endTime || !startTime) return null;

  const timeElapsed = endTime - startTime;
  const tokens = calculateTokens();

  function calculateTokens() {
    const baseTokens = { easy: 4, normal: 10, hard: 25 }[difficulty];
    const timeBonus = {
      easy: timeElapsed < 30000 ? 2 : 0,
      normal: timeElapsed < 60000 ? 5 : 0,
      hard: timeElapsed < 120000 ? 10 : 0,
    }[difficulty];
    
    return baseTokens + timeBonus;
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-sm">
        <div className="flex justify-center mb-4">
          <Trophy className="text-yellow-500 w-16 h-16" />
        </div>
        
        <h2 className="text-2xl font-bold text-center mb-6">
          Puzzle Completed!
        </h2>
        
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <Clock className="text-blue-500" />
              <span>Time</span>
            </div>
            <span className="font-medium">{formatTime(timeElapsed)}</span>
          </div>
          
          <div className="flex justify-between items-center">
            <span>Moves</span>
            <span className="font-medium">{moves}</span>
          </div>
          
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <Gift className="text-green-500" />
              <span>Tokens Earned</span>
            </div>
            <span className="font-medium">+{tokens}</span>
          </div>
        </div>
        
        <button
          onClick={() => useGameStore.getState().resetGame()}
          className="w-full mt-6 bg-blue-600 text-white py-3 rounded-lg
            font-medium hover:bg-blue-700 transition-colors"
        >
          Play Again
        </button>
      </div>
    </div>
  );
}