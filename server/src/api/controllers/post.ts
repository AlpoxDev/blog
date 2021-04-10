import { Request, Response, NextFunction } from 'express';
import { Container } from 'typedi';
import { PostService } from '../../services';

export class PostController {
  static async onGetPosts(req: Request, res: Response, next: NextFunction) {
    const limit = req.limit;
    const offset = req.offset;

    try {
      const postService: PostService = Container.get(PostService);
      const response = await postService.onGetPosts({ limit, offset });
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }

  static async onGetPost(req: Request, res: Response, next: NextFunction) {
    const id = req.params?.id;

    try {
      const postService: PostService = Container.get(PostService);
      const response = await postService.onGetPost({ id });
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }
}
