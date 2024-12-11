import React, { useEffect } from 'react';
import { Gift, Users, ChevronRight, Trophy } from 'lucide-react';
import { useUserStore } from '../store/userStore';
import { useTaskStore } from '../store/taskStore';
import { useGameProgress } from '../hooks/useGameProgress';
import ReferralCard from '../components/referral/ReferralCard';
import TaskSection from '../components/earn/TaskSection';

export default function EarnTokens() {
  const user = useUserStore(state => state.user);
  const { level } = useGameProgress();
  const { tasks, initializeTasks, completeTask } = useTaskStore();

  useEffect(() => {
    initializeTasks();
  }, []);

  const dailyTasks = tasks.filter(task => task.type === 'daily');
  const specialTasks = tasks.filter(task => task.type === 'special');

  return (
    <div className="max-w-4xl mx-auto space-y-6 px-4 pb-20">
      {/* Token Summary */}
      <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg p-6 text-white">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-2xl font-bold">Earn Tokens</h2>
            <p className="text-blue-100">Complete tasks to earn more!</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-blue-100">Current Balance</p>
            <p className="text-2xl font-bold">{user?.tokens || 0}</p>
          </div>
        </div>
        <div className="bg-white/10 rounded-lg p-3 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Trophy className="text-yellow-300" size={20} />
            <span>Level {level}</span>
          </div>
          <ChevronRight className="text-blue-200" size={20} />
        </div>
      </div>

      {/* Daily Tasks */}
      <TaskSection
        title="Daily Tasks"
        description="Reset every day at midnight"
        tasks={dailyTasks}
        onComplete={completeTask}
      />

      {/* Special Tasks */}
      <TaskSection
        title="Special Tasks"
        description="Complete these tasks for bonus rewards"
        tasks={specialTasks}
        onComplete={completeTask}
      />

      {/* Referral System */}
      <ReferralCard />
    </div>
  );
}