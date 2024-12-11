import React, { useState } from 'react';
import { Wallet, Send, History, ArrowUpRight, ArrowDownLeft } from 'lucide-react';
import { useUserStore } from '../../store/userStore';
import TokenTransferModal from '../tokens/TokenTransferModal';
import TransactionHistory from '../tokens/TransactionHistory';

export default function WalletSection() {
  const [showTransferModal, setShowTransferModal] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const user = useUserStore(state => state.user);

  if (!user) return null;

  // Mock transactions for demonstration
  const recentTransactions = [
    {
      id: '1',
      userId: user.id,
      amount: 50,
      type: 'earned',
      description: 'Puzzle completion reward',
      createdAt: new Date().toISOString(),
    },
    {
      id: '2',
      userId: user.id,
      amount: -20,
      type: 'transferred',
      description: 'Transfer to User123',
      createdAt: new Date(Date.now() - 86400000).toISOString(),
    },
  ];

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-6 space-y-6">
        {/* Wallet Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Wallet className="text-blue-600 w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-lg">Your Wallet</h3>
              <p className="text-sm text-gray-600">Manage your tokens</p>
            </div>
          </div>
          <button
            onClick={() => setShowHistory(!showHistory)}
            className="text-blue-600 text-sm flex items-center space-x-1"
          >
            <History size={16} />
            <span>History</span>
          </button>
        </div>

        {/* Token Balance */}
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="flex justify-between items-center mb-4">
            <span className="text-gray-600">Available Balance</span>
            <span className="text-2xl font-bold">{user.tokens}</span>
          </div>
          
          <button
            onClick={() => setShowTransferModal(true)}
            className="w-full py-3 bg-blue-600 text-white rounded-lg font-medium
              hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
          >
            <Send size={20} />
            <span>Transfer Tokens</span>
          </button>
        </div>

        {/* Recent Activity */}
        {showHistory && (
          <div className="space-y-3">
            <h4 className="font-medium text-gray-700">Recent Activity</h4>
            <TransactionHistory transactions={recentTransactions} />
          </div>
        )}
      </div>

      <TokenTransferModal
        isOpen={showTransferModal}
        onClose={() => setShowTransferModal(false)}
      />
    </div>
  );
}