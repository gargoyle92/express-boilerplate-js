import { Container } from 'typedi';
import { User, Authentication, sequelize } from '../entities';
import { UserModel, AuthenticationModel, UserFilterModel } from '../models';
import { sanitize, validateSingle } from '../validation/validate';
import { auth as authConfig } from '../../config';
import bcrypt from '../utils/bcrypt';
import makeCode from '../utils/code-generator';
import RedisUtil from '../utils/redis';

const redisUtil = Container.get(RedisUtil);
export default class UserService {
  async getUser(userId) {
    const user = await User.findByPk(userId);

    return user;
  }

  async getUsers(query) {
    const validationError = validateSingle(query, UserFilterModel);
    if (validationError) throw { name: 'ValidationError', data: validationError };

    const santizeFilterModel = sanitize(query, UserFilterModel);

    const users = await User.findAll({ where: santizeFilterModel });

    return users;
  }

  async createUser(body) {
    let userObj = null;
    let authenticationObj = null;

    const userValidationError = validateSingle(body, UserModel);
    if (userValidationError) throw { name: 'ValidationError', data: userValidationError };

    const authValidationError = validateSingle(body, AuthenticationModel);
    if (authValidationError) throw { name: 'ValidationError', data: authValidationError };

    const santizeUserModel = sanitize(body, UserModel);
    const santizeAuthenticationModel = sanitize(body, AuthenticationModel);

    const identifierVerify = await Authentication.findOne({ where: { identifier: santizeAuthenticationModel.identifier } });
    if (identifierVerify) throw 'IdentifierConflict';

    const t = await sequelize.transaction();

    try {
      const salt = await bcrypt.genSalt(authConfig.bcrypt);
      const hash = await bcrypt.hash(santizeAuthenticationModel.key, salt);
      santizeAuthenticationModel.key = hash;
      santizeAuthenticationModel.refreshToken = await makeCode(60);

      const user = await User.create(santizeUserModel, { transaction: t });
      const authentication = await user.createAuthentication(santizeAuthenticationModel, { transaction: t });

      await t.commit();

      userObj = await user.toJSON();
      authenticationObj = await authentication.toJSON();

      const accessToken = await redisUtil.setAccessToken(userObj.userId);

      userObj.accessToken = accessToken;
      userObj.role = authenticationObj.role;
      userObj.refreshToken = authenticationObj.refreshToken;
    } catch (error) {
      console.error(error);
      await t.rollback();
    }

    return { user: userObj };
  }
}
