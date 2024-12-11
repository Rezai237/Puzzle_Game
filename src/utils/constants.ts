// Game Constants
export const GRID_SIZES = {
  easy: 3,
  normal: 4,
  hard: 5,
} as const;

export const TOKEN_REWARDS = {
  easy: { base: 4, timeBonus: 2, timeLimit: 30000 },
  normal: { base: 10, timeBonus: 5, timeLimit: 60000 },
  hard: { base: 25, timeBonus: 10, timeLimit: 120000 },
} as const;

// Referral Constants
export const REFERRAL_COMMISSION = 0.05; // 5%
export const REFERRAL_CODE_LENGTH = 6;

// Daily Rewards
export const DAILY_REWARDS = [
  { day: 1, tokens: 10 },
  { day: 2, tokens: 15 },
  { day: 3, tokens: 20 },
  { day: 4, tokens: 25 },
  { day: 5, tokens: 30 },
  { day: 6, tokens: 35 },
  { day: 7, tokens: 50 },
] as const;