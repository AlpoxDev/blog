import { types, Instance } from 'mobx-state-tree';
import { createAsyncStore, createAsyncStores } from 'common/mst';

import { User, SubCategory, Tag } from 'common/models';
import { Series } from './series';

export const Post = types.model({
  id: types.string,
  thumbnail: types.maybe(types.maybeNull(types.string)),
  title: types.maybe(types.string),
  subtitle: types.maybe(types.string),
  content: types.maybe(types.string),

  user: types.maybe(types.late(() => User)),
  category: types.maybe(types.late(() => SubCategory)),
  series: types.maybeNull(types.maybe(types.late(() => Series))),
  tags: types.optional(types.array(types.late(() => Tag)), []),

  createdAt: types.maybe(types.string),
});

export type IPost = Instance<typeof Post>;

export const posts = createAsyncStores('posts', Post);
export const post = createAsyncStore('post', Post);
export const createPost = createAsyncStore('createPost', Post);
