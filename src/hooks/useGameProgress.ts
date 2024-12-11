import { useEffect, useState } from 'react';
import { useUserStore } from '../store/userStore';
import { calculateTotalProgress } from '../utils/analytics';

export function useGameProgress() {
  const user = useUserStore(state => state.user);
  const [progress, setProgress] = useState({
    level: 1,
    progress: 0,
    totalTokens: 0,
    nextLevelTokens: 10,
  });

  useEffect(() => {
    if (user) {
      setProgress(calculateTotalProgress(user));
    }
  }, [user?.tokens, user?.referralTokens]);

  return progress;
}