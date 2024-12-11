import React from 'react';
import { Users, ArrowUp } from 'lucide-react';

interface Props {
  rank: number;
}

export default function UserRankCard({ rank }: Props) {
  return (
    <div className="bg-blue-50 rounded-lg p-3 mx-3 flex items-center justify-between">
      <div className="flex items-center space-x-2">
        <div className="p-1.5 bg-blue-100 rounded-lg">
          <Users className="text-blue-600" size={16} />
        </div>
        <div>
          <p className="text-xs text-blue-600">Your Position</p>
          <p className="font-bold text-blue-800 text-base">#{rank}</p>
        </div>
      </div>
      <div className="flex items-center text-green-600">
        <ArrowUp size={14} className="mr-1" />
        <span className="text-xs font-medium">Moving Up</span>
      </div>
    </div>
  );
}