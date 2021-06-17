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

@Table({ tableName: "config", timestamps: false })
export class StudioConfig extends Model {
  @Column({
    type: DataType.STRING,
    primaryKey: true,
  })
  public key!: string;

  @Column(DataType.TEXT)
  public value!: string;
}
