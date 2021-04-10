import {
  Table,
  Model,
  ForeignKey,
  Column,
  DataType,
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
}
