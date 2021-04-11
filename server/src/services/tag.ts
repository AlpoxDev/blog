import { Service } from 'typedi';
import { TagServiceProps } from './tag.interface';

import { Tag, Post, PostTag, UserPermission } from '../models';
import { nextTick } from 'node:process';

@Service()
export class TagService {
  public async onGetTags({ user, limit, offset }: TagServiceProps.onGetTags) {
    try {
      const { rows: tags, count } = await Tag.findAndCountAll({
        where: { userId: user.id },
        limit,
        offset,
      });
      return { tags, count };
    } catch (error) {
      throw error;
    }
  }

  public async onGetTag({ user, id, limit, offset }: TagServiceProps.onGetTag) {
    try {
      const tag = await Tag.findByPk(id);
      if (!tag) throw { status: 404, message: 'NotFound tag' };
    } catch (error) {
      throw error;
    }
  }

  public async onCreateTag({ user, name }: TagServiceProps.onCreateTag) {
    try {
      const tag = await Tag.create({
        user,
        userId: user.id,
        name,
      });

      return { tag };
    } catch (error) {
      throw error;
    }
  }

  public async onDeleteTag({ user, id }: TagServiceProps.onDeleteTag) {
    try {
      const tag = await Tag.findOne({ where: { id, userId: user.id } });
      if (!tag) throw { status: 404, message: 'NotFound tag' };
      if (tag.userId !== user.id && user.permission !== UserPermission.admin)
        throw { status: 401, message: '접근권한이 없습니다.' };

      await PostTag.destroy({
        where: { tagId: tag.id },
      });

      await tag.destroy();
    } catch (error) {
      throw error;
    }
  }

  public async onUpdateTag({ user, id, name }: TagServiceProps.onUpdateTag) {
    try {
      const tag = await Tag.findOne({
        where: { id, userId: user.id },
      });
      if (!tag) throw { status: 404, message: 'NotFound tag' };
      if (tag.userId !== user.id && user.permission !== UserPermission.admin)
        throw { status: 401, message: '접근권한이 없습니다.' };

      await tag.update({ name });
    } catch (error) {
      throw error;
    }
  }
}
