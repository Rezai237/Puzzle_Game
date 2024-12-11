import React from 'react';
import { useUserStore } from '../store/userStore';
import { Clock, Award, Gift, Users, ChevronRight, Coins, Trophy, Star } from 'lucide-react';
import { formatTime } from '../utils/gameUtils';
import AchievementList from '../components/achievements/AchievementList';
import LevelProgress from '../components/profile/LevelProgress';
import WalletSection from '../components/profile/WalletSection';

export default function Profile() {
  const user = useUserStore(state => state.user);

  if (!user) return null;

  return (
    <div className="max-w-4xl mx-auto space-y-6 px-4 pb-20">
      {/* User Info Card */}
      <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg shadow-lg p-6 text-white">
        <div className="flex items-center space-x-4">
          <img
            src={user.avatar}
            alt={user.name}
            className="w-20 h-20 rounded-full border-4 border-white/20"
          />
          <div>
            <h1 className="text-2xl font-bold">{user.name}</h1>
            <p className="text-blue-100">ID: {user.id}</p>
          </div>
        </div>
      </div>

      {/* Level Progress */}
      <LevelProgress />

      {/* Wallet Section */}
      <WalletSection />

      {/* Stats Section */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
          <Trophy className="text-yellow-500 mr-2" />
          Game Stats
        </h2>
        <div className="space-y-4">
          {(['easy', 'normal', 'hard'] as const).map(difficulty => (
            <div key={difficulty} className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-medium text-gray-700 capitalize mb-3">{difficulty}</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Award className="text-blue-600 w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Games</p>
                    <p className="font-semibold">{user.stats.gamesPlayed[difficulty]}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <Clock className="text-purple-600 w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Best Time</p>
                    <p className="font-semibold">
                      {user.stats.bestTimes[difficulty]
                        ? formatTime(user.stats.bestTimes[difficulty]!)
                        : '-'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Achievements Section */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <AchievementList />
      </div>
    </div>
  );
}