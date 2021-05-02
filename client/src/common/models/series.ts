import { Instance, types } from 'mobx-state-tree';
import { createAsyncStore, createAsyncStores } from 'common/mst';

export const Series = types.model({
  id: types.maybe(types.string),
  title: types.maybe(types.string),
});

export type ISeries = Instance<typeof Series>;

export const seriesList = createAsyncStores('seriesList', Series);
export const series = createAsyncStore('series', Series);
