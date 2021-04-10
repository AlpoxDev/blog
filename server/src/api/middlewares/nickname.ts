import { Request, Response, NextFunction } from 'express';
import { User } from '../../models';

export const NicknameParser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { nickname } = req.query;
  try {
    if (!nickname)
      throw { status: 400, message: 'BadRequest: NotFound nickname' };

    const user = await User.findOne({ where: { nickname } });
    if (!user)
      throw { status: 404, message: 'NotFound user in NicknameParser' };

    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};
