import { create } from 'zustand';
import type { ReferralCode, ReferralStats, ReferralHistory, ReferralUser } from '../types/referral';
import { useUserStore } from './userStore';
import { useNotificationStore } from './notificationStore';

interface ReferralStore {
  referralCode: ReferralCode | null;
  stats: ReferralStats | null;
  history: ReferralHistory[];
  isLoading: boolean;
  generateReferralCode: () => Promise<string>;
  getReferralStats: () => Promise<void>;
  getReferralHistory: () => Promise<void>;
  addPendingEarnings: (amount: number, referralId: string) => void;
  verifyReferral: (referralId: string) => Promise<void>;
  rejectReferral: (referralId: string, reason: string) => Promise<void>;
}

const INITIAL_REWARD = 10; // Initial reward for referring a user
const COMMISSION_RATE = 0.05; // 5% commission on referral's earnings
const VERIFICATION_THRESHOLD = 100; // Minimum tokens for verification

export const useReferralStore = create<ReferralStore>((set, get) => ({
  referralCode: null,
  stats: null,
  history: [],
  isLoading: false,

  generateReferralCode: async () => {
    const user = useUserStore.getState().user;
    if (!user) throw new Error('User not found');

    set({ isLoading: true });
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const code = Math.random().toString(36).substring(2, 8).toUpperCase();
      const referralCode: ReferralCode = {
        code,
        userId: user.id,
        usedBy: [],
        pendingEarnings: 0,
        totalEarnings: 0,
        createdAt: new Date().toISOString(),
        lastUpdated: new Date().toISOString(),
      };

      set({ referralCode, isLoading: false });
      
      useNotificationStore.getState().addNotification({
        type: 'success',
        message: 'Referral code generated successfully!',
        duration: 3000,
      });

      return code;
    } catch (error) {
      useNotificationStore.getState().addNotification({
        type: 'error',
        message: 'Failed to generate referral code',
        duration: 3000,
      });
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },

  getReferralStats: async () => {
    set({ isLoading: true });
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockReferrals: ReferralUser[] = Array.from({ length: 3 }, (_, i) => ({
        userId: `user${i}`,
        name: `User ${i + 1}`,
        avatar: `https://images.unsplash.com/photo-${1500000000000 + i}?w=50&h=50&fit=crop`,
        joinedAt: new Date(Date.now() - i * 86400000).toISOString(),
        status: ['pending', 'verified', 'pending'][i] as 'pending' | 'verified',
        earnings: Math.floor(Math.random() * 100),
        pendingEarnings: Math.floor(Math.random() * 50),
      }));

      const mockStats: ReferralStats = {
        totalReferrals: mockReferrals.length,
        activeReferrals: mockReferrals.filter(r => r.status === 'verified').length,
        pendingEarnings: mockReferrals.reduce((sum, r) => sum + r.pendingEarnings, 0),
        totalEarnings: mockReferrals.reduce((sum, r) => sum + r.earnings, 0),
        recentReferrals: mockReferrals,
        verificationProgress: {
          pending: mockReferrals.filter(r => r.status === 'pending').length,
          verified: mockReferrals.filter(r => r.status === 'verified').length,
          rejected: mockReferrals.filter(r => r.status === 'rejected').length,
        },
      };

      set({ stats: mockStats });
    } catch (error) {
      useNotificationStore.getState().addNotification({
        type: 'error',
        message: 'Failed to fetch referral stats',
        duration: 3000,
      });
    } finally {
      set({ isLoading: false });
    }
  },

  getReferralHistory: async () => {
    set({ isLoading: true });
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockHistory: ReferralHistory[] = Array.from({ length: 10 }, (_, i) => ({
        date: new Date(Date.now() - i * 86400000).toISOString(),
        amount: i === 0 ? INITIAL_REWARD : Math.floor(Math.random() * 50),
        type: ['earned', 'pending', 'verified', 'rejected'][Math.floor(Math.random() * 4)] as any,
        referralId: `user${i}`,
        referralName: `User ${i + 1}`,
      }));

      set({ history: mockHistory });
    } catch (error) {
      useNotificationStore.getState().addNotification({
        type: 'error',
        message: 'Failed to fetch referral history',
        duration: 3000,
      });
    } finally {
      set({ isLoading: false });
    }
  },

  addPendingEarnings: (amount: number, referralId: string) => {
    const { referralCode, stats } = get();
    if (!referralCode || !stats) return;

    const pendingAmount = Math.floor(amount * COMMISSION_RATE); // Calculate 5% commission

    // Update referral code
    const updatedUsedBy = referralCode.usedBy.map(user =>
      user.userId === referralId
        ? { ...user, pendingEarnings: user.pendingEarnings + pendingAmount }
        : user
    );

    set({
      referralCode: {
        ...referralCode,
        usedBy: updatedUsedBy,
        pendingEarnings: referralCode.pendingEarnings + pendingAmount,
        lastUpdated: new Date().toISOString(),
      },
    });

    // Add to history
    const newHistoryEntry: ReferralHistory = {
      date: new Date().toISOString(),
      amount: pendingAmount,
      type: 'pending',
      referralId,
      referralName: updatedUsedBy.find(u => u.userId === referralId)?.name || 'Unknown User',
    };

    set(state => ({
      history: [newHistoryEntry, ...state.history],
    }));
  },

  verifyReferral: async (referralId: string) => {
    const { referralCode, stats } = get();
    if (!referralCode || !stats) return;

    set({ isLoading: true });

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      const referral = referralCode.usedBy.find(u => u.userId === referralId);
      if (!referral || referral.pendingEarnings < VERIFICATION_THRESHOLD) {
        throw new Error('Insufficient earnings for verification');
      }

      // Update referral status and add initial reward
      const updatedUsedBy = referralCode.usedBy.map(user =>
        user.userId === referralId
          ? {
              ...user,
              status: 'verified',
              earnings: user.earnings + user.pendingEarnings + INITIAL_REWARD,
              pendingEarnings: 0,
              verificationDate: new Date().toISOString(),
            }
          : user
      );

      set({
        referralCode: {
          ...referralCode,
          usedBy: updatedUsedBy,
          lastUpdated: new Date().toISOString(),
        },
      });

      // Add initial reward to history
      const initialRewardEntry: ReferralHistory = {
        date: new Date().toISOString(),
        amount: INITIAL_REWARD,
        type: 'earned',
        referralId,
        referralName: referral.name,
      };

      set(state => ({
        history: [initialRewardEntry, ...state.history],
      }));

      useNotificationStore.getState().addNotification({
        type: 'success',
        message: 'Referral verified successfully',
        duration: 3000,
      });
    } catch (error) {
      useNotificationStore.getState().addNotification({
        type: 'error',
        message: error instanceof Error ? error.message : 'Failed to verify referral',
        duration: 3000,
      });
    } finally {
      set({ isLoading: false });
    }
  },

  rejectReferral: async (referralId: string, reason: string) => {
    const { referralCode } = get();
    if (!referralCode) return;

    set({ isLoading: true });

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      const updatedUsedBy = referralCode.usedBy.map(user =>
        user.userId === referralId
          ? {
              ...user,
              status: 'rejected',
              pendingEarnings: 0,
              rejectionReason: reason,
            }
          : user
      );

      set({
        referralCode: {
          ...referralCode,
          usedBy: updatedUsedBy,
          lastUpdated: new Date().toISOString(),
        },
      });

      useNotificationStore.getState().addNotification({
        type: 'info',
        message: 'Referral rejected',
        duration: 3000,
      });
    } catch (error) {
      useNotificationStore.getState().addNotification({
        type: 'error',
        message: 'Failed to reject referral',
        duration: 3000,
      });
    } finally {
      set({ isLoading: false });
    }
  },
}));