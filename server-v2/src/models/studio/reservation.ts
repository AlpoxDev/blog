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

@Table({ tableName: "reservation", timestamps: true })
export class StudioReservation extends Model {
  @Column({
    type: DataType.STRING,
    primaryKey: true,
  })
  public id!: string;

  @Column(DataType.DATE)
  public startedAt!: Date;

  @Column(DataType.DATE)
  public endedAt!: Date;

  @CreatedAt
  public createdAt!: Date;

  @DeletedAt
  public deletedAt!: Date;
}
