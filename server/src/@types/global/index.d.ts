import { User } from '../../models';

declare global {
  namespace Express {
    interface Request {
      user: User;
      limit: number;
      offset: number;
    }
  }
}
