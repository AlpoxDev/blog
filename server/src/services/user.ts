import { Service } from 'typedi';
import { UserServiceProps } from './user.interface';

import { User, UserPermission, UserPermissionRequest } from '../models';

@Service()
export class UserService {
  constructor() {}

  public async onGetUsers({ limit, offset }: UserServiceProps.onGetUsers) {
    try {
      const { rows: users, count } = await User.findAndCountAll({
        limit,
        offset,
      });

      return { users, count };
    } catch (error) {
      throw error;
    }
  }

  public async onGetUser({ user, id }: UserServiceProps.onGetUser) {
    try {
      if (user.id !== id && user.permission !== UserPermission.admin)
        throw { status: 401, message: '접근 권한이 없습니다.' };

      const findUser = await User.findByPk(id);
      if (!findUser) throw { status: 404, message: 'NotFound user' };

      return { user: findUser };
    } catch (error) {
      throw error;
    }
  }

  public async onDeleteUser({ user, id }: UserServiceProps.onDeleteUser) {
    try {
      if (user.id !== id && user.permission !== UserPermission.admin)
        throw { status: 401, message: '접근 권한이 없습니다.' };

      const findUser = await User.findByPk(id);
      if (!findUser) throw { status: 404, message: 'NotFound user' };

      await findUser.destroy();
    } catch (error) {
      throw error;
    }
  }

  public async onUpdateUser({
    user,
    id,
    profile,
    nickname,
  }: UserServiceProps.onUpdateUser) {
    try {
      if (user.id !== id && user.permission !== UserPermission.admin)
        throw { status: 401, message: '접근 권한이 없습니다.' };

      const findUser = await User.findByPk(id);
      if (!findUser) throw { status: 404, message: 'NotFound user' };

      if (!profile && !nickname)
        throw { status: 400, message: '프로필 또는 닉네임이 있어야 합니다.' };

      const args: { profile?: string; nickname?: string } = {};
      if (profile) args.profile = profile;
      if (nickname) {
        const findNicknameUser = await User.findOne({ where: { nickname } });
        if (findNicknameUser)
          throw {
            status: 400,
            message: '닉네임을 가진 유저가 이미 존재합니다.',
          };

        args.nickname = nickname;
      }

      await findUser.update(args);
    } catch (error) {
      throw error;
    }
  }

  public async onGetUserRequests({
    limit,
    offset,
  }: UserServiceProps.onGetUserRequests) {
    try {
      const {
        rows: requests,
        count,
      } = await UserPermissionRequest.findAndCountAll({
        limit,
        offset,
        include: {
          model: User,
          as: 'user',
        },
      });

      return { requests, count };
    } catch (error) {
      throw error;
    }
  }

  public async onGetUserRequest({
    user,
    id,
  }: UserServiceProps.onGetUserRequest) {
    try {
      const request = await UserPermissionRequest.findByPk(id, {
        include: {
          model: User,
          as: 'user',
        },
      });
      if (!request) throw { status: 404, message: 'NotFound request' };
      if (
        user.id !== request.userId &&
        user.permission !== UserPermission.admin
      )
        throw { status: 401, message: '접근 권한이 없습니다.' };

      return { request };
    } catch (error) {
      throw error;
    }
  }

  public async onCreateUserRequest({
    user,
    permission,
  }: UserServiceProps.onCreateUserRequest) {
    try {
      const request = await UserPermissionRequest.create({
        user,
        userId: user.id,
        permission,
      });

      return { request };
    } catch (error) {
      throw error;
    }
  }

  public async onDeleteUserRequest({
    user,
    id,
  }: UserServiceProps.onDeleteUserRequest) {
    try {
      const request = await UserPermissionRequest.findByPk(id);
      if (!request) throw { status: 404, message: 'NotFound request' };

      if (
        user.id !== request.userId &&
        user.permission !== UserPermission.admin
      )
        throw { status: 401, message: '접근 권한이 없습니다.' };

      await request.destroy();
    } catch (error) {
      throw error;
    }
  }

  public async onUpdateUserRequest({
    user,
    id,
    permission,
  }: UserServiceProps.onUpdateUserRequest) {
    try {
      const request = await UserPermissionRequest.findByPk(id);
      if (!request) throw { status: 404, message: 'NotFound request' };
      if (
        user.id !== request.userId &&
        user.permission !== UserPermission.admin
      )
        throw { status: 401, message: '접근 권한이 없습니다.' };

      // 어드민일 경우
      if (user.permission === UserPermission.admin) {
        const findUser = await User.findByPk(request.userId);
        if (!findUser)
          throw {
            status: 404,
            message: '권한을 수정할 사용자를 찾을 수 없습니다.',
          };
        await findUser.update({ permission });
      }

      await request.update({ permission });
    } catch (error) {
      throw error;
    }
  }
}
