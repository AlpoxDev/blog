import {
  Table,
  Model,
  Column,
  DataType,
  ForeignKey,
  BelongsTo,
  AllowNull,
} from 'sequelize-typescript';
import { User } from './user';

@Table({ tableName: 'user_social', timestamps: false })
export class UserSocial extends Model {
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

  @AllowNull(true)
  @Column(DataType.TEXT)
  public kakao: string;

  @AllowNull(true)
  @Column(DataType.TEXT)
  public github: string;
}
