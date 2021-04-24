import {
  Table,
  Model,
  Column,
  DataType,
  AllowNull,
  CreatedAt,
  DeletedAt,
  UpdatedAt,
  ForeignKey,
  BelongsTo,
  BelongsToMany,
  Default,
} from 'sequelize-typescript';
import { SubCategory, Series, Tag, User, PostTag } from './_models';

@Table({ tableName: 'post' })
export class Post extends Model {
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

  @ForeignKey(() => Series)
  @Column(DataType.UUID)
  public seriesId: string;

  @BelongsTo(() => Series)
  public series: Series;

  @ForeignKey(() => SubCategory)
  @Column(DataType.UUID)
  public categoryId: string;

  @BelongsTo(() => SubCategory)
  public category: SubCategory;

  @BelongsToMany(() => Tag, () => PostTag)
  public tags: Tag[];

  @AllowNull(true)
  @Column(DataType.STRING(255))
  public thumbnail: string;

  @AllowNull(false)
  @Column(DataType.STRING(255))
  public title: string;

  @AllowNull(true)
  @Column(DataType.STRING(255))
  public subtitle: string;

  @AllowNull(false)
  @Column(DataType.TEXT)
  public content: string;

  @Default(0)
  @Column(DataType.INTEGER)
  public sequence: number;

  @CreatedAt
  public createdAt: Date;

  @DeletedAt
  public deletedAt: Date;

  @UpdatedAt
  public updatedAt: Date;
}
