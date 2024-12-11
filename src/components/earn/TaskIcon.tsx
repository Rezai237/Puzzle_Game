import React from 'react';
import { Video, Users, Target, Zap, Star, Trophy, Clock } from 'lucide-react';

interface Props {
  taskId: string;
  className?: string;
}

export default function TaskIcon({ taskId, className = '' }: Props) {
  const icons: Record<string, React.ReactNode> = {
    'watch-ad': <Video className={className} />,
    'invite-friends': <Users className={className} />,
    'complete-tutorial': <Target className={className} />,
    'first-hard-win': <Zap className={className} />,
    'daily-login': <Star className={className} />,
    'complete-puzzles': <Trophy className={className} />,
    'speed-run': <Clock className={className} />,
  };

  return <>{icons[taskId] || <Star className={className} />}</>;
}