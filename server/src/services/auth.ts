import { Op } from 'sequelize';
import { Service } from 'typedi';
import axios from 'axios';
import querytString from 'query-string';

import { User, UserMethod, UserSocial } from '../models';
import { AuthServiceProps } from './auth.interface';

import { createPassword, comparePassword, verifyToken } from '../common';

@Service()
export class AuthService {
  public async onMe({ cookie }: AuthServiceProps.onMe) {
    try {
      const { id } = verifyToken(cookie);
      const user = await User.findByPk(id, {
        attributes: ['id', 'email', 'nickname', 'permission', 'isMarketing'],
      });
      if (!user) throw { status: 404, message: '사용자를 찾을 수 없습니다.' };

      return { user };
    } catch (error) {
      throw error;
    }
  }

  public async onRefresh({ cookie }: AuthServiceProps.onRefresh) {
    try {
      const { id } = verifyToken(cookie);
    } catch (error) {
      throw error;
    }
  }

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

      return user.accessToken();
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

      return user.accessToken();
    } catch (error) {
      throw error;
    }
  }

  public async onCheckDuplicate({
    key,
    value,
  }: AuthServiceProps.onCheckDuplicate) {
    try {
      const findUser = await User.findOne({
        where: { [key]: value },
      });
      let label = '';
      if (key === 'email') label = '이메일';
      if (key === 'nickname') label = '닉네임';

      if (findUser) {
        throw { status: 400, message: `중복된 ${label}입니다` };
      } else {
        return { message: `사용가능한 ${label}입니다` };
      }
    } catch (error) {
      throw error;
    }
  }

  public async onGithub({
    code,
    client_id,
    client_secret,
  }: AuthServiceProps.onGithub) {
    try {
      const url = `https://github.com/login/oauth/access_token?client_id=${client_id}&client_secret=${client_secret}&code=${code}`;
      console.log(`onGithub url`, url);
      const { status, data } = await axios.post(url);
      if (status !== 200)
        throw { status: 400, message: 'BadRequest: code is invalid' };

      const apiUrl = `https://api.github.com/user`;
      const accessToken = querytString.parse(data)?.access_token;
      const headers = { Authorization: `Bearer ${accessToken}` };
      const response = await axios.get(apiUrl, { headers });
      if (response.status !== 200)
        throw { status: 400, message: 'BadRequest: accessToken is invalid' };

      const { id, login } = response.data;
      return await this.onGithubAuth({ githubId: id, nickname: login });
    } catch (error) {
      console.log(`onGithub error`, error);
      throw error;
    }
  }

  public async onGithubAuth({
    githubId,
    nickname,
  }: AuthServiceProps.onGithubAuth) {
    try {
      const hash = await createPassword(`${githubId}`);
      const findUserSocial = await UserSocial.findOne({
        where: { github: hash },
        include: { model: User, as: 'user' },
      });

      // 로그인
      if (findUserSocial) return findUserSocial.user.accessToken();

      // 회원 찾기
      const findUser = await User.findOne({ where: { nickname } });
      if (findUser) throw { status: 400, message: '중복된 닉네임입니다.' };

      // 회원가입
      const user = await User.create({ nickname });
      await UserSocial.create({
        github: hash,
        userId: user.id,
        user,
      });
      return user.accessToken();
    } catch (error) {
      throw error;
    }
  }
}
