import { useEffect } from 'react';
import { useStore } from 'stores';

export const useFetch = (): void => {
  // root
  const store: any = useStore();

  // stores
  const { categoryStore, tagStore, authStore } = store;

  // store items
  const { me } = authStore;
  const { mainCategorys } = categoryStore;
  const { tags } = tagStore;

  useEffect(() => {
    if (mainCategorys.isReady) return;
    categoryStore.onGetCategorys({});
  }, [mainCategorys.isReady]);

  useEffect(() => {
    if (tags.isReady) return;
    tagStore.onGetTags({});
  }, [tags.isReady]);

  useEffect(() => {
    if (me.isReady) return;
    authStore.onMe();
  }, [me.isReady]);
};
