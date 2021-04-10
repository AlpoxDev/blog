import {
  Table,
  Model,
  Column,
  DataType,
  AllowNull,
  ForeignKey,
  BelongsTo,
  HasMany,
  CreatedAt,
  UpdatedAt,
} from 'sequelize-typescript';
import { Post } from './post';
import { User } from './user';

@Table({ tableName: 'series', timestamps: true })
export class Series extends Model {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  })
  public id: string;

  @ForeignKey(() => User)
  @Column(DataType.UUID)
  public userId: string;

  @BelongsTo(() => User)
  public user: User;

  @AllowNull(false)
  @Column(DataType.STRING(255))
  public title: string;

  @AllowNull(true)
  @Column(DataType.STRING(255))
  public content: string;

  @HasMany(() => Post)
  public posts: Post[];

  @CreatedAt
  public createdAt: Date;

  @UpdatedAt
  public updatedAt: Date;
}
