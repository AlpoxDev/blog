import { Instance, types } from 'mobx-state-tree';
import { createAsyncStore, createAsyncStores } from 'common/mst';

export const MainCategory = types.model({});

export const SubCategory = types.model({
  id: types.string,
  name: types.maybe(types.string),
  sequence: types.maybe(types.number),
});

export type IMainCategory = Instance<typeof MainCategory>;
export type ISubCategory = Instance<typeof SubCategory>;

export const mainCategorys = createAsyncStores('mainCategorys', MainCategory);
export const subCategory = createAsyncStore('subCategory', SubCategory);
