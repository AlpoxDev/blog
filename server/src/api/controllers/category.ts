import { Request, Response, NextFunction } from 'express';
import { networkInterfaces } from 'node:os';
import { Container } from 'typedi';

import { CategoryService } from '../../services';

export class CategoryController {
  static async onGetCategorys(req: Request, res: Response, next: NextFunction) {
    const { user, limit, offset } = req;

    try {
      const categoryService: CategoryService = Container.get(CategoryService);
      const response = await categoryService.onGetCategorys({
        user,
        limit,
        offset,
      });

      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }

  static async onGetCategory(req: Request, res: Response, next: NextFunction) {
    const { user, limit, offset } = req;
    const { id } = req.params;

    try {
      const categoryService: CategoryService = Container.get(CategoryService);
      const response = await categoryService.onGetCategory({
        id,
        user,
        limit,
        offset,
      });

      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }

  static async onCreateAndUpdateCategorys(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const { user } = req;
    const { categorys } = req.body;

    try {
      const categoryService: CategoryService = Container.get(CategoryService);
      await categoryService.onCreateAndUpdateCategorys({ user, categorys });

      res.status(204).json();
    } catch (error) {
      next(error);
    }
  }
}
