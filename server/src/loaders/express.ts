import {
  Application,
  json,
  urlencoded,
  Request,
  Response,
  NextFunction,
} from 'express';
import cookieParser from 'cookie-parser';
import { SyncOptions } from 'sequelize';

// middleware
import cors from 'cors';
import { errors } from 'celebrate';
import requestIP from 'request-ip';

// router
import routers from '../api/routers';

// config
import sequelize from '../models';
import config from '../config';

export default (app: Application) => {
  app.use(
    cors({
      credentials: true,
      origin: [
        'http://localhost:3000',
        'https://test.alpox.dev',
        'https://alpox.dev',
      ],
    })
  );

  app.use(cookieParser(config.COOKIE_SECRET));
  app.use(json({ limit: '500mb' }));
  app.use(urlencoded({ limit: '500mb', extended: true }));

  app.use(routers);

  app.use(errors());
  app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    const status = err.status || 500;
    const message = err.message || 'Server Internal Error';

    res.status(status).json({ message });
  });

  app.get('/sync', (req: Request, res: Response) => {
    const clientIP = requestIP.getClientIp(req);
    const { alter, force } = req.query;

    if (
      clientIP === '::1' ||
      clientIP === '::ffff:127.0.0.1' ||
      clientIP === '127.0.0.1'
    ) {
      const args: SyncOptions = {};
      if (alter) args.alter = true;
      if (force) args.force = true;

      sequelize.sync(args);
      res.status(200).contentType('html').send('<h1>Sync done!</h1>');
    } else {
      console.log(clientIP);
      res.status(200).contentType('html').send('<h1>Not in localhost</h1>');
    }
  });

  app.use((req: Request, res: Response) => {
    res.status(404).contentType('html').send(`<h1>BLOG API</h1>`);
  });
};
