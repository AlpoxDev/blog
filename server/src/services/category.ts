import { Service } from 'typedi';

import { MainCategory, Post, SubCategory, UserPermission } from '../models';
import { CategoryServiceProps } from './category.interface';

@Service()
export class CategoryService {
  public async onGetCategorys({
    user,
    limit,
    offset,
  }: CategoryServiceProps.onGetCategories) {
    try {
      const { rows: categorys, count } = await MainCategory.findAndCountAll({
        where: { userId: user.id },
        limit,
        offset,
        include: {
          model: SubCategory,
          as: 'subCategorys',
          separate: true,
          order: [['sequence', 'ASC']],
        },
        order: [['sequence', 'ASC']],
      });

      return { categorys, count };
    } catch (error) {
      throw error;
    }
  }

  public async onGetCategory({
    user,
    id,
    limit,
    offset,
  }: CategoryServiceProps.onGetCategory) {
    try {
      const category = await SubCategory.findOne({
        where: {
          id,
          userId: user.id,
        },
      });

      if (!category) throw { status: 404, message: 'NotFound sub-category' };

      const { rows: posts, count } = await Post.findAndCountAll({
        where: { categoryId: category.id },
        limit,
        offset,
      });
      return { category: { ...category.toJSON(), posts }, count };
    } catch (error) {
      throw error;
    }
  }

  public async onCreateCategory({
    user,
    type,
    name,
    mainCategoryId,
    sequence,
  }: CategoryServiceProps.onCreateCategory) {
    try {
      if (type === 'main') {
        const findMainCategory = await MainCategory.findOne({
          where: { userId: user.id, name },
        });
        if (findMainCategory)
          throw {
            status: 400,
            message: '생성하고자 하는 메인 카테고리가 이미 존재합니다.',
          };

        const mainCategory = await MainCategory.create({
          userId: user.id,
          user,
          name,
          sequence,
        });

        return { category: mainCategory };
      }
      if (type === 'sub') {
        if (!mainCategoryId)
          throw { status: 400, message: '메인카테고리 아이디가 없습니다.' };

        const findSubCategory = await SubCategory.findOne({
          where: { userId: user.id, name, mainCategoryId },
        });
        if (findSubCategory)
          throw {
            status: 400,
            message: '생성하고자 하는 서브 카테고리가 이미 존재합니다.',
          };

        const findMainCategory = await MainCategory.findOne({
          where: { id: mainCategoryId, userId: user.id },
        });
        if (!findMainCategory)
          throw {
            status: 404,
            message: '추가할 메인 카테고리가 존재하지 않습니다.',
          };

        const subCategory = await SubCategory.create({
          name,
          user,
          userId: user.id,
          mainCategoryId: findMainCategory.id,
          sequence,
        });

        return { category: subCategory };
      }
    } catch (error) {
      throw error;
    }
  }

  public async onDeleteCategory({
    user,
    type,
    id,
  }: CategoryServiceProps.onDeleteCategory) {
    try {
      if (type === 'main') {
        const findMainCategory = await MainCategory.findOne({
          where: { id, userId: user.id },
        });
        if (!findMainCategory)
          throw {
            status: 404,
            message: '삭제하고자 하는 메인 카테고리가 존재하지 않습니다.',
          };

        if (
          findMainCategory.userId === user.id ||
          user.permission === UserPermission.admin
        ) {
          await findMainCategory.destroy();
        } else {
          throw {
            status: 401,
            message: 'Invalid Permission: onDeleteCategory',
          };
        }
      }

      if (type === 'sub') {
        const findSubCategory = await SubCategory.findOne({
          where: { id, userId: user.id },
        });
        if (!findSubCategory)
          throw {
            status: 404,
            message: '삭제하고자 하는 서브 카테고리가 존재하지 않습니다.',
          };

        if (
          findSubCategory.userId === user.id ||
          user.permission === UserPermission.admin
        ) {
          await findSubCategory.destroy();
        } else {
          throw {
            status: 401,
            message: 'Invalid Permission: onDeleteCategory',
          };
        }
      }
    } catch (error) {
      throw error;
    }
  }
}
