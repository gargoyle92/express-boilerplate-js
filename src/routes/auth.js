import { Router } from 'express';
import { Container } from 'typedi';
import UserService from '../services/user';
import AuthenticationService from '../services/auth';

import async from '../utils/async';

const router = new Router();
export default router;

const userService = Container.get(UserService);
const authService = Container.get(AuthenticationService);

router.post(
  '/auth',
  async(async (req, res) => {
    const result = await authService.signIn(req.body);

    res.json(result);
  }),
);

router.post(
  '/auth/register',
  async(async (req, res) => {
    const result = await userService.createUser(req.body);

    res.json(result);
  }),
);
