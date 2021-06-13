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
} from "sequelize-typescript";

@Table({ tableName: "studio_config", timestamps: false })
export class StudioConfig extends Model {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  })
  public id!: string;

  @Column
  public password!: string;
}
