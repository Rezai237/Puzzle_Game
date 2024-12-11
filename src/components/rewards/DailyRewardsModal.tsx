import React from 'react';
import { X, Gift, Flame } from 'lucide-react';
import { useRewardsStore } from '../../store/rewardsStore';
import { DailyReward } from '../../types/rewards';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function DailyRewardsModal({ isOpen, onClose }: Props) {
  const { rewards, currentStreak, claimDailyReward, canClaimDaily } = useRewardsStore();
  const [claimResult, setClaimResult] = React.useState<string | null>(null);
  const [isLoading, setIsLoading] = React.useState(false);

  if (!isOpen) return null;

  const handleClaim = async () => {
    setIsLoading(true);
    const result = await claimDailyReward();
    setClaimResult(result.message);
    setIsLoading(false);
    
    if (result.success) {
      setTimeout(() => {
        onClose();
        setClaimResult(null);
      }, 1500);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg w-full max-w-md">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Daily Rewards</h2>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
              <X size={20} />
            </button>
          </div>

          <div className="flex items-center justify-center space-x-2 mb-6 bg-blue-50 p-3 rounded-lg">
            <Flame className="text-orange-500" />
            <span className="font-medium">
              {currentStreak} Day{currentStreak !== 1 ? 's' : ''} Streak
            </span>
          </div>

          <div className="grid grid-cols-7 gap-2 mb-6">
            {rewards.map((reward: DailyReward) => (
              <div
                key={reward.day}
                className={`relative p-3 rounded-lg flex flex-col items-center justify-center
                  ${reward.claimed ? 'bg-green-50' : 'bg-gray-50'}`}
              >
                <Gift
                  size={20}
                  className={reward.claimed ? 'text-green-500' : 'text-gray-400'}
                />
                <span className="text-xs mt-1">{reward.tokens}</span>
                <span className="text-[10px] text-gray-500">Day {reward.day}</span>
              </div>
            ))}
          </div>

          {claimResult && (
            <div className="text-center mb-4 font-medium text-blue-600">
              {claimResult}
            </div>
          )}

          <button
            onClick={handleClaim}
            disabled={!canClaimDaily() || isLoading}
            className={`w-full py-3 rounded-lg font-medium
              ${canClaimDaily() && !isLoading
                ? 'bg-blue-600 text-white hover:bg-blue-700'
                : 'bg-gray-200 text-gray-600 cursor-not-allowed'
              }`}
          >
            {isLoading ? 'Claiming...' : canClaimDaily() ? 'Claim Daily Reward' : 'Already Claimed Today'}
          </button>
        </div>
      </div>
    </div>
  );
}