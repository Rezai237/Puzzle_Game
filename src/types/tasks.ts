import { ReactNode } from 'react';

export interface Task {
  id: string;
  title: string;
  description: string;
  reward: number;
  icon: ReactNode;
  completed?: boolean;
  progress?: number;
  total?: number;
  type: 'daily' | 'special' | 'achievement';
}

export interface TaskState {
  tasks: Task[];
  completedTasks: string[];
  lastResetDate: string | null;
}