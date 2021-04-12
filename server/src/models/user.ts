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
} from 'sequelize-typescript';
import { signToken } from '../common';
import { Post } from './post';

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
    unique: true,
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

  public get accessToken() {
    return signToken({
      id: this.id,
      nickname: this.nickname,
      profile: this.nickname,
      permission: this.permission,
    });
  }

  public getRefreshToken(accessToken: string) {
    return signToken({
      id: this.id,
      accessToken,
    });
  }

  @HasMany(() => Post)
  public posts: Post[];
}
