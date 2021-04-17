import { types, Instance } from 'mobx-state-tree';
import { createAsyncStore, createAsyncStores } from 'common/mst';

import { User, SubCategory, Tag } from 'common/models';

export const Post = types.model({
  id: types.string,
  thumbnail: types.maybe(types.string),
  title: types.maybe(types.string),
  subtitle: types.maybe(types.string),
  content: types.maybe(types.string),

  user: types.maybe(types.late(() => User)),
  category: types.maybe(types.late(() => SubCategory)),
  tags: types.optional(types.array(types.late(() => Tag)), []),

  createdAt: types.maybe(types.string),
});

export type IPost = Instance<typeof Post>;

export const posts = createAsyncStores('posts', Post);
export const post = createAsyncStore('post', Post);
