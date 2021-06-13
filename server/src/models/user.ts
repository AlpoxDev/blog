import {
  Table,
  Model,
  Column,
  DataType,
  CreatedAt,
  UpdatedAt,
  DeletedAt,
  Default,
  HasMany,
  DefaultScope,
  HasOne,
} from 'sequelize-typescript';
import { signToken } from '../common';
import { Post } from './post';
import { UserSocial } from './user_social';

export enum UserPermission {
  read = 'READ',
  edit = 'EDIT',
  admin = 'ADMIN',
}

export enum UserMethod {
  default = 'DEFAULT',
  kakao = 'KAKAO',
  github = 'GITHUB',
}

@DefaultScope(() => ({
  attributes: ['id', 'profile', 'nickname'],
}))
@Table({ tableName: 'user' })
export class User extends Model {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  })
  public id: string;

  @Column({
    type: DataType.STRING(255),
    allowNull: true,
  })
  public profile: string;

  @Column({
    type: DataType.STRING(255),
    allowNull: true,
  })
  public email: string;

  @Column({
    type: DataType.STRING(255),
    allowNull: false,
  })
  public nickname: string;

  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  public password: string;

  @Column({
    type: DataType.ENUM(...Object.values(UserPermission)),
    defaultValue: UserPermission.read,
    allowNull: false,
  })
  public permission: UserPermission;

  @Column({
    type: DataType.ENUM(...Object.values(UserMethod)),
    defaultValue: UserMethod.default,
    allowNull: false,
  })
  public method: UserMethod;

  @Default(true)
  @Column(DataType.BOOLEAN)
  public isMarketing: boolean;

  @CreatedAt
  public createdAt: Date;

  @DeletedAt
  public deletedAt: Date;

  @UpdatedAt
  public updatedAt: Date;

  @HasOne(() => UserSocial)
  public userSocial: UserSocial;

  @HasMany(() => Post)
  public posts: Post[];

  public accessToken(expiresIn = '12h') {
    return signToken(
      {
        id: this.id,
      },
      expiresIn
    );
  }
}
