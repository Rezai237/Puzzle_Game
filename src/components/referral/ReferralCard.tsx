import React, { useState, useEffect } from 'react';
import { Share2, Copy, Check, Users, Coins, Clock, ChevronRight } from 'lucide-react';
import { useReferralStore } from '../../store/referralStore';
import ReferralHistory from './ReferralHistory';

export default function ReferralCard() {
  const {
    referralCode,
    generateReferralCode,
    stats,
    history,
    getReferralStats,
    getReferralHistory,
  } = useReferralStore();
  
  const [copied, setCopied] = useState(false);
  const [showHistory, setShowHistory] = useState(false);

  useEffect(() => {
    if (!stats) {
      getReferralStats();
    }
    getReferralHistory();
  }, []);

  const handleGenerateCode = async () => {
    if (!referralCode) {
      await generateReferralCode();
    }
  };

  const handleCopyCode = () => {
    if (referralCode) {
      navigator.clipboard.writeText(referralCode.code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-6 space-y-6">
        {/* Referral Code Section */}
        <div className="space-y-4">
          <h3 className="font-bold text-lg flex items-center">
            <Share2 className="mr-2 text-blue-600" />
            Your Referral Code
          </h3>
          
          {referralCode ? (
            <div className="flex items-center space-x-2">
              <div className="flex-1 bg-gray-50 p-3 rounded-lg font-mono font-medium text-center">
                {referralCode.code}
              </div>
              <button
                onClick={handleCopyCode}
                className="p-3 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100"
              >
                {copied ? <Check size={20} /> : <Copy size={20} />}
              </button>
            </div>
          ) : (
            <button
              onClick={handleGenerateCode}
              className="w-full py-3 bg-blue-600 text-white rounded-lg font-medium
                hover:bg-blue-700 transition-colors"
            >
              Generate Code
            </button>
          )}
        </div>

        {/* Stats Section */}
        {stats && (
          <>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <Users className="text-blue-600" size={20} />
                  <span className="text-sm text-gray-600">Total Referrals</span>
                </div>
                <p className="text-2xl font-bold">{stats.totalReferrals}</p>
                <p className="text-sm text-gray-500">
                  {stats.verificationProgress.verified} verified
                </p>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <Coins className="text-yellow-500" size={20} />
                  <span className="text-sm text-gray-600">Total Earnings</span>
                </div>
                <p className="text-2xl font-bold">{stats.totalEarnings}</p>
                <p className="text-sm text-gray-500">
                  {stats.pendingEarnings} pending
                </p>
              </div>
            </div>

            {/* Pending Earnings */}
            {stats.pendingEarnings > 0 && (
              <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Clock className="text-yellow-600" size={20} />
                    <div>
                      <span className="text-sm text-yellow-800">Pending Verification</span>
                      <p className="font-bold text-yellow-900">{stats.pendingEarnings} tokens</p>
                    </div>
                  </div>
                  <div className="text-sm text-yellow-700">
                    {stats.verificationProgress.pending} referrals pending
                  </div>
                </div>
                <p className="text-xs text-yellow-700 mt-2">
                  Earnings will be verified after referrals reach minimum activity threshold
                </p>
              </div>
            )}

            {/* Recent Referrals */}
            {stats.recentReferrals.length > 0 && (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium text-gray-700">Recent Referrals</h4>
                  <button
                    onClick={() => setShowHistory(!showHistory)}
                    className="text-blue-600 text-sm flex items-center"
                  >
                    View History
                    <ChevronRight size={16} />
                  </button>
                </div>

                {showHistory ? (
                  <ReferralHistory history={history} />
                ) : (
                  <div className="space-y-2">
                    {stats.recentReferrals.map((referral) => (
                      <div
                        key={referral.userId}
                        className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                      >
                        <div className="flex items-center space-x-3">
                          <img
                            src={referral.avatar}
                            alt={referral.name}
                            className="w-8 h-8 rounded-full"
                          />
                          <div>
                            <p className="font-medium">{referral.name}</p>
                            <p className="text-xs text-gray-500">
                              Joined {new Date(referral.joinedAt).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                        <div className="flex flex-col items-end space-y-1">
                          {referral.status === 'verified' ? (
                            <div className="flex items-center text-green-600">
                              <Coins size={14} className="mr-1" />
                              <span className="text-sm font-medium">+{referral.earnings}</span>
                            </div>
                          ) : (
                            <div className="flex items-center text-yellow-600">
                              <Clock size={14} className="mr-1" />
                              <span className="text-xs">+{referral.pendingEarnings} pending</span>
                            </div>
                          )}
                          <span className={`text-xs ${
                            referral.status === 'verified' ? 'text-green-600' :
                            referral.status === 'rejected' ? 'text-red-600' :
                            'text-yellow-600'
                          }`}>
                            {referral.status.charAt(0).toUpperCase() + referral.status.slice(1)}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}