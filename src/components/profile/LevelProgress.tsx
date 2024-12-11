import React from 'react';
import { Trophy, Star, ChevronRight } from 'lucide-react';
import { useGameProgress } from '../../hooks/useGameProgress';
import { calculateNextLevelTokens } from '../../utils/analytics';

export default function LevelProgress() {
  const { level, progress, totalTokens } = useGameProgress();
  const nextLevelTokens = calculateNextLevelTokens(level);

  const rewards = [
    { level: level + 1, reward: 'New Avatar Frame' },
    { level: level + 2, reward: 'Special Effects' },
    { level: level + 3, reward: 'Custom Theme' },
  ];

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Trophy className="text-blue-600 w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-lg">Level {level}</h3>
              <p className="text-sm text-gray-600">
                {totalTokens} / {nextLevelTokens} tokens
              </p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-600">Next Level</p>
            <p className="font-bold text-lg">{level + 1}</p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-blue-600 transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-sm text-gray-600 text-right">
            {Math.round(progress)}% Complete
          </p>
        </div>

        {/* Upcoming Rewards */}
        <div className="space-y-2">
          <h4 className="font-medium text-gray-800">Upcoming Rewards</h4>
          <div className="divide-y bg-gray-50 rounded-lg">
            {rewards.map(({ level: rewardLevel, reward }) => (
              <div
                key={rewardLevel}
                className="p-3 flex items-center justify-between"
              >
                <div className="flex items-center space-x-3">
                  <div className="p-1.5 bg-yellow-100 rounded-lg">
                    <Star className="text-yellow-600 w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Level {rewardLevel}</p>
                    <p className="text-xs text-gray-600">{reward}</p>
                  </div>
                </div>
                <ChevronRight className="text-gray-400 w-4 h-4" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}