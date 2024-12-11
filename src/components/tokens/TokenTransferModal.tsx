import React, { useState } from 'react';
import { Send, X, AlertCircle } from 'lucide-react';
import { useUserStore } from '../../store/userStore';
import { useNotificationStore } from '../../store/notificationStore';
import { transferTokens } from '../../services/tokenService';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function TokenTransferModal({ isOpen, onClose }: Props) {
  const [recipientId, setRecipientId] = useState('');
  const [amount, setAmount] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const user = useUserStore(state => state.user);
  const addNotification = useNotificationStore(state => state.addNotification);

  if (!isOpen || !user) return null;

  const handleTransfer = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!recipientId || !amount) return;

    const transferAmount = parseInt(amount);
    if (isNaN(transferAmount) || transferAmount <= 0) {
      addNotification({
        type: 'error',
        message: 'Please enter a valid amount',
        duration: 3000,
      });
      return;
    }

    if (transferAmount > user.tokens) {
      addNotification({
        type: 'error',
        message: 'Insufficient tokens',
        duration: 3000,
      });
      return;
    }

    setIsLoading(true);
    try {
      await transferTokens(user.id, recipientId, transferAmount);
      addNotification({
        type: 'success',
        message: `Successfully transferred ${transferAmount} tokens`,
        duration: 3000,
      });
      onClose();
    } catch (error) {
      addNotification({
        type: 'error',
        message: error instanceof Error ? error.message : 'Transfer failed',
        duration: 3000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg w-full max-w-md">
        <div className="p-4 border-b flex justify-between items-center">
          <h2 className="text-lg font-bold">Transfer Tokens</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
            disabled={isLoading}
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleTransfer} className="p-6 space-y-4">
          <div className="space-y-2">
            <label htmlFor="recipientId" className="block text-sm font-medium text-gray-700">
              Recipient ID
            </label>
            <input
              type="text"
              id="recipientId"
              value={recipientId}
              onChange={(e) => setRecipientId(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 
                focus:border-blue-500 outline-none"
              placeholder="Enter recipient's ID"
              required
              disabled={isLoading}
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="amount" className="block text-sm font-medium text-gray-700">
              Amount
            </label>
            <input
              type="number"
              id="amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 
                focus:border-blue-500 outline-none"
              placeholder="Enter amount"
              min="1"
              max={user.tokens}
              required
              disabled={isLoading}
            />
            <p className="text-sm text-gray-500">
              Available: {user.tokens} tokens
            </p>
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 flex items-start space-x-2">
            <AlertCircle className="text-yellow-600 w-5 h-5 flex-shrink-0 mt-0.5" />
            <div className="text-sm text-yellow-700">
              <p className="font-medium">Important:</p>
              <ul className="list-disc list-inside space-y-1 mt-1">
                <li>Transfers are irreversible</li>
                <li>Double-check the recipient ID</li>
                <li>Minimum transfer amount is 1 token</li>
              </ul>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-blue-600 text-white rounded-lg font-medium
              hover:bg-blue-700 transition-colors disabled:bg-gray-400"
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="flex items-center justify-center space-x-2">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Processing...</span>
              </span>
            ) : (
              <span className="flex items-center justify-center space-x-2">
                <Send size={20} />
                <span>Transfer Tokens</span>
              </span>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}