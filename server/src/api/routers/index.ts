import { Router } from 'express';
import * as routers from './_routers';

const router = Router();
router.use(routers.authRouter);
router.use(routers.postRouter);
router.use(routers.categoryRouter);
router.use(routers.fileRouter);

export default router;
