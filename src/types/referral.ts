export interface ReferralCode {
  code: string;
  userId: string;
  usedBy: ReferralUser[];
  pendingEarnings: number;
  totalEarnings: number;
  createdAt: string;
  lastUpdated: string;
}

export interface ReferralUser {
  userId: string;
  name: string;
  avatar: string;
  joinedAt: string;
  status: 'pending' | 'verified' | 'rejected';
  earnings: number;
  pendingEarnings: number;
  verificationDate?: string;
  rejectionReason?: string;
}

export interface ReferralStats {
  totalReferrals: number;
  activeReferrals: number;
  pendingEarnings: number;
  totalEarnings: number;
  recentReferrals: ReferralUser[];
  verificationProgress: {
    pending: number;
    verified: number;
    rejected: number;
  };
}

export interface ReferralHistory {
  date: string;
  amount: number;
  type: 'earned' | 'pending' | 'verified' | 'rejected';
  referralId: string;
  referralName: string;
}