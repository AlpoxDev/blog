import {
  Table,
  Model,
  Column,
  DataType,
  AllowNull,
  ForeignKey,
  BelongsTo,
  HasMany,
  CreatedAt,
  UpdatedAt,
} from 'sequelize-typescript';
import { Op } from 'sequelize';
import { User, Post } from './_models';

@Table({ tableName: 'series', timestamps: false })
export class Series extends Model {
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

  @AllowNull(false)
  @Column(DataType.STRING(255))
  public title: string;

  @AllowNull(true)
  @Column(DataType.STRING(255))
  public content: string | null;

  @HasMany(() => Post)
  public posts: Post[];

  static async find(series?: string): Promise<Series | null> {
    if (!series) return null;

    return (
      this.findOne({
        where: {
          [Op.or]: [{ id: series }, { title: series }],
        },
      }) || null
    );
  }

  public async getPosts() {
    this.posts = await Post.findAll({ where: { seriesId: this.id } });
  }
}
