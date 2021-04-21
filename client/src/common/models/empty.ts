import { types } from 'mobx-state-tree';
import { createAsyncStore, createAsyncStores } from 'common/mst';

export const EmptyModel = types.model();

export type IEmpty = typeof EmptyModel;

export const empty = createAsyncStore('empty', EmptyModel);
export const emptys = createAsyncStores('empty', EmptyModel);
