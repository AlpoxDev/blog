import { Instance, types } from 'mobx-state-tree';
import { createAsyncStore, createAsyncStores } from 'common/mst';

export const Tag = types.model({
  id: types.string,
  name: types.maybe(types.string),
});

export type ITag = Instance<typeof Tag>;

export const tags = createAsyncStores('tags', Tag);
export const tag = createAsyncStore('tag', Tag);
