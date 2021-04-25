import { Instance, types } from 'mobx-state-tree';
import { createAsyncStore, createAsyncStores } from 'common/mst';

export const User = types.model({
  id: types.maybe(types.string),
  email: types.maybe(types.string),
  profile: types.maybe(types.maybeNull(types.string)),
  nickname: types.maybe(types.string),
  permission: types.maybe(types.string),
  isMarketing: types.maybe(types.boolean),
});

export type IUser = Instance<typeof User>;

export const users = createAsyncStores('users', User);
export const user = createAsyncStore('user', User);
export const me = createAsyncStore('me', User);
