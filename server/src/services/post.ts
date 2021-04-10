import { Service } from 'typedi';

import { Post } from '../models';
import { PostServiceProps } from './post.interface';

@Service()
export class PostService {
  public async onGetPosts({ limit, offset }: PostServiceProps.onGetPosts) {
    try {
      const { rows, count } = await Post.findAndCountAll({
        limit,
        offset,
      });

      return { posts: rows, count };
    } catch (error) {
      throw error;
    }
  }

  public async onGetPost({ id }: PostServiceProps.onGetPost) {
    try {
      const post = await Post.findByPk(id);
      if (!post) throw { status: 404, message: '게시글을 찾을 수 없습니다.' };

      return { post };
    } catch (error) {
      throw error;
    }
  }
}
