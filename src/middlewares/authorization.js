import { Container } from 'typedi';
import RedisUtil from '../utils/redis';

export default class Authorization {
  async verify(req, res, next) {
    req.body.ip = req.connection.remoteAddress;

    if (!Utility.isEmpty(req.token)) {
      const data = await RedisUtil.getDataOfKey(req.token);
      if (Utility.isEmpty(data)) throw 'AccessTokenDenied';

      const userId = data.userId;
      if (!Utility.isEmpty(userId)) {
        const user = await userService.getUser(userId);

        req.user = user;
        req.user.permission = data.permission;
        req.body.userId = user.userId;
      }
    }

    if (!Utility.isEmpty(req.session.adminId)) {
      const adminId = req.session.adminId;
      const admin = await adminService.getAdmin(adminId);
      const auth = await admin.getAuthentication();

      req.admin = admin;
      req.admin.permission = auth.permission;
      req.body.registererId = admin.adminId;
      req.body.updaterId = admin.adminId;
    }

    next();
  }
}
