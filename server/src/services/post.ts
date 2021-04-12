import { Service } from 'typedi';
import { Op } from 'sequelize';

import {
  Post,
  User,
  UserPermission,
  Series,
  SubCategory,
  Tag,
  PostTag,
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
            attributes: ['id', 'name'],
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
            attributes: ['id', 'name'],
          },
        ],
      });
      if (!post) throw { status: 404, message: '게시글을 찾을 수 없습니다.' };

      return { post };
    } catch (error) {
      throw error;
    }
  }

  public async onCreatePost({
    user,
    title,
    subtitle,
    content,
    category,
    series,
    tags,
  }: PostServiceProps.onCreatePost) {
    try {
      const findCategory = await SubCategory.find(category);
      if (!findCategory)
        throw { status: 404, message: '서브 카테고리를 찾을 수 없습니다.' };

      let findSeries: Series | null = null;
      if (series) findSeries = await Series.find(series);

      const post = await Post.create({
        title,
        subtitle,
        content,
        user,
        userId: user.id,

        category: findCategory,
        categoryId: findCategory.id,
        series: findSeries,
        seriesId: findSeries?.id || null,
      });

      const findTags: Tag[] = await Tag.findOrCreateList(user, tags);
      const relations = findTags.map((tag: Tag) => ({
        postId: post.id,
        tagId: tag.id,
      }));
      await PostTag.setPostTagRelations(relations);

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

  public async onUpdatePost({
    user,
    id,
    title,
    subtitle,
    content,
    category,
    series,
    tags,
  }: PostServiceProps.onUpdatePost) {
    try {
      const post = await Post.findByPk(id);
      if (!post) throw { status: 404, message: 'NotFound post' };
      if (user.id !== post.userId && user.permission !== UserPermission.admin)
        throw { status: 401, message: '접근 권한이 없습니다.' };

      const findCategory = await SubCategory.find(category);
      if (!findCategory)
        throw { status: 404, message: '서브 카테고리를 찾을 수 없습니다.' };

      let findSeries: Series | null = null;
      if (series) findSeries = await Series.find(series);

      await post.update({
        title,
        subtitle,
        content,
        category: findCategory,
        categoryId: findCategory.id,
        series: findSeries,
        seriesId: findSeries?.id || null,
      });

      const findTags: Tag[] = await Tag.findOrCreateList(user, tags);
      const relations = findTags.map((tag: Tag) => ({
        postId: post.id,
        tagId: tag.id,
      }));

      await PostTag.resetPostTagRelations(post.id);
      await PostTag.setPostTagRelations(relations);
    } catch (error) {
      throw error;
    }
  }
}
