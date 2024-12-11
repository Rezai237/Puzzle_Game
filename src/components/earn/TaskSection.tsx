import React from 'react';
import TaskCard from './TaskCard';
import type { Task } from '../../types/tasks';

interface Props {
  title: string;
  description: string;
  tasks: Task[];
  onComplete: (taskId: string) => void;
}

export default function TaskSection({ title, description, tasks, onComplete }: Props) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-4 border-b">
        <h2 className="text-lg font-bold text-gray-800">{title}</h2>
        <p className="text-sm text-gray-600">{description}</p>
      </div>
      <div className="divide-y">
        {tasks.map(task => (
          <TaskCard
            key={task.id}
            task={task}
            onComplete={onComplete}
          />
        ))}
      </div>
    </div>
  );
}