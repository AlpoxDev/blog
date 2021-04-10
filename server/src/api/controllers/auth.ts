import { Request, Response, NextFunction } from 'express';
import { Container } from 'typedi';
import { AuthService } from '../../services';

export class AuthController {
  static async onLogin(req: Request, res: Response, next: NextFunction) {
    try {
      const authService: AuthService = Container.get(AuthService);
      const response = await authService.onLogin(req.body);

      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }

  static async onRegister(req: Request, res: Response, next: NextFunction) {
    try {
      const authService: AuthService = Container.get(AuthService);
      const response = await authService.onRegister(req.body);

      res.status(201).json(response);
    } catch (error) {
      next(error);
    }
  }
}
