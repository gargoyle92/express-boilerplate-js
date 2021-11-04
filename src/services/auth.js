import { Container } from 'typedi';
import { Authentication } from '../entities';
import { AuthenticationModel } from '../models';
import { sanitize, validateSingle } from '../validation/validate';
import { auth as authConfig } from '../../config';
import bcrypt from '../utils/bcrypt';
import RedisUtil from '../utils/redis';

const redisUtil = Container.get(RedisUtil);
export default class AuthService {
  async signIn(body) {
    let verifiedUser = null;

    const authValidationError = validateSingle(body, AuthenticationModel);
    if (authValidationError) throw { name: 'ValidationError', data: validationError };

    const santizeAuthenticationModel = sanitize(body, AuthenticationModel);

    if (!Object.values(authConfig.type).includes(santizeAuthenticationModel.type)) throw 'ValidationError';

    const auth = await Authentication.findOne({
      where: {
        type: santizeAuthenticationModel.type,
        identifier: santizeAuthenticationModel.identifier,
      },
    });

    if (auth.key != null) {
      const isVerify = await bcrypt.compare(santizeAuthenticationModel.key, auth.key);
      if (!isVerify) throw 'InvalidAuthentication';

      verifiedUser = await auth.getUser();
      verifiedUser = await verifiedUser.toJSON();

      if (!verifiedUser) throw 'UserNotFound';
      if (verifiedUser.isEnable > 0 || verifiedUser.isDelete > 0) throw 'UserInvalid';

      const accessToken = await redisUtil.setAccessToken(verifiedUser.userId);
      verifiedUser.accessToken = accessToken;
    }

    return verifiedUser;
  }
  async signOut() {}

  async signUp(body) {}
}
