import { Router } from 'express';
import * as routers from './_routers';

const router = Router();

Object.values(routers).forEach((item: Router) => {
  router.use(item);
});

export default router;
