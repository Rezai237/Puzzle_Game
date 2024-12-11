import React from 'react';
import { useGameStore } from '../../store/gameStore';

interface TileProps {
  number: number;
  index: number;
  size: number;
}

export default function Tile({ number, index, size }: TileProps) {
  const moveTile = useGameStore(state => state.moveTile);

  if (number === 0) {
    return (
      <div
        style={{
          width: `${size}px`,
          height: `${size}px`,
          fontSize: `${size * 0.4}px`, // Responsive font size
        }}
        className="bg-gray-300 rounded-lg"
      />
    );
  }

  return (
    <button
      onClick={() => moveTile(index)}
      style={{
        width: `${size}px`,
        height: `${size}px`,
        fontSize: `${size * 0.4}px`, // Responsive font size
      }}
      className="bg-blue-600 text-white font-bold rounded-lg
        active:bg-blue-700 active:transform active:scale-95
        transition-all duration-150 flex items-center justify-center
        touch-manipulation select-none"
    >
      {number}
    </button>
  );
}