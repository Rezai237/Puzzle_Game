import { Difficulty } from './game';

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  requirement: {
    type: 'games_played' | 'best_time' | 'tokens' | 'streak';
    difficulty?: Difficulty;
    value: number;
  };
  reward: number;
  progress: number;
  completed: boolean;
}

export interface AchievementState {
  achievements: Achievement[];
  unlockedCount: number;
}