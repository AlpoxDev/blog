import { Router } from 'express';
import { AuthController } from '../controllers';
import { AuthValidator } from '../validators';

export const authRouter = Router();

authRouter.post('/auth/login', AuthValidator.onLogin, AuthController.onLogin);
authRouter.post(
  '/auth/register',
  AuthValidator.onRegister,
  AuthController.onRegister
);
