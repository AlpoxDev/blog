import { Instance, types } from 'mobx-state-tree';
import { createAsyncStore, createAsyncStores } from 'common/mst';

export const User = types.model({
  id: types.string,
  profile: types.maybe(types.maybeNull(types.string)),
  nickname: types.maybe(types.string),
});

export type IUser = Instance<typeof User>;

export const users = createAsyncStores('users', User);
export const user = createAsyncStore('user', User);
