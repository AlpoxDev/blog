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
import { User, SubCategory } from './_models';

@Table({ tableName: 'main_category', timestamps: true })
export class MainCategory extends Model {
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
  public name: string;

  @Default(0)
  @Column(DataType.INTEGER)
  public sequence: number;

  @HasMany(() => SubCategory)
  public subCategorys: SubCategory[];

  @DeletedAt
  public deletedAt: Date;
}
