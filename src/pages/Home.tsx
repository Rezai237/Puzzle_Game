import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Play, Book, Gift, Trophy, ArrowRight } from 'lucide-react';
import TutorialModal from '../components/home/TutorialModal';
import DailyRewardsModal from '../components/rewards/DailyRewardsModal';
import { useUserStore } from '../store/userStore';
import { useRewardsStore } from '../store/rewardsStore';

export default function Home() {
  const [showTutorial, setShowTutorial] = React.useState(false);
  const [showRewards, setShowRewards] = React.useState(false);
  const navigate = useNavigate();
  const user = useUserStore((state) => state.user);
  const { initializeRewards, canClaimDaily } = useRewardsStore();

  React.useEffect(() => {
    initializeRewards();
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Welcome Section */}
        <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg p-6 text-white">
          <h1 className="text-2xl font-bold mb-2">Welcome back!</h1>
          <p className="text-blue-100 mb-4">Ready for today's puzzle challenge?</p>
          <button
            onClick={() => navigate('/game')}
            className="bg-white text-blue-600 px-6 py-3 rounded-lg font-medium 
              hover:bg-blue-50 transition-colors w-full flex items-center justify-center space-x-2"
          >
            <Play size={20} />
            <span>Play Now</span>
          </button>
        </div>

        {/* Quick Stats */}
        <div className="bg-white rounded-lg p-6 shadow-md">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold text-gray-800">Your Stats</h2>
            <button
              onClick={() => navigate('/profile')}
              className="text-blue-600 text-sm flex items-center"
            >
              View All <ArrowRight size={16} className="ml-1" />
            </button>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <Trophy className="text-yellow-500 mb-2" />
              <p className="text-sm text-gray-600">Best Time</p>
              <p className="font-bold">
                {user?.stats.bestTimes.normal ? 
                  `${Math.floor(user.stats.bestTimes.normal / 1000)}s` : 
                  '-'}
              </p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <Gift className="text-purple-500 mb-2" />
              <p className="text-sm text-gray-600">Tokens</p>
              <p className="font-bold">{user?.tokens || 0}</p>
            </div>
          </div>
        </div>

        {/* Daily Rewards Button */}
        <button
          onClick={() => setShowRewards(true)}
          className="col-span-full bg-white p-4 rounded-lg shadow-md hover:bg-gray-50
            flex items-center justify-between"
        >
          <div className="flex items-center space-x-3">
            <div className={`p-2 rounded-lg ${
              canClaimDaily() ? 'bg-green-100' : 'bg-gray-100'
            }`}>
              <Gift className={canClaimDaily() ? 'text-green-600' : 'text-gray-600'} />
            </div>
            <div className="text-left">
              <h3 className="font-medium">Daily Rewards</h3>
              <p className="text-sm text-gray-600">
                {canClaimDaily() ? 'Claim your daily reward!' : 'Come back tomorrow'}
              </p>
            </div>
          </div>
          <ArrowRight className="text-gray-400" />
        </button>

        {/* Tutorial Button */}
        <button
          onClick={() => setShowTutorial(true)}
          className="col-span-full bg-white p-4 rounded-lg shadow-md hover:bg-gray-50
            flex items-center justify-between"
        >
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Book className="text-blue-600" />
            </div>
            <div className="text-left">
              <h3 className="font-medium">How to Play</h3>
              <p className="text-sm text-gray-600">Learn game rules and earn tokens</p>
            </div>
          </div>
          <ArrowRight className="text-gray-400" />
        </button>
      </div>

      <TutorialModal 
        isOpen={showTutorial} 
        onClose={() => setShowTutorial(false)} 
      />
      
      <DailyRewardsModal
        isOpen={showRewards}
        onClose={() => setShowRewards(false)}
      />
    </div>
  );
}