import {
  Table,
  Model,
  Column,
  DataType,
  CreatedAt,
  DeletedAt,
  Default,
} from "sequelize-typescript";

@Table({ tableName: "telegram", timestamps: true })
export class StudioTelegram extends Model {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  })
  public id!: string;

  @Column(DataType.STRING(255))
  public name!: string;

  @Column(DataType.STRING(255))
  public clientId!: string;

  @CreatedAt
  public createdAt!: Date;

  @DeletedAt
  public deletedAt!: Date;
}
