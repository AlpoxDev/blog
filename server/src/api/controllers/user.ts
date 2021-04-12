import { Request, Response, NextFunction } from 'express';
import { Container } from 'typedi';

import {} from '../../services';

export class UserController {
  static async onGetUsers(req: Request, res: Response, next: NextFunction) {
    const { limit, offset } = req;

    try {
    } catch (error) {
      next(error);
    }
  }

  static async onGetUser(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;

    try {
    } catch (error) {
      next(error);
    }
  }

  static async onDeleteUser(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;

    try {
    } catch (error) {
      next(error);
    }
  }

  static async onUpdateUser(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    const {} = req.body;

    try {
    } catch (error) {
      next(error);
    }
  }

  static async onGetUserRequests(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const { limit, offset } = req;

    try {
    } catch (error) {
      next(error);
    }
  }

  static async onGetUserRequest(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const { id } = req.params;

    try {
    } catch (error) {
      next(error);
    }
  }

  static async onCreateUserRequest(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const { permission } = req.body;

    try {
    } catch (error) {
      next(error);
    }
  }

  static async onDeleteUserRequest(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const { id } = req.params;

    try {
    } catch (error) {
      next(error);
    }
  }

  static async onUpdateUserRequest(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const { id } = req.params;
    const { permission } = req.body;

    try {
    } catch (error) {
      next(error);
    }
  }
}
