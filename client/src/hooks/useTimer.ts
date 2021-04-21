import { useEffect, useState } from 'react';

export const useTimer = (time = 5): boolean => {
  const [count, setCount] = useState<number | null>(time);

  useEffect(() => {
    if (count) setTimeout(() => setCount((count) => count - 1), 1000);
  }, [count]);

  if (count <= 0) return true;
  return false;
};
