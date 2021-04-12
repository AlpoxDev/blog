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
  DefaultScope,
} from 'sequelize-typescript';
import { Op } from 'sequelize';
import { User, Post, MainCategory } from './_models';

@DefaultScope(() => ({
  attributes: ['id', 'name', 'sequence'],
}))
@Table({ tableName: 'sub_category', timestamps: false })
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
  public mainCategoryId: string | null;

  @BelongsTo(() => MainCategory)
  public mainCategory: MainCategory | null;

  @AllowNull(false)
  @Column(DataType.STRING(255))
  public name: string;

  @HasMany(() => Post)
  public posts: Post[];

  @Default(0)
  @Column(DataType.INTEGER)
  public sequence: number;

  static async find(category: string): Promise<SubCategory | null> {
    return (
      this.findOne({
        where: {
          [Op.or]: [{ id: category }, { name: category }],
        },
      }) || null
    );
  }
}
