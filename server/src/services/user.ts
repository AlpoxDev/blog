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

  public async onUpdateUser({ user, id }: UserServiceProps.onUpdateUser) {
    try {
      if (user.id !== id && user.permission !== UserPermission.admin)
        throw { status: 401, message: '접근 권한이 없습니다.' };

      const findUser = await User.findByPk(id);
      if (!findUser) throw { status: 404, message: 'NotFound user' };

      await findUser.update({});
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

      await request.update({ permission });
    } catch (error) {
      throw error;
    }
  }
}
