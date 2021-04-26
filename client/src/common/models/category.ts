import { Instance, types } from 'mobx-state-tree';
import { createAsyncStore, createAsyncStores } from 'common/mst';
import { Post } from 'common/models';

export const MainCategory = types.model({
  id: types.maybe(types.string),
  name: types.maybe(types.string),
  subCategorys: types.array(types.late(() => SubCategory)),
});

export const SubCategory = types.model({
  id: types.maybe(types.string),
  name: types.maybe(types.string),
  posts: types.array(types.late(() => Post)),
});

export type IMainCategory = Instance<typeof MainCategory> & { toJSON: any };
export type ISubCategory = Instance<typeof SubCategory> & { toJSON: any };

export const mainCategorys = createAsyncStores('mainCategorys', MainCategory);
export const subCategory = createAsyncStore('subCategory', SubCategory);
