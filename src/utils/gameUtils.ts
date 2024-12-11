import { Difficulty, GameState } from '../types/game';

export const GRID_SIZES: Record<Difficulty, number> = {
  easy: 3,
  normal: 4,
  hard: 5,
};

export function createInitialBoard(difficulty: Difficulty): number[] {
  const size = GRID_SIZES[difficulty];
  const totalTiles = size * size;
  const board = Array.from({ length: totalTiles - 1 }, (_, i) => i + 1);
  board.push(0); // Add empty tile
  return shuffleBoard(board, size);
}

export function shuffleBoard(board: number[], size: number): number[] {
  const shuffled = [...board];
  let currentIndex = shuffled.length;

  while (currentIndex !== 0) {
    const randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [shuffled[currentIndex], shuffled[randomIndex]] = [
      shuffled[randomIndex],
      shuffled[currentIndex],
    ];
  }

  // Ensure the puzzle is solvable
  if (!isSolvable(shuffled, size)) {
    // Swap first two non-empty tiles to make it solvable
    const firstNonEmpty = shuffled.findIndex(x => x !== 0);
    const secondNonEmpty = shuffled.findIndex((x, i) => x !== 0 && i > firstNonEmpty);
    [shuffled[firstNonEmpty], shuffled[secondNonEmpty]] = 
    [shuffled[secondNonEmpty], shuffled[firstNonEmpty]];
  }

  return shuffled;
}

export function isSolvable(board: number[], size: number): boolean {
  let inversions = 0;
  const boardWithoutEmpty = board.filter(x => x !== 0);

  for (let i = 0; i < boardWithoutEmpty.length - 1; i++) {
    for (let j = i + 1; j < boardWithoutEmpty.length; j++) {
      if (boardWithoutEmpty[i] > boardWithoutEmpty[j]) {
        inversions++;
      }
    }
  }

  if (size % 2 === 1) {
    return inversions % 2 === 0;
  } else {
    const emptyRowFromBottom = Math.floor(board.indexOf(0) / size);
    return (inversions + emptyRowFromBottom) % 2 === 1;
  }
}

export function isValidMove(currentIndex: number, targetIndex: number, size: number): boolean {
  const currentRow = Math.floor(currentIndex / size);
  const currentCol = currentIndex % size;
  const targetRow = Math.floor(targetIndex / size);
  const targetCol = targetIndex % size;

  return (
    (Math.abs(currentRow - targetRow) === 1 && currentCol === targetCol) ||
    (Math.abs(currentCol - targetCol) === 1 && currentRow === targetRow)
  );
}

export function checkWin(board: number[]): boolean {
  return board.every((tile, index) => 
    index === board.length - 1 ? tile === 0 : tile === index + 1
  );
}

export function formatTime(ms: number): string {
  const seconds = Math.floor(ms / 1000);
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
}