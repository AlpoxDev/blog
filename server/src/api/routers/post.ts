import { Router } from 'express';
import { PostController } from '../controllers';

export const postRouter = Router();
postRouter.get('/posts', PostController.onGetPosts);
postRouter.get('/posts/:id', PostController.onGetPost);
