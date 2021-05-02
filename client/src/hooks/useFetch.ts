import { useEffect } from 'react';
import { useStore } from 'stores';

export const useFetch = (): void => {
  // root
  const store = useStore();

  // stores
  const { categoryStore, tagStore, authStore, seriesStore } = store;

  useEffect(() => {
    authStore.onMe();
  }, []);

  useEffect(() => {
    categoryStore.onGetCategorys({});
  }, []);

  useEffect(() => {
    tagStore.onGetTags({});
  }, []);

  useEffect(() => {
    seriesStore.onGetSeriesList({});
  }, []);
};
