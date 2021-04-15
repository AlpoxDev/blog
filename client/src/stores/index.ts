import { useMemo } from 'react';
import { types, Instance } from 'mobx-state-tree';
import { useStaticRendering } from 'mobx-react-lite';
import makeInspectable from 'mobx-devtools-mst';

import { PostStore } from './post';

const isServer = typeof window === 'undefined';
let store: IStore | null = null;

useStaticRendering(isServer);

export const Store = types.model({
  postStore: types.optional(PostStore, {}),
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
  const store = useMemo(() => initializeStore(initialState), [initialState]);

  makeInspectable(store);
  return store;
};
