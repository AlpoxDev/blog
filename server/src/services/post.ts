import { Service } from 'typedi';

import {
  Post,
  User,
  UserPermission,
  Series,
  SubCategory,
  Tag,
} from '../models';
import { PostServiceProps } from './post.interface';

@Service()
export class PostService {
  public async onGetPosts({
    user,
    limit,
    offset,
  }: PostServiceProps.onGetPosts) {
    try {
      const { rows: posts, count } = await Post.findAndCountAll({
        where: { userId: user.id },
        limit,
        offset,
        order: [['createdAt', 'DESC']],
        attributes: ['id', 'title', 'subtitle', 'createdAt'],
        include: [
          {
            model: User,
            as: 'user',
          },
          {
            model: SubCategory,
            as: 'category',
          },
          {
            model: Tag,
            as: 'tags',
          },
        ],
      });

      return { posts, count };
    } catch (error) {
      throw error;
    }
  }

  public async onGetPost({ user, id }: PostServiceProps.onGetPost) {
    try {
      const post = await Post.findOne({
        where: { id, userId: user.id },
        include: [
          {
            model: User,
            as: 'user',
          },
          {
            model: Series,
            as: 'series',
          },
          {
            model: SubCategory,
            as: 'category',
          },
          {
            model: Tag,
            as: 'tags',
          },
        ],
      });
      if (!post) throw { status: 404, message: '게시글을 찾을 수 없습니다.' };

      return { post };
    } catch (error) {
      throw error;
    }
  }

  public async onCreatePost({ user }: PostServiceProps.onCreatePost) {
    try {
      const post = await Post.create({});

      return { post };
    } catch (error) {
      throw error;
    }
  }

  public async onDeletePost({ user, id }: PostServiceProps.onDeletePost) {
    try {
      const post = await Post.findByPk(id);
      if (!post) throw { status: 404, message: 'NotFound post' };
      if (user.id !== post.userId && user.permission !== UserPermission.admin)
        throw { status: 401, message: '접근 권한이 없습니다.' };

      await post.destroy();
    } catch (error) {
      throw error;
    }
  }

  public async onUpdatePost({ user, id }: PostServiceProps.onUpdatePost) {
    try {
      const post = await Post.findByPk(id);
      if (!post) throw { status: 404, message: 'NotFound post' };
      if (user.id !== post.userId && user.permission !== UserPermission.admin)
        throw { status: 401, message: '접근 권한이 없습니다.' };

      await post.update({});
    } catch (error) {
      throw error;
    }
  }
}
