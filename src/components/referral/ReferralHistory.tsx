import React from 'react';
import { Clock, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import { ReferralHistory as ReferralHistoryType } from '../../types/referral';

interface Props {
  history: ReferralHistoryType[];
}

export default function ReferralHistory({ history }: Props) {
  const getStatusIcon = (type: ReferralHistoryType['type']) => {
    switch (type) {
      case 'earned':
        return <CheckCircle className="text-green-500 w-4 h-4" />;
      case 'pending':
        return <Clock className="text-yellow-500 w-4 h-4" />;
      case 'verified':
        return <CheckCircle className="text-blue-500 w-4 h-4" />;
      case 'rejected':
        return <XCircle className="text-red-500 w-4 h-4" />;
    }
  };

  const getStatusText = (type: ReferralHistoryType['type']) => {
    switch (type) {
      case 'earned':
        return 'Earned';
      case 'pending':
        return 'Pending';
      case 'verified':
        return 'Verified';
      case 'rejected':
        return 'Rejected';
    }
  };

  if (history.length === 0) {
    return (
      <div className="text-center py-8">
        <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-3" />
        <p className="text-gray-600">No referral history yet</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {history.map((entry, index) => (
        <div
          key={index}
          className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
        >
          <div className="flex items-center space-x-3">
            {getStatusIcon(entry.type)}
            <div>
              <p className="font-medium text-sm">{entry.referralName}</p>
              <p className="text-xs text-gray-500">
                {new Date(entry.date).toLocaleDateString()}
              </p>
            </div>
          </div>
          <div className="text-right">
            <p className="font-medium text-sm">+{entry.amount} tokens</p>
            <p className={`text-xs ${
              entry.type === 'earned' ? 'text-green-600' :
              entry.type === 'pending' ? 'text-yellow-600' :
              entry.type === 'verified' ? 'text-blue-600' :
              'text-red-600'
            }`}>
              {getStatusText(entry.type)}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}