import { Difficulty } from '../types/game';
import { TOKEN_REWARDS } from './constants';

export function calculateTokenReward(difficulty: Difficulty, timeElapsed: number): number {
  const { base, timeBonus, timeLimit } = TOKEN_REWARDS[difficulty];
  const timeBonusEarned = timeElapsed < timeLimit ? timeBonus : 0;
  return base + timeBonusEarned;
}

export function formatTimeForDisplay(ms: number): string {
  const seconds = Math.floor(ms / 1000);
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
}

export function calculateLevel(totalTokens: number): number {
  return Math.floor(Math.sqrt(totalTokens / 10)) + 1;
}

export function calculateProgress(totalTokens: number): number {
  const currentLevel = calculateLevel(totalTokens);
  const tokensForCurrentLevel = calculateTokensForLevel(currentLevel);
  const tokensForNextLevel = calculateTokensForLevel(currentLevel + 1);
  
  const progress = ((totalTokens - tokensForCurrentLevel) / 
    (tokensForNextLevel - tokensForCurrentLevel)) * 100;
  return Math.min(Math.max(progress, 0), 100);
}

export function calculateTokensForLevel(level: number): number {
  return Math.pow(level - 1, 2) * 10;
}

export function calculateNextLevelTokens(currentLevel: number): number {
  return calculateTokensForLevel(currentLevel + 1);
}

export function calculateTotalProgress(user: { tokens: number; referralTokens: number }) {
  const totalTokens = user.tokens + user.referralTokens;
  const level = calculateLevel(totalTokens);
  const progress = calculateProgress(totalTokens);
  
  return {
    level,
    progress,
    totalTokens,
    nextLevelTokens: calculateNextLevelTokens(level),
  };
}