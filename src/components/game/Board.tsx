import React, { useEffect, useState } from 'react';
import { useGameStore } from '../../store/gameStore';
import { GRID_SIZES } from '../../utils/gameUtils';
import Tile from './Tile';

export default function Board() {
  const { board, difficulty } = useGameStore();
  const size = GRID_SIZES[difficulty];
  const [tileSize, setTileSize] = useState(getTileSize());

  // Calculate dynamic tile size based on viewport width and difficulty
  function getTileSize() {
    const maxBoardWidth = Math.min(window.innerWidth - 32, 400); // Max board width of 400px
    const gap = 8; // Gap between tiles
    const padding = 16; // Board padding
    const totalGaps = size - 1; // Number of gaps between tiles
    const availableSpace = maxBoardWidth - (2 * padding) - (totalGaps * gap);
    return Math.floor(availableSpace / size);
  }

  useEffect(() => {
    const handleResize = () => {
      setTileSize(getTileSize());
    };

    // Update tile size when difficulty changes
    setTileSize(getTileSize());

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [size, difficulty]);

  const boardStyle = {
    display: 'grid',
    gridTemplateColumns: `repeat(${size}, ${tileSize}px)`,
    gap: '8px',
    padding: '16px',
    backgroundColor: 'rgb(229, 231, 235)', // bg-gray-200
    borderRadius: '0.5rem',
    width: 'fit-content',
    touchAction: 'manipulation',
  };

  return (
    <div className="flex justify-center items-center w-full">
      <div style={boardStyle}>
        {board.map((number, index) => (
          <Tile 
            key={index} 
            number={number} 
            index={index}
            size={tileSize}
          />
        ))}
      </div>
    </div>
  );
}