import { create } from 'zustand';
import { Difficulty, GameState } from '../types/game';
import { createInitialBoard, isValidMove, checkWin, GRID_SIZES } from '../utils/gameUtils';
import { useUserStore } from './userStore';

interface GameStore extends GameState {
  initGame: (difficulty: Difficulty) => void;
  moveTile: (index: number) => void;
  resetGame: () => void;
}

export const useGameStore = create<GameStore>((set, get) => ({
  difficulty: 'easy',
  board: [],
  emptyIndex: -1,
  moves: 0,
  startTime: null,
  endTime: null,

  initGame: (difficulty) => {
    const board = createInitialBoard(difficulty);
    set({
      difficulty,
      board,
      emptyIndex: board.indexOf(0),
      moves: 0,
      startTime: null,
      endTime: null,
    });
  },

  moveTile: (index) => {
    const { board, emptyIndex, difficulty, startTime, moves } = get();
    const size = GRID_SIZES[difficulty];

    if (!isValidMove(index, emptyIndex, size)) return;

    // Start timer on first move
    if (!startTime) {
      set({ startTime: Date.now() });
    }

    const newBoard = [...board];
    [newBoard[index], newBoard[emptyIndex]] = [newBoard[emptyIndex], newBoard[index]];

    const isWon = checkWin(newBoard);
    if (isWon && startTime) {
      const endTime = Date.now();
      const timeElapsed = endTime - startTime;
      const user = useUserStore.getState().user;
      
      if (user) {
        const tokens = calculateTokens(difficulty, timeElapsed);
        useUserStore.setState({
          user: {
            ...user,
            tokens: user.tokens + tokens,
            stats: {
              ...user.stats,
              gamesPlayed: {
                ...user.stats.gamesPlayed,
                [difficulty]: user.stats.gamesPlayed[difficulty] + 1,
              },
              bestTimes: {
                ...user.stats.bestTimes,
                [difficulty]: Math.min(
                  timeElapsed,
                  user.stats.bestTimes[difficulty] ?? Infinity
                ),
              },
            },
          },
        });
      }
    }

    set({
      board: newBoard,
      emptyIndex: index,
      moves: moves + 1,
      endTime: isWon ? Date.now() : null,
    });
  },

  resetGame: () => {
    const { difficulty } = get();
    get().initGame(difficulty);
  },
}));

function calculateTokens(difficulty: Difficulty, timeElapsed: number): number {
  const baseTokens = { easy: 4, normal: 10, hard: 25 }[difficulty];
  const timeBonus = {
    easy: timeElapsed < 30000 ? 2 : 0,
    normal: timeElapsed < 60000 ? 5 : 0,
    hard: timeElapsed < 120000 ? 10 : 0,
  }[difficulty];
  
  return baseTokens + timeBonus;
}