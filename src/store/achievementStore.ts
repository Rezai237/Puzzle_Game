import { create } from 'zustand';
import { Achievement, AchievementState } from '../types/achievement';
import { useUserStore } from './userStore';
import { useNotificationStore } from './notificationStore';

interface AchievementStore extends AchievementState {
  checkAchievements: () => void;
  claimReward: (achievementId: string) => void;
}

const ACHIEVEMENTS: Omit<Achievement, 'progress' | 'completed'>[] = [
  {
    id: 'first_win',
    title: 'First Victory',
    description: 'Complete your first puzzle',
    icon: 'trophy',
    requirement: { type: 'games_played', value: 1 },
    reward: 20,
  },
  {
    id: 'speed_demon_easy',
    title: 'Speed Demon',
    description: 'Complete an easy puzzle under 20 seconds',
    icon: 'clock',
    requirement: { type: 'best_time', difficulty: 'easy', value: 20000 },
    reward: 30,
  },
  {
    id: 'master_normal',
    title: 'Normal Master',
    description: 'Complete 50 normal puzzles',
    icon: 'award',
    requirement: { type: 'games_played', difficulty: 'normal', value: 50 },
    reward: 100,
  },
  {
    id: 'token_collector',
    title: 'Token Collector',
    description: 'Earn 1000 tokens',
    icon: 'coins',
    requirement: { type: 'tokens', value: 1000 },
    reward: 200,
  },
  {
    id: 'streak_master',
    title: 'Streak Master',
    description: 'Maintain a 7-day login streak',
    icon: 'flame',
    requirement: { type: 'streak', value: 7 },
    reward: 150,
  },
];

export const useAchievementStore = create<AchievementStore>((set, get) => ({
  achievements: ACHIEVEMENTS.map(achievement => ({
    ...achievement,
    progress: 0,
    completed: false,
  })),
  unlockedCount: 0,

  checkAchievements: () => {
    const user = useUserStore.getState().user;
    if (!user) return;

    const newAchievements = get().achievements.map(achievement => {
      if (achievement.completed) return achievement;

      let progress = 0;
      switch (achievement.requirement.type) {
        case 'games_played':
          progress = achievement.requirement.difficulty
            ? user.stats.gamesPlayed[achievement.requirement.difficulty]
            : Object.values(user.stats.gamesPlayed).reduce((a, b) => a + b, 0);
          break;
        case 'best_time':
          if (achievement.requirement.difficulty) {
            const bestTime = user.stats.bestTimes[achievement.requirement.difficulty];
            progress = bestTime ? (achievement.requirement.value / bestTime) * 100 : 0;
          }
          break;
        case 'tokens':
          progress = (user.tokens / achievement.requirement.value) * 100;
          break;
        case 'streak':
          progress = 0; // Will be implemented with daily rewards system
          break;
      }

      const completed = progress >= 100;
      if (completed && !achievement.completed) {
        useNotificationStore.getState().addNotification({
          type: 'success',
          message: `Achievement Unlocked: ${achievement.title}`,
          duration: 5000,
        });
      }

      return {
        ...achievement,
        progress: Math.min(progress, 100),
        completed,
      };
    });

    set({
      achievements: newAchievements,
      unlockedCount: newAchievements.filter(a => a.completed).length,
    });
  },

  claimReward: (achievementId: string) => {
    const achievement = get().achievements.find(a => a.id === achievementId);
    if (!achievement || !achievement.completed) return;

    const user = useUserStore.getState().user;
    if (!user) return;

    useUserStore.setState({
      user: {
        ...user,
        tokens: user.tokens + achievement.reward,
      },
    });

    useNotificationStore.getState().addNotification({
      type: 'success',
      message: `Claimed ${achievement.reward} tokens!`,
      duration: 3000,
    });
  },
}));