import { create } from 'zustand';
import type { User } from '../types/game';

interface UserStore {
  user: User | null;
  setUser: (user: User) => void;
}

const mockUser: User = {
  id: 'test123',
  name: 'Test User',
  avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop',
  tokens: 100,
  referralTokens: 10,
  stats: {
    gamesPlayed: { easy: 0, normal: 0, hard: 0 },
    bestTimes: { easy: null, normal: null, hard: null },
  },
};

export const useUserStore = create<UserStore>((set) => ({
  user: mockUser, // Using mock user for development
  setUser: (user) => set({ user }),
}));