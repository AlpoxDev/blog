import { Instance, types } from 'mobx-state-tree';
import { createAsyncStore } from 'common/mst';

export const Message = types.model({
  message: types.maybe(types.string),
});

export type IMessage = Instance<typeof Message>;

export const message = createAsyncStore('message', Message);
