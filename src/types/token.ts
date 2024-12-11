export interface TokenTransaction {
  id: string;
  userId: string;
  amount: number;
  type: 'earned' | 'spent' | 'transferred' | 'referral';
  description: string;
  createdAt: string;
}

export interface TokenTransfer {
  id: string;
  fromUserId: string;
  toUserId: string;
  amount: number;
  status: 'pending' | 'completed' | 'failed';
  createdAt: string;
  completedAt?: string;
}