import user from '../routes/user';
import auth from '../routes/auth';
import error from '../middlewares/error';

export default async (app) => {
  app.use(auth);
  app.use(user);
  app.use(error);
};
