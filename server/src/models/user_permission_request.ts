import {
  Table,
  Model,
  Column,
  DataType,
  CreatedAt,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';

import { User, UserPermission } from './_models';

@Table({ tableName: 'user_permission_request', timestamps: false })
export class UserPermissonRequest extends Model {
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

  @Column({
    type: DataType.ENUM(...Object.values(UserPermission)),
    defaultValue: UserPermission.read,
    allowNull: false,
  })
  public permission: UserPermission;

  @CreatedAt
  public createdAt: Date;
}
