import { Router } from 'express';
import bearerToken from 'express-bearer-token';
import bodyParser from 'body-parser';
import session from '../middlewares/session';
import Authorization from '../middlewares/authorization';
import async from '../utils/async';

export default async (app) => {
  const router = new Router();
  const authorization = new Authorization();

  router.use(bearerToken()); // set to req.token
  router.use(bodyParser.json());
  router.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
  router.use(session);
  router.use(async(authorization.verify));
  app.use(router);
};
