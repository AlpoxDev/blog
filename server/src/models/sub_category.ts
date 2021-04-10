import {
  Table,
  Model,
  Column,
  DataType,
  AllowNull,
  ForeignKey,
  BelongsTo,
  HasMany,
  Default,
  DeletedAt,
} from 'sequelize-typescript';
import { User, Post, MainCategory } from './_models';

@Table({ tableName: 'sub_category', timestamps: true })
export class SubCategory extends Model {
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

  @ForeignKey(() => MainCategory)
  @Column(DataType.UUID)
  public mainCategoryId: string;

  @BelongsTo(() => MainCategory)
  public mainCategory: MainCategory;

  @AllowNull(false)
  @Column(DataType.STRING(255))
  public name: string;

  @HasMany(() => Post)
  public posts: Post[];

  @Default(0)
  @Column(DataType.INTEGER)
  public sequence: number;

  @DeletedAt
  public deletedAt: Date;
}
