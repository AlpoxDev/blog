import { Service } from 'typedi';

import { Post, Series, UserPermission } from '../models';
import { SeriesServiceProps } from './series.interface';

@Service()
export class SeriesService {
  public async onGetSeriesList({
    user,
    limit,
    offset,
  }: SeriesServiceProps.onGetSeriesList) {
    try {
      const { rows: seriesList, count } = await Series.findAndCountAll({
        where: { userId: user.id },
        limit,
        offset,
      });

      return { seriesList, count };
    } catch (error) {
      throw error;
    }
  }

  public async onGetSeries({ user, id }: SeriesServiceProps.onGetSeries) {
    try {
      const series = await Series.findOne({
        where: {
          id,
          userId: user.id,
        },
      });
      if (!series) throw { status: 404, message: 'NotFound series' };

      return { series };
    } catch (error) {
      throw error;
    }
  }

  public async onCreateSeries({
    user,
    title,
    content,
    posts,
  }: SeriesServiceProps.onCreateSeries) {
    try {
      const series = await Series.create({
        user,
        userId: user.id,
        title,
        content,
      });

      if (posts) {
        for (const i in posts) {
          const post = await Post.findByPk(posts[i]);
          if (!post)
            throw {
              status: 404,
              message: '시리즈에 연결할 포스트를 찾을 수 없습니다.',
            };

          await post.update({
            series,
            seriesId: series.id,
            sequence: i,
          });
        }
      }

      await series.getPosts();
      return { series };
    } catch (error) {
      throw error;
    }
  }

  public async onDeleteSeries({ user, id }: SeriesServiceProps.onDeleteSeries) {
    try {
      const series = await Series.findOne({
        where: { id, userId: user.id },
      });
      if (!series) throw { status: 404, message: 'NotFound series' };

      if (series.userId !== user.id && user.permission !== UserPermission.admin)
        throw { status: 401, message: '접근권한이 없습니다.' };

      await Post.update(
        {
          series: null,
          seriesId: null,
        },
        {
          where: { seriesId: id },
        }
      );

      await series.destroy();
    } catch (error) {
      throw error;
    }
  }

  public async onUpdateSeries({
    user,
    id,
    title,
    content,
    posts,
  }: SeriesServiceProps.onUpdateSeries) {
    try {
      const series = await Series.findOne({
        where: { id, userId: user.id },
      });
      if (!series) throw { status: 404, message: 'NotFound series' };
      if (series.userId !== user.id && user.permission !== UserPermission.admin)
        throw { status: 401, message: '접근권한이 없습니다.' };

      await series.update({
        title,
        content,
      });

      if (posts) {
        await Post.update(
          {
            series: null,
            seriesId: null,
          },
          {
            where: { userId: user.id, seriesId: series.id },
          }
        );

        for (const i in posts) {
          const post = await Post.findByPk(id);
          if (!post)
            throw {
              status: 404,
              message: '시리즈에 연결할 포스트를 찾을 수 없습니다.',
            };

          await post.update({
            series,
            seriesId: series.id,
            sequence: i,
          });
        }
      }
    } catch (error) {
      throw error;
    }
  }
}
