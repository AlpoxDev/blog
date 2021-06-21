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

import config from "config";
import { signToken, verifyToken } from "services";

export enum PercentUserRole {
  USER = "USER",
  ADMIN = "ADMIN",
}

@Table({ tableName: "user", timestamps: true })
export class PercentUser extends Model {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  })
  public id!: string;

  @Column
  public socialId!: string;

  @Column(DataType.STRING(255))
  public name!: string;

  @Column(DataType.TEXT)
  public profile!: string;

  @Column(DataType.STRING(255))
  public phone!: string;

  @Default(PercentUserRole.USER)
  @Column(DataType.ENUM(...Object.values(PercentUserRole)))
  public role!: PercentUserRole;

  @CreatedAt
  public createdAt!: Date;

  @DeletedAt
  public deletedAt!: Date;

  @UpdatedAt
  public updatedAt!: Date;

  public getAccessToken() {
    return signToken(config.PERCENT.JWT_KEY, { id: this.id, type: "percent" });
  }

  public static verifyToken(token: string) {
    return verifyToken(config.PERCENT.JWT_KEY, token);
  }
}
