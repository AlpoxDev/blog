import {
  Table,
  Model,
  ForeignKey,
  Column,
  DataType,
  DefaultScope,
} from 'sequelize-typescript';
import { Post, Tag } from './_models';

@Table({ tableName: 'post_tag', timestamps: false })
export class PostTag extends Model {
  @ForeignKey(() => Post)
  @Column(DataType.UUID)
  public postId: string;

  @ForeignKey(() => Tag)
  @Column(DataType.UUID)
  public tagId: string;

  static async resetPostTagRelations(postId: string) {
    await this.destroy({
      where: { postId },
    });
  }

  static async setPostTagRelations(
    relations: Array<{ postId: string; tagId: string }>
  ) {
    return await Promise.all(
      relations.map((relation: { postId: string; tagId: string }) =>
        this.create(relation)
      )
    );
  }
}
