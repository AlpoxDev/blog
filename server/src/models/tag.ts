import {
  Table,
  Model,
  Column,
  DataType,
  AllowNull,
  ForeignKey,
  BelongsTo,
  BelongsToMany,
} from 'sequelize-typescript';
import { User, Post, PostTag } from './_models';

@Table({ tableName: 'tag', timestamps: false })
export class Tag extends Model {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  })
  public id!: string;

  @ForeignKey(() => User)
  @Column(DataType.UUID)
  public userId: string;

  @BelongsTo(() => User)
  public user: User;

  @AllowNull(false)
  @Column(DataType.STRING(255))
  public name: string;

  @BelongsToMany(() => Post, () => PostTag)
  public posts: Post[];
}
