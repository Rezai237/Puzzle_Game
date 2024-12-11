import React from 'react';
import { ArrowUpRight, ArrowDownLeft, Gift, Send } from 'lucide-react';
import type { TokenTransaction } from '../../types/token';

interface Props {
  transactions: TokenTransaction[];
}

export default function TransactionHistory({ transactions }: Props) {
  const getTransactionIcon = (type: TokenTransaction['type']) => {
    switch (type) {
      case 'earned':
        return <Gift className="text-green-500" />;
      case 'spent':
        return <ArrowUpRight className="text-red-500" />;
      case 'transferred':
        return <Send className="text-blue-500" />;
      case 'referral':
        return <ArrowDownLeft className="text-purple-500" />;
    }
  };

  if (transactions.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        No transactions yet
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {transactions.map((transaction) => (
        <div
          key={transaction.id}
          className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
        >
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-lg bg-white">
              {getTransactionIcon(transaction.type)}
            </div>
            <div>
              <p className="font-medium text-sm">{transaction.description}</p>
              <p className="text-xs text-gray-500">
                {new Date(transaction.createdAt).toLocaleString()}
              </p>
            </div>
          </div>
          <span className={`font-medium ${
            transaction.amount > 0 ? 'text-green-600' : 'text-red-600'
          }`}>
            {transaction.amount > 0 ? '+' : ''}{transaction.amount}
          </span>
        </div>
      ))}
    </div>
  );
}