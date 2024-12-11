import { create } from 'zustand';
import { RewardsState, ClaimResult } from '../types/rewards';
import { useUserStore } from './userStore';

interface RewardsStore extends RewardsState {
  initializeRewards: () => void;
  claimDailyReward: () => Promise<ClaimResult>;
  canClaimDaily: () => boolean;
}

const DAILY_REWARDS = [
  { day: 1, tokens: 10 },
  { day: 2, tokens: 15 },
  { day: 3, tokens: 20 },
  { day: 4, tokens: 25 },
  { day: 5, tokens: 30 },
  { day: 6, tokens: 35 },
  { day: 7, tokens: 50 },
];

export const useRewardsStore = create<RewardsStore>((set, get) => ({
  lastClaimDate: null,
  currentStreak: 0,
  rewards: DAILY_REWARDS.map(reward => ({ ...reward, claimed: false })),

  initializeRewards: () => {
    const savedState = localStorage.getItem('puzzleGameRewards');
    if (savedState) {
      const parsed = JSON.parse(savedState);
      set(parsed);
    }
  },

  canClaimDaily: () => {
    const { lastClaimDate } = get();
    if (!lastClaimDate) return true;

    const lastClaim = new Date(lastClaimDate);
    const now = new Date();
    const timeDiff = now.getTime() - lastClaim.getTime();
    const daysDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24));

    return daysDiff >= 1;
  },

  claimDailyReward: async () => {
    const { lastClaimDate, currentStreak, rewards } = get();
    const user = useUserStore.getState().user;
    
    if (!user) {
      return {
        success: false,
        tokens: 0,
        newStreak: currentStreak,
        message: 'User not found',
      };
    }

    if (!get().canClaimDaily()) {
      return {
        success: false,
        tokens: 0,
        newStreak: currentStreak,
        message: 'Already claimed today',
      };
    }

    const now = new Date();
    const newStreak = lastClaimDate
      ? new Date(lastClaimDate).getDate() === now.getDate() - 1
        ? currentStreak + 1
        : 1
      : 1;

    const currentDay = (newStreak - 1) % 7;
    const reward = rewards[currentDay];
    const newRewards = [...rewards];
    newRewards[currentDay] = { ...reward, claimed: true };

    const newState = {
      lastClaimDate: now.toISOString(),
      currentStreak: newStreak,
      rewards: newRewards,
    };

    set(newState);
    localStorage.setItem('puzzleGameRewards', JSON.stringify(newState));

    // Update user tokens
    useUserStore.setState({
      user: {
        ...user,
        tokens: user.tokens + reward.tokens,
      },
    });

    return {
      success: true,
      tokens: reward.tokens,
      newStreak,
      message: `Claimed ${reward.tokens} tokens!`,
    };
  },
}));