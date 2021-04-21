import { Request, Response, NextFunction } from 'express';
import { Container } from 'typedi';
import { AuthService } from '../../services';

import config from '../../config';

export class AuthController {
  static async onMe(req: Request, res: Response, next: NextFunction) {
    const cookie = req.signedCookies[config.COOKIE_NAME];

    try {
      if (!cookie)
        throw { status: 401, message: '사용자가 로그인이 되어있지 않습니다.' };

      const authService: AuthService = Container.get(AuthService);
      const response = await authService.onMe({ cookie });

      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }

  static async onLogin(req: Request, res: Response, next: NextFunction) {
    try {
      const authService: AuthService = Container.get(AuthService);
      const response = await authService.onLogin(req.body);

      res
        .status(200)
        .cookie(config.COOKIE_NAME, response, config.COOKIE_OPTIONS)
        .json({ success: true });
    } catch (error) {
      next(error);
    }
  }

  static async onRegister(req: Request, res: Response, next: NextFunction) {
    try {
      const authService: AuthService = Container.get(AuthService);
      const response = await authService.onRegister(req.body);

      res
        .status(201)
        .cookie(config.COOKIE_NAME, response, config.COOKIE_OPTIONS)
        .json({ success: true });
    } catch (error) {
      next(error);
    }
  }

  static async onLogout(req: Request, res: Response, next: NextFunction) {
    const cookie = req.signedCookies[config.COOKIE_NAME];

    try {
      if (!cookie)
        throw { status: 401, message: '사용자가 로그인이 되어있지 않습니다.' };
      res.status(204).clearCookie(config.COOKIE_NAME).send();
    } catch (error) {
      next(error);
    }
  }

  static async onCheckDuplicate(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const { key, value } = req.query;

    try {
      if (typeof key !== 'string' || typeof value !== 'string')
        throw { status: 400, message: '올바르지 않은 요청값입니다.' };
      if (key !== 'email' && key !== 'nickname')
        throw { status: 400, message: '올바르지 않은 요청값입니다.' };

      const authService: AuthService = Container.get(AuthService);
      const response = await authService.onCheckDuplicate({ key, value });

      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }
}
