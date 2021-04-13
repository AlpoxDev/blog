import {
  Application,
  json,
  urlencoded,
  Request,
  Response,
  NextFunction,
} from 'express';
import { SyncOptions } from 'sequelize';
import * as http from 'http';

// middleware
import cors from 'cors';
import { errors } from 'celebrate';
import requestIP from 'request-ip';

// router
import routers from '../api/routers';

// config
import sequelize from '../models';

export default (app: Application) => {
  app.use(cors());

  app.use((req: Request, res: Response, next: NextFunction) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
  });

  app.use(json({ limit: '500mb' }));
  app.use(urlencoded({ limit: '500mb', extended: true }));

  app.use(routers);

  app.use(errors());
  app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    const error = {
      status: err.status || 500,
      message: err.message || 'Server Internal Error',
    };

    console.log(`Error!`, err);

    res.status(error.status).json(error);
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
