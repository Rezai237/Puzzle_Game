import React, { useEffect, useState } from 'react';
import { useLeaderboardStore } from '../store/leaderboardStore';
import { useUserStore } from '../store/userStore';
import LeaderboardHeader from '../components/leaderboard/LeaderboardHeader';
import UserRankCard from '../components/leaderboard/UserRankCard';
import LeaderboardItem from '../components/leaderboard/LeaderboardItem';

export default function TopPlayers() {
  const { data, isLoading, fetchLeaderboard } = useLeaderboardStore();
  const user = useUserStore(state => state.user);
  const [activeTab, setActiveTab] = useState<'allTime' | 'weekly'>('weekly');

  useEffect(() => {
    fetchLeaderboard();
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-8 w-8 border-3 border-blue-600 border-t-transparent"></div>
      </div>
    );
  }

  const currentList = activeTab === 'allTime' ? data.allTime : data.weekly;
  const userRank = data.userRank?.[activeTab];

  return (
    <div className="max-w-lg mx-auto pb-20">
      <div className="bg-white rounded-lg shadow-md divide-y">
        <LeaderboardHeader activeTab={activeTab} setActiveTab={setActiveTab} />
        
        {userRank && (
          <div className="py-3">
            <UserRankCard rank={userRank} />
          </div>
        )}
        
        <div className="divide-y">
          {currentList.map((player, index) => (
            <LeaderboardItem
              key={player.id}
              player={player}
              index={index}
              isCurrentUser={player.id === user?.id}
              activeTab={activeTab}
            />
          ))}
        </div>
      </div>
    </div>
  );
}