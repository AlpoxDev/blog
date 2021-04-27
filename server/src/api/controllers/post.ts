import { Request, Response, NextFunction } from 'express';
import { Container } from 'typedi';
import { PostService } from '../../services';

export class PostController {
  static async onGetPosts(req: Request, res: Response, next: NextFunction) {
    const { user, limit, offset } = req;

    try {
      const postService: PostService = Container.get(PostService);
      const response = await postService.onGetPosts({ user, limit, offset });
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }

  static async onGetPost(req: Request, res: Response, next: NextFunction) {
    const { user } = req;
    const { id } = req.params;

    try {
      const postService: PostService = Container.get(PostService);
      const response = await postService.onGetPost({ user, id });
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }

  static async onCreatePost(req: Request, res: Response, next: NextFunction) {
    const { user } = req;

    try {
      const postService: PostService = Container.get(PostService);
      const response = await postService.onCreatePost({ user, ...req.body });

      res.status(201).json(response);
    } catch (error) {
      next(error);
    }
  }

  static async onDeletePost(req: Request, res: Response, next: NextFunction) {
    const { user } = req;
    const { id } = req.params;

    try {
      const postService: PostService = Container.get(PostService);
      await postService.onDeletePost({ user, id });

      res.status(204).json();
    } catch (error) {
      next(error);
    }
  }

  static async onUpdatePost(req: Request, res: Response, next: NextFunction) {
    const { user } = req;
    const { id } = req.params;

    try {
      const postService: PostService = Container.get(PostService);
      await postService.onUpdatePost({ user, id, ...req.body });

      res.status(204).json();
    } catch (error) {
      next(error);
    }
  }

  static async onConnectCategory(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const { user } = req;
    const { id } = req.params;

    try {
      const postService: PostService = Container.get(PostService);
      await postService.onConnectCategory({ user, postId: id, ...req.body });

      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }

  static async onConnectSeries(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const { user } = req;
    const { id } = req.params;

    try {
      const postService: PostService = Container.get(PostService);
      await postService.onConnectSeries({ user, postId: id, ...req.body });

      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }

  static async onConnectTags(req: Request, res: Response, next: NextFunction) {
    const { user } = req;
    const { id } = req.params;

    try {
      const postService: PostService = Container.get(PostService);
      await postService.onConnectTags({ user, postId: id, ...req.body });

      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
}
