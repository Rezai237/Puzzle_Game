export type Difficulty = 'easy' | 'normal' | 'hard';

export interface User {
  id: string;
  name: string;
  avatar: string;
  tokens: number;
  referralTokens: number;
  stats: {
    gamesPlayed: Record<Difficulty, number>;
    bestTimes: Record<Difficulty, number | null>;
  };
}

export interface LeaderboardEntry {
  id: string;
  name: string;
  avatar: string;
  score: number;
  bestTime: number;
  difficulty: Difficulty;
  weeklyScore: number;
}

export interface LeaderboardData {
  allTime: LeaderboardEntry[];
  weekly: LeaderboardEntry[];
  userRank?: {
    allTime: number;
    weekly: number;
  };
}