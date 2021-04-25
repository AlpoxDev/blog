import { Instance, types } from 'mobx-state-tree';
import { createAsyncStore, createAsyncStores } from 'common/mst';

export const MainCategory = types.model({
  id: types.maybe(types.string),
  name: types.maybe(types.string),
  subCategorys: types.array(types.late(() => SubCategory)),
});

export const SubCategory = types.model({
  id: types.maybe(types.string),
  name: types.maybe(types.string),
});

export type IMainCategory = Instance<typeof MainCategory>;
export type ISubCategory = Instance<typeof SubCategory>;

export const mainCategorys = createAsyncStores('mainCategorys', MainCategory);
export const subCategory = createAsyncStore('subCategory', SubCategory);
