import React from 'react';
import { Award, Clock, Trophy, Coins, Flame } from 'lucide-react';
import type { Achievement } from '../../types/achievement';
import { useAchievementStore } from '../../store/achievementStore';

const icons = {
  trophy: Trophy,
  clock: Clock,
  award: Award,
  coins: Coins,
  flame: Flame,
};

interface Props {
  achievement: Achievement;
}

export default function AchievementCard({ achievement }: Props) {
  const claimReward = useAchievementStore(state => state.claimReward);
  const Icon = icons[achievement.icon as keyof typeof icons];

  return (
    <div className={`bg-white rounded-lg shadow-md p-4 ${
      achievement.completed ? 'border-2 border-green-500' : ''
    }`}>
      <div className="flex items-start justify-between">
        <div className="flex items-center space-x-3">
          <div className={`p-2 rounded-lg ${
            achievement.completed ? 'bg-green-100' : 'bg-gray-100'
          }`}>
            <Icon className={achievement.completed ? 'text-green-600' : 'text-gray-400'} />
          </div>
          <div>
            <h3 className="font-medium">{achievement.title}</h3>
            <p className="text-sm text-gray-600">{achievement.description}</p>
          </div>
        </div>
        <div className="flex flex-col items-end">
          <div className="flex items-center space-x-1">
            <Coins size={16} className="text-yellow-500" />
            <span className="font-medium">{achievement.reward}</span>
          </div>
        </div>
      </div>

      <div className="mt-4">
        <div className="relative pt-1">
          <div className="flex mb-2 items-center justify-between">
            <div>
              <span className="text-xs font-semibold inline-block text-blue-600">
                {Math.round(achievement.progress)}%
              </span>
            </div>
          </div>
          <div className="overflow-hidden h-2 text-xs flex rounded bg-blue-100">
            <div
              style={{ width: `${achievement.progress}%` }}
              className="shadow-none flex flex-col text-center whitespace-nowrap 
                text-white justify-center bg-blue-600 transition-all duration-500"
            />
          </div>
        </div>
      </div>

      {achievement.completed && (
        <button
          onClick={() => claimReward(achievement.id)}
          className="mt-4 w-full py-2 bg-green-600 text-white rounded-lg
            font-medium hover:bg-green-700 transition-colors"
        >
          Claim Reward
        </button>
      )}
    </div>
  );
}