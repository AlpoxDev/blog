import {} from 'react';
import { useStore } from 'stores';

export const useUser = () => {
  const { authStore } = useStore();
  const { me } = authStore;

  if (me.isReady) return me.data;
  else return null;
};
