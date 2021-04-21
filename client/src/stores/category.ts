import { types } from 'mobx-state-tree';

import { mainCategorys, subCategory, empty } from 'common/models';
import { CategoryRepository } from 'repository';

export const CategoryStore = types
  .model('CategoryStore', {
    mainCategorys,
    subCategory,
    createCategory: empty,
    deleteCategory: empty,
    updateCategory: empty,
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
    onCreateCategory: (props) =>
      self.createCategory.onCreate(() => CategoryRepository.onCreateCategory(props), {
        dataKey: 'category',
      }),
    onDeleteCategory: (props) => self.deleteCategory.onDelete(() => CategoryRepository.onDeleteCategory(props)),
    onUpdateCategory: (props) => self.updateCategory.onUpdate(() => CategoryRepository.onUpdateCategory(props)),
  }));
