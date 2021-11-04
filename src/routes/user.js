import { Router } from 'express';
import { Container } from 'typedi';
import UserService from '../services/user';
import async from '../utils/async';

const userService = Container.get(UserService);
const router = new Router();
export default router;

router.get(
  '/users',
  async(async (req, res) => {
    const result = await userService.getUsers(req.query);

    res.json(result);
  }),
);

router.get(
  '/users/:userId',
  async(async (req, res) => {
    const { userId } = req.params;
    const result = await userService.getUser(userId);

    res.json(result);
  }),
);
