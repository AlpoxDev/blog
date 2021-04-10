import { Op } from 'sequelize';
import { Service } from 'typedi';

import { User, UserMethod } from '../models';
import { AuthServiceProps } from './auth.interface';

import { createPassword, comparePassword } from '../common';

@Service()
export class AuthService {
  public async onLogin({ id, password }: AuthServiceProps.onLogin) {
    try {
      const user = await User.findOne({
        where: {
          [Op.or]: [{ email: id }, { nickname: id }],
          method: UserMethod.default,
        },
        attributes: ['id', 'email', 'nickname', 'password', 'permission'],
      });
      if (!user) throw { status: 404, message: 'NotFound user' };

      const isPassword = await comparePassword(password, user.password);
      if (!isPassword)
        throw { status: 400, message: 'BadRequest: Password Incorrect' };

      const accessToken = user.accessToken;
      const refreshToken = user.getRefreshToken(accessToken);
      return {
        accessToken,
        refreshToken,
        id: user.id,
        permission: user.permission,
      };
    } catch (error) {
      throw error;
    }
  }

  public async onRegister({
    email,
    password,
    nickname,
    isMarketing,
  }: AuthServiceProps.onRegister) {
    try {
      const findUser = await User.findOne({
        where: {
          [Op.or]: [{ email }, { nickname }],
          method: UserMethod.default,
        },
        attributes: [
          'id',
          'email',
          'nickname',
          'password',
          'permission',
          'method',
          'isMarketing',
        ],
      });

      if (findUser)
        throw {
          status: 400,
          message: 'BadRequest: Duplicated email or nickname',
        };

      const hashPassword = await createPassword(password);
      const user = await User.create({
        email,
        password: hashPassword,
        nickname,
        isMarketing,
      });

      const accessToken = user.accessToken;
      const refreshToken = user.getRefreshToken(accessToken);

      return {
        accessToken,
        refreshToken,
        id: user.id,
        permission: user.permission,
      };
    } catch (error) {
      throw error;
    }
  }
}
