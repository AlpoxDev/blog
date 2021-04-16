import { types } from 'mobx-state-tree';

import { mainCategorys, subCategory } from 'common/models';
import { CategoryRepository } from 'repository';

export const CategoryStore = types
  .model('CategoryStore', {
    mainCategorys,
    subCategory,
  })
  .actions((self) => ({
    onGetCategorys: (props) =>
      self.mainCategorys.onGetAll(() => CategoryRepository.onGetCategorys(props), {
        dataKey: 'categorys',
      }),
    onGetCategory: (props) =>
      self.subCategory.onGetOne(() => CategoryRepository.onGetCategory(props), {
        dataKey: 'category',
      }),
  }));
