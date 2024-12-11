import React from 'react';

interface Props {
  activeTab: 'weekly' | 'allTime';
  setActiveTab: (tab: 'weekly' | 'allTime') => void;
}

export default function LeaderboardHeader({ activeTab, setActiveTab }: Props) {
  return (
    <div className="p-4">
      <div className="grid grid-cols-2 gap-2 bg-gray-100 p-1 rounded-lg">
        <button
          onClick={() => setActiveTab('weekly')}
          className={`py-2.5 px-4 rounded-md text-sm font-medium transition-all
            ${activeTab === 'weekly'
              ? 'bg-white text-blue-600 shadow'
              : 'text-gray-600 hover:bg-gray-50'
            }`}
        >
          Weekly
        </button>
        <button
          onClick={() => setActiveTab('allTime')}
          className={`py-2.5 px-4 rounded-md text-sm font-medium transition-all
            ${activeTab === 'allTime'
              ? 'bg-white text-blue-600 shadow'
              : 'text-gray-600 hover:bg-gray-50'
            }`}
        >
          All Time
        </button>
      </div>
    </div>
  );
}