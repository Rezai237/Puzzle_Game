import React from 'react';
import { useGameStore } from '../../store/gameStore';
import { useUserStore } from '../../store/userStore';
import { Difficulty } from '../../types/game';
import { RefreshCw, Coins } from 'lucide-react';
import Timer from './Timer';

export default function GameControls() {
  const { difficulty, initGame, resetGame, moves } = useGameStore();
  const user = useUserStore(state => state.user);
  const difficulties: Difficulty[] = ['easy', 'normal', 'hard'];

  return (
    <div className="space-y-4 px-4">
      {/* Token Display */}
      <div className="bg-white rounded-lg shadow p-3 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Coins className="text-yellow-500" size={20} />
          <span className="font-medium">{user?.tokens || 0}</span>
        </div>
        <Timer />
      </div>

      <div className="grid grid-cols-3 gap-2">
        {difficulties.map((diff) => (
          <button
            key={diff}
            onClick={() => initGame(diff)}
            className={`py-3 rounded-lg font-medium text-sm
              ${difficulty === diff
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-700 active:bg-gray-300'
              } touch-manipulation`}
          >
            {diff.charAt(0).toUpperCase() + diff.slice(1)}
          </button>
        ))}
      </div>

      <div className="flex items-center justify-between">
        <button
          onClick={resetGame}
          className="flex items-center space-x-2 px-4 py-2 bg-gray-200 
            text-gray-700 rounded-lg active:bg-gray-300 touch-manipulation"
        >
          <RefreshCw size={18} />
          <span className="text-sm">Reset</span>
        </button>
        
        <div className="text-gray-600 text-sm">
          Moves: {moves}
        </div>
      </div>
    </div>
  );
}