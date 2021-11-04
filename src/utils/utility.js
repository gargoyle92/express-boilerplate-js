import { DATA_TYPE } from '../constants/type';
import mimeTypeStr from './mimetype';

export default class Utility {
  static isEmpty(value) {
    if (value == 0 || value == '' || value == null || value == undefined || (value != null && this.getType(value) == DATA_TYPE.OBJECT && !Object.keys(value).length)) {
      return true;
    } else {
      return false;
    }
  }

  static isInclude(object, value) {
    return Object.values(object).includes(value);
  }

  static isHourString(value) {
    return new RegExp('^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$').test(value);
  }

  static getType(target) {
    return Object.prototype.toString.call(target).slice(8, -1);
  }

  static validateFileType(fileType, mimetype) {
    const type = mimeTypeStr(fileType, mimetype);
    if (this.isEmpty(type)) return false;

    return true;
  }
}
