import { Request, Response, NextFunction } from 'express';
import { resourceLimits } from 'node:worker_threads';
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

  static async onCreateCategory(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const { user } = req;
    const { type, name, mainCategoryId, sequence } = req.body;

    try {
      const categoryService: CategoryService = Container.get(CategoryService);
      const response = await categoryService.onCreateCategory({
        user,
        type,
        name,
        mainCategoryId,
        sequence,
      });

      res.status(201).json(response);
    } catch (error) {
      next(error);
    }
  }

  static async onDeleteCategory(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const { user } = req;
    const { id } = req.params;
    const { type } = req.body;

    try {
      const categoryService: CategoryService = Container.get(CategoryService);
      await categoryService.onDeleteCategory({ user, type, id });

      res.status(204).json();
    } catch (error) {
      next(error);
    }
  }
}
