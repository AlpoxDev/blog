import { Request, Response, NextFunction } from 'express';
import { Container } from 'typedi';

import { TagService } from '../../services';

export class TagController {
  static async onGetTags(req: Request, res: Response, next: NextFunction) {
    const { user, limit, offset } = req;
    try {
      const tagService = Container.get(TagService);
      const response = await tagService.onGetTags({ user, limit, offset });

      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }

  static async onGetTag(req: Request, res: Response, next: NextFunction) {
    const { user, limit, offset } = req;
    const { id } = req.params;

    try {
      const tagService = Container.get(TagService);
      const response = await tagService.onGetTag({ user, id, limit, offset });

      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }

  static async onCreateTag(req: Request, res: Response, next: NextFunction) {
    const { user } = req;
    const { name } = req.body;

    try {
      const tagService = Container.get(TagService);
      const response = await tagService.onCreateTag({ user, name });

      res.status(201).json(response);
    } catch (error) {
      next(error);
    }
  }

  static async onDeleteTag(req: Request, res: Response, next: NextFunction) {
    const { user } = req;
    const { id } = req.params;

    try {
      const tagService = Container.get(TagService);
      await tagService.onDeleteTag({ user, id });

      res.status(204).json();
    } catch (error) {
      next(error);
    }
  }

  static async onUpdateTag(req: Request, res: Response, next: NextFunction) {
    const { user } = req;
    const { id } = req.params;
    const { name } = req.body;

    try {
      const tagService = Container.get(TagService);
      await tagService.onUpdateTag({ user, id, name });

      res.status(204).json();
    } catch (error) {
      next(error);
    }
  }
}
