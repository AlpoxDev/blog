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

import {
  encryptAES256,
  decryptAES256,
  signToken,
  verifyToken,
} from "../../services";

export enum StudioUserRole {
  USER = "USER",
  ADMIN = "ADMIN",
}

@Table({ tableName: "user", timestamps: true })
export class StudioUser extends Model {
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

  @Default(StudioUserRole.USER)
  @Column(DataType.ENUM(...Object.values(StudioUserRole)))
  public role!: StudioUserRole;

  @CreatedAt
  public createdAt!: Date;

  @DeletedAt
  public deletedAt!: Date;

  @UpdatedAt
  public updatedAt!: Date;

  public getAccessToken() {
    return signToken({ id: this.id });
  }

  public static verifyToken(token: string) {
    return verifyToken(token);
  }
}
