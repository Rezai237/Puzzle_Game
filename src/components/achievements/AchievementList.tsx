import React from 'react';
import { useAchievementStore } from '../../store/achievementStore';
import AchievementCard from './AchievementCard';

export default function AchievementList() {
  const { achievements, unlockedCount } = useAchievementStore();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-800">Achievements</h2>
        <span className="text-sm text-gray-600">
          {unlockedCount} / {achievements.length} Unlocked
        </span>
      </div>

      <div className="grid gap-4">
        {achievements.map((achievement) => (
          <AchievementCard
            key={achievement.id}
            achievement={achievement}
          />
        ))}
      </div>
    </div>
  );
}