import { Request, Response, NextFunction } from 'express';
import { Container } from 'typedi';

import { UserService } from '../../services';

export class UserController {
  static async onGetUsers(req: Request, res: Response, next: NextFunction) {
    const { limit, offset } = req;

    try {
      const userService = Container.get(UserService);
      const response = await userService.onGetUsers({ limit, offset });

      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }

  static async onGetUser(req: Request, res: Response, next: NextFunction) {
    const { user } = req;
    const { id } = req.params;

    try {
      const userService = Container.get(UserService);
      const response = await userService.onGetUser({ user, id });

      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }

  static async onDeleteUser(req: Request, res: Response, next: NextFunction) {
    const { user } = req;
    const { id } = req.params;

    try {
      const userService = Container.get(UserService);
      await userService.onDeleteUser({ user, id });

      res.status(204).json();
    } catch (error) {
      next(error);
    }
  }

  static async onUpdateUser(req: Request, res: Response, next: NextFunction) {
    const { user } = req;
    const { id } = req.params;
    const { profile, nickname } = req.body;

    try {
      const userService = Container.get(UserService);
      await userService.onUpdateUser({ user, id, profile, nickname });

      res.status(204).json();
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
      const userService = Container.get(UserService);
      const response = await userService.onGetUserRequests({ limit, offset });

      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }

  static async onGetUserRequest(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const { user } = req;
    const { id } = req.params;

    try {
      const userService = Container.get(UserService);
      const response = await userService.onGetUserRequest({ user, id });

      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }

  static async onCreateUserRequest(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const { user } = req;
    const { permission } = req.body;

    try {
      const userService = Container.get(UserService);
      const response = await userService.onCreateUserRequest({
        user,
        permission,
      });

      res.status(201).json(response);
    } catch (error) {
      next(error);
    }
  }

  static async onDeleteUserRequest(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const { user } = req;
    const { id } = req.params;

    try {
      const userService = Container.get(UserService);
      await userService.onDeleteUserRequest({ user, id });

      res.status(204).json();
    } catch (error) {
      next(error);
    }
  }

  static async onUpdateUserRequest(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const { user } = req;
    const { id } = req.params;
    const { permission } = req.body;

    try {
      const userService = Container.get(UserService);
      await userService.onUpdateUserRequest({ user, id, permission });

      res.status(204).json();
    } catch (error) {
      next(error);
    }
  }
}
