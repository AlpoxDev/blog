import { types, Instance } from 'mobx-state-tree';
import { User } from 'common/models';
import { createAsyncStore } from 'common/mst';

export const Me = types.model({
  user: types.maybe(types.late(() => User)),
});

export type IMe = Instance<typeof Me>;

export const me = createAsyncStore('me', Me);
