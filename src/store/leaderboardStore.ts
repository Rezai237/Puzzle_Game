import { create } from 'zustand';
import type { LeaderboardData, LeaderboardEntry } from '../types/game';

interface LeaderboardStore {
  data: LeaderboardData;
  isLoading: boolean;
  fetchLeaderboard: () => Promise<void>;
}

// Mock data generator
const generateMockLeaderboard = (): LeaderboardEntry[] => {
  const names = ['John Doe', 'Jane Smith', 'Mike Johnson', 'Sarah Wilson', 'Alex Brown'];
  const avatars = [
    'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=50&h=50&fit=crop',
    'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=50&h=50&fit=crop',
    'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=50&h=50&fit=crop',
    'https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=50&h=50&fit=crop',
    'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=50&h=50&fit=crop',
  ];

  return Array.from({ length: 50 }, (_, i) => ({
    id: `player${i + 1}`,
    name: names[Math.floor(Math.random() * names.length)],
    avatar: avatars[Math.floor(Math.random() * avatars.length)],
    score: Math.floor(Math.random() * 1000) + 500,
    bestTime: Math.floor(Math.random() * 50000) + 20000,
    difficulty: ['easy', 'normal', 'hard'][Math.floor(Math.random() * 3)] as any,
    weeklyScore: Math.floor(Math.random() * 500) + 100,
  })).sort((a, b) => b.score - a.score);
};

export const useLeaderboardStore = create<LeaderboardStore>((set) => ({
  data: {
    allTime: [],
    weekly: [],
  },
  isLoading: false,
  fetchLeaderboard: async () => {
    set({ isLoading: true });
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const entries = generateMockLeaderboard();
    const weeklyEntries = [...entries]
      .sort((a, b) => b.weeklyScore - a.weeklyScore)
      .slice(0, 50);

    set({
      data: {
        allTime: entries.slice(0, 100),
        weekly: weeklyEntries,
        userRank: {
          allTime: Math.floor(Math.random() * 100) + 50,
          weekly: Math.floor(Math.random() * 50) + 20,
        },
      },
      isLoading: false,
    });
  },
}));