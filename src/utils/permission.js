import { PERMISSION } from '../constants/type';
import Utility from '../utils/utility';

export default class PermissionRequired {
  static async superAdmin(req, res, next) {
    if (Utility.isEmpty(req.admin)) throw 'SuperAdminLoginRequired';
    else if (req.admin && req.admin.permission >= PERMISSION.SUPER_ADMIN) next();
    else throw 'SuperAdminPermissionRequired';
  }
  static async admin(req, res, next) {
    if (Utility.isEmpty(req.admin)) throw 'AdminLoginRequired';
    else if (req.admin && req.admin.permission >= PERMISSION.ADMIN) next();
    else throw 'AdminPermissionRequired';
  }
}
