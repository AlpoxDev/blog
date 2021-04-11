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

@Table({ tableName: 'main_category', timestamps: false })
export class MainCategory extends Model {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  })
  public id: string;

  @ForeignKey(() => User)
  @Column(DataType.UUID)
  public userId: string | null;

  @BelongsTo(() => User)
  public user: User | null;

  @AllowNull(false)
  @Column(DataType.STRING(255))
  public name: string;

  @Default(0)
  @Column(DataType.INTEGER)
  public sequence: number;

  @HasMany(() => SubCategory)
  public subCategorys: SubCategory[];

  static async getUserCategorys(userId: string) {
    return await MainCategory.findAll({ where: { userId } });
  }

  public async getSubCategorys() {
    this.subCategorys = await SubCategory.findAll({ where: { id: this.id } });
  }
}
