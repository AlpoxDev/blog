import { Router } from 'express';
import { AuthController } from '../controllers';
import { AuthValidator } from '../validators';

export const authRouter = Router();

authRouter.post('/auth/me', AuthController.onMe);
authRouter.post('/auth/login', AuthValidator.onLogin, AuthController.onLogin);
authRouter.post(
  '/auth/register',
  AuthValidator.onRegister,
  AuthController.onRegister
);
authRouter.post('/auth/logout', AuthController.onLogout);
authRouter.get(
  '/auth/duplicate',
  AuthValidator.onCheckDuplicate,
  AuthController.onCheckDuplicate
);
