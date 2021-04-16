import { useEffect } from 'react';
import { useStore } from 'stores';

export const useFetch = () => {
  // root
  const store: any = useStore();

  // stores
  const { categoryStore, tagStore } = store;

  // store items
  const { mainCategorys } = categoryStore;
  const { tags } = tagStore;

  Object.entries(store.toJSON()).map(([key, value]: [string, any]) => {
    console.log(key, value);
  });

  useEffect(() => {
    if (mainCategorys.isReady) return;
    categoryStore.onGetCategorys({});
  }, [mainCategorys.isReady]);

  useEffect(() => {
    if (tags.isReady) return;
    tagStore.onGetTags({});
  }, [tags.isReady]);
};
