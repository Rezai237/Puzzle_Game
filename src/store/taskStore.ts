import { create } from 'zustand';
import type { Task, TaskState } from '../types/tasks';
import { useUserStore } from './userStore';
import { useNotificationStore } from './notificationStore';

interface TaskStore extends TaskState {
  initializeTasks: () => void;
  completeTask: (taskId: string) => void;
  resetDailyTasks: () => void;
}

const DAILY_TASKS: Omit<Task, 'completed' | 'icon'>[] = [
  {
    id: 'daily-login',
    title: 'Daily Login',
    description: 'Log in to the game',
    reward: 5,
    type: 'daily',
  },
  {
    id: 'complete-puzzles',
    title: 'Complete 3 Puzzles',
    description: 'Solve any difficulty',
    reward: 15,
    type: 'daily',
    progress: 0,
    total: 3,
  },
  {
    id: 'speed-run',
    title: 'Speed Run',
    description: 'Complete a puzzle under 1 minute',
    reward: 20,
    type: 'daily',
  },
];

const SPECIAL_TASKS: Omit<Task, 'completed' | 'icon'>[] = [
  {
    id: 'watch-ad',
    title: 'Watch Advertisement',
    description: 'Watch a short video to earn tokens',
    reward: 2,
    type: 'special',
  },
  {
    id: 'invite-friends',
    title: 'Invite Friends',
    description: 'Earn 10 tokens instantly + 5% of their earnings',
    reward: 10,
    type: 'special',
  },
  {
    id: 'complete-tutorial',
    title: 'Complete Tutorial',
    description: 'Learn how to play the game',
    reward: 10,
    type: 'special',
  },
  {
    id: 'first-hard-win',
    title: 'Hard Mode Victory',
    description: 'Complete a puzzle on hard difficulty',
    reward: 30,
    type: 'special',
  },
];

export const useTaskStore = create<TaskStore>((set, get) => ({
  tasks: [],
  completedTasks: [],
  lastResetDate: null,

  initializeTasks: () => {
    const lastResetDate = localStorage.getItem('lastTaskResetDate');
    const completedTasks = JSON.parse(localStorage.getItem('completedTasks') || '[]');
    const now = new Date();

    // Check if we need to reset daily tasks
    if (!lastResetDate || !isSameDay(new Date(lastResetDate), now)) {
      set({
        lastResetDate: now.toISOString(),
        completedTasks: completedTasks.filter(taskId => 
          !DAILY_TASKS.some(task => task.id === taskId)
        ),
      });
      localStorage.setItem('lastTaskResetDate', now.toISOString());
    }

    // Initialize tasks with completion status
    const tasks = [...DAILY_TASKS, ...SPECIAL_TASKS].map(task => ({
      ...task,
      completed: completedTasks.includes(task.id),
    }));

    set({ tasks });
  },

  completeTask: (taskId: string) => {
    const { tasks, completedTasks } = get();
    const task = tasks.find(t => t.id === taskId);
    if (!task || task.completed) return;

    const user = useUserStore.getState().user;
    if (!user) return;

    // Update task completion
    const updatedTasks = tasks.map(t =>
      t.id === taskId ? { ...t, completed: true } : t
    );

    const newCompletedTasks = [...completedTasks, taskId];

    // Update state
    set({
      tasks: updatedTasks,
      completedTasks: newCompletedTasks,
    });

    // Save to localStorage
    localStorage.setItem('completedTasks', JSON.stringify(newCompletedTasks));

    // Award tokens
    useUserStore.setState({
      user: {
        ...user,
        tokens: user.tokens + task.reward,
      },
    });

    // Show notification
    useNotificationStore.getState().addNotification({
      type: 'success',
      message: `Earned ${task.reward} tokens!`,
      duration: 3000,
    });
  },

  resetDailyTasks: () => {
    const { tasks, completedTasks } = get();
    const now = new Date();

    const updatedTasks = tasks.map(task =>
      task.type === 'daily' ? { ...task, completed: false } : task
    );

    const updatedCompletedTasks = completedTasks.filter(taskId =>
      !DAILY_TASKS.some(task => task.id === taskId)
    );

    set({
      tasks: updatedTasks,
      completedTasks: updatedCompletedTasks,
      lastResetDate: now.toISOString(),
    });

    localStorage.setItem('lastTaskResetDate', now.toISOString());
    localStorage.setItem('completedTasks', JSON.stringify(updatedCompletedTasks));
  },
}));

function isSameDay(date1: Date, date2: Date): boolean {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
}