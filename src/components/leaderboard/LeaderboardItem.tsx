import React from 'react';
import { Trophy, Clock, Medal } from 'lucide-react';
import { LeaderboardEntry } from '../../types/game';
import { formatTime } from '../../utils/gameUtils';

interface Props {
  player: LeaderboardEntry;
  index: number;
  isCurrentUser: boolean;
  activeTab: 'weekly' | 'allTime';
}

export default function LeaderboardItem({ player, index, isCurrentUser, activeTab }: Props) {
  return (
    <div
      className={`flex items-center justify-between p-3 ${
        isCurrentUser ? 'bg-blue-50' : ''
      }`}
    >
      <div className="flex items-center space-x-2">
        <div className="w-8 flex justify-center">
          {index < 3 ? (
            <Medal
              size={20}
              className={
                index === 0
                  ? 'text-yellow-500'
                  : index === 1
                  ? 'text-gray-400'
                  : 'text-amber-700'
              }
            />
          ) : (
            <span className="font-bold text-gray-600 text-sm w-6 text-center">
              {index + 1}
            </span>
          )}
        </div>
        <div className="flex items-center space-x-2">
          <img
            src={player.avatar}
            alt={player.name}
            className="w-8 h-8 rounded-full"
          />
          <div>
            <span className="font-medium text-sm">{player.name}</span>
            <div className="text-xs text-gray-500 capitalize">
              {player.difficulty}
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-end space-y-0.5">
        <div className="flex items-center space-x-1">
          <Trophy className="text-yellow-500" size={12} />
          <span className="text-sm font-medium">
            {activeTab === 'weekly' ? player.weeklyScore : player.score}
          </span>
        </div>
        <div className="flex items-center space-x-1">
          <Clock className="text-blue-500" size={12} />
          <span className="text-xs text-gray-600">
            {formatTime(player.bestTime)}
          </span>
        </div>
      </div>
    </div>
  );
}