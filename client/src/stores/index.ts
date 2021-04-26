import { useMemo } from 'react';
import { types, Instance, applySnapshot } from 'mobx-state-tree';
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

export const initializeStore = (isServer = true, snapShot = null): IStore => {
  if (isServer) {
    store = Store.create({});
  }
  if (store === null) {
    store = Store.create({});
  }
  if (snapShot) {
    applySnapshot(store, snapShot);
  }

  return store;
};

export const useStore = (snapShot = null): IStore => {
  return useMemo(() => initializeStore(false, snapShot), [snapShot]);
};

export const deleteUndefined = (obj: Record<string, any> | undefined): Record<string, any> => {
  if (process.env.NODE_ENV === 'production') return obj;
  if (obj) return JSON.parse(JSON.stringify(obj));

  return null;
};
