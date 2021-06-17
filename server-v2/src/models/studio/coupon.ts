import {
  Table,
  Model,
  Column,
  DataType,
  CreatedAt,
  DeletedAt,
  Default,
} from "sequelize-typescript";

export enum CouponType {
  MONEY = "MONEY",
  PERCENT = "PERCENT",
}

@Table({ tableName: "coupon", timestamps: true })
export class StudioCoupon extends Model {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  })
  public id!: string;

  @Default("일반 쿠폰")
  @Column(DataType.STRING)
  public name!: string;

  @Column(DataType.ENUM(...Object.values(CouponType)))
  public couponType!: CouponType;

  @CreatedAt
  public createdAt!: Date;

  @DeletedAt
  public deletedAt!: Date;
}
