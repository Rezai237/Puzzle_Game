import React, { useEffect } from 'react';
import { useGameStore } from '../store/gameStore';
import Board from '../components/game/Board';
import GameControls from '../components/game/GameControls';
import WinModal from '../components/game/WinModal';

export default function Game() {
  const { initGame } = useGameStore();

  useEffect(() => {
    initGame('easy');
  }, []);

  return (
    <div className="max-w-lg mx-auto">
      <div className="space-y-6">
        <GameControls />
        
        <div className="flex justify-center">
          <Board />
        </div>

        <WinModal />
      </div>
    </div>
  );
}