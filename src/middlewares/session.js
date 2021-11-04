import session from 'express-session';
import { auth as authConfig } from '../../config';
import { sequelize } from '../entities';
import sequelizeStore from 'connect-session-sequelize';

const SequelizeStore = sequelizeStore(session.Store);
const sessionStore = new SequelizeStore({
  db: sequelize,
  table: 'session',
  extendDefaultFields: extendDefaultFields,
});

function extendDefaultFields(defaults, session) {
  return {
    data: defaults.data,
    expires: defaults.expires,
    userId: session.userId,
    adminId: session.adminId,
  };
}

export default session({
  secret: authConfig.sessionSecret,
  resave: false,
  saveUninitialized: false,
  store: sessionStore,
  cookie: { maxAge: 1000 * 60 * 60 * 24 },
});
