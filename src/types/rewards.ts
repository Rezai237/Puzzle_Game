import { User } from './game';

export interface DailyReward {
  day: number;
  tokens: number;
  claimed: boolean;
}

export interface RewardsState {
  lastClaimDate: string | null;
  currentStreak: number;
  rewards: DailyReward[];
}

export interface ClaimResult {
  success: boolean;
  tokens: number;
  newStreak: number;
  message: string;
}