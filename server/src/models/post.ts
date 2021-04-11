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

  @AllowNull(false)
  @Column(DataType.STRING(255))
  public title: string;

  @AllowNull(false)
  @Column(DataType.STRING(255))
  public subtitle: string;

  @AllowNull(true)
  @Column(DataType.TEXT)
  public content: string;

  @BelongsToMany(() => Tag, () => PostTag)
  public tags: Tag[];

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
