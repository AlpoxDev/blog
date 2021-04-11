import { Request, Response, NextFunction } from 'express';
import { Container } from 'typedi';

import { SeriesService } from '../../services';

export class SeriesController {
  static async onGetSeriesList(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const { user, limit, offset } = req;

    try {
      const seriesService = Container.get(SeriesService);
      const response = await seriesService.onGetSeriesList({
        user,
        limit,
        offset,
      });

      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }

  static async onGetSeries(req: Request, res: Response, next: NextFunction) {
    const { user } = req;
    const { id } = user;

    try {
      const seriesService = Container.get(SeriesService);
      const response = await seriesService.onGetSeries({ user, id });

      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }

  static async onCreateSeries(req: Request, res: Response, next: NextFunction) {
    const { user } = req;
    try {
      const seriesService = Container.get(SeriesService);
      const response = await seriesService.onCreateSeries({
        user,
        ...req.body,
      });

      res.status(201).json(response);
    } catch (error) {
      next(error);
    }
  }

  static async onDeleteSeries(req: Request, res: Response, next: NextFunction) {
    const { user } = req;
    const { id } = req.params;

    try {
      const seriesService = Container.get(SeriesService);
      await seriesService.onDeleteSeries({ user, id });

      res.status(204).json();
    } catch (error) {
      next(error);
    }
  }

  static async onUpdateSeries(req: Request, res: Response, next: NextFunction) {
    const { user } = req;
    const { id } = req.params;

    try {
      const seriesService = Container.get(SeriesService);
      await seriesService.onUpdateSeries({ user, id, ...req.body });

      res.status(204).json();
    } catch (error) {
      next(error);
    }
  }
}
