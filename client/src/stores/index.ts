import { useMemo } from 'react';
import { types, Instance } from 'mobx-state-tree';
import { useStaticRendering } from 'mobx-react-lite';

import { AuthStore } from './auth';
import { PostStore } from './post';
import { CategoryStore } from './category';
import { TagStore } from './tag';
import { SeriesStore } from './series';
import { UIStore } from './ui';

const isServer = typeof window === 'undefined';
let store: IStore | null = null;

useStaticRendering(isServer);

export const Store = types.model({
  authStore: types.optional(AuthStore, {}),
  postStore: types.optional(PostStore, {}),
  categoryStore: types.optional(CategoryStore, {}),
  tagStore: types.optional(TagStore, {}),
  seriesStore: types.optional(SeriesStore, {}),
  uiStore: types.optional(UIStore, {}),
});

export type IStore = Instance<typeof Store>;
export interface MSTProps {
  store: IStore;
}

export const initializeStore = (initialState?: any): IStore => {
  if (isServer) {
    return Store.create(initialState);
  } else if (store !== null) {
    return store;
  } else {
    return (store = Store.create(initialState));
  }
};

export const useStore = (initialState?: any) => {
  return useMemo(() => initializeStore(initialState), [initialState]);
};
