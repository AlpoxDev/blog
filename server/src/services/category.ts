import { Service } from 'typedi';

import {
  MainCategory,
  Post,
  SubCategory,
  User,
  UserPermission,
} from '../models';
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

  public async onCreateAndUpdateCategorys({
    user,
    categorys,
  }: CategoryServiceProps.onCreateAndUpdateCategorys) {
    try {
      // 기존 assoication 삭제
      await MainCategory.update(
        {
          user: null,
          userId: null,
        },
        {
          where: { userId: user.id },
        }
      );

      await SubCategory.update(
        {
          userId: null,
          user: null,
          mainCategory: null,
          mainCategoryId: null,
        },
        {
          where: { userId: user.id },
        }
      );

      for (const i in categorys) {
        const mainCategory = categorys[i];
        let newMainCategory: MainCategory | undefined;

        if (mainCategory.id) {
          const findMainCategory = await MainCategory.findByPk(mainCategory.id);
          if (!findMainCategory)
            throw {
              status: 404,
              message: '수정하고자 하는 메인카테고리를 찾을 수 없습니다.',
            };

          newMainCategory = await findMainCategory.update({
            user,
            userId: user.id,
            name: mainCategory.name,
            sequence: i,
          });
        } else if (mainCategory.name) {
          newMainCategory = await MainCategory.create({
            user,
            userId: user.id,
            name: mainCategory.name,
            sequence: i,
          });
        } else {
          throw {
            status: 400,
            message: 'BadRequest: id 또는 name 모두 존재하지 않습니다.',
          };
        }

        // 재 생성 및 수정 / 재 연결
        for (const j in mainCategory.subCategorys) {
          const subCategory = mainCategory.subCategorys[j];
          let newSubCategory: SubCategory | undefined;

          if (subCategory.id) {
            const findSubCategory = await SubCategory.findByPk(subCategory.id);
            if (!findSubCategory)
              throw {
                status: 404,
                message: '수정하고자 하는 서브카테고리를 찾을 수 없습니다.',
              };

            newSubCategory = await findSubCategory.update({
              name: subCategory.name,
              sequence: j,
              user,
              userId: user.id,
              mainCategory: newMainCategory,
              mainCategoryId: newMainCategory.id,
            });
          } else if (subCategory.name) {
            newSubCategory = await SubCategory.create({
              name: subCategory.name,
              sequence: j,
              userId: user.id,
              mainCategoryId: newMainCategory.id,
            });
          } else {
            throw {
              status: 400,
              message: 'BadRequest: id 또는 name 모두 존재하지 않습니다.',
            };
          }
        }
      }

      await SubCategory.destroy({
        where: { userId: null },
      });

      await MainCategory.destroy({
        where: { userId: null },
      });
    } catch (error) {
      throw error;
    }
  }
}
