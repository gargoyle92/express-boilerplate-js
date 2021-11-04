import { DateTime } from 'luxon';

export default class DateTimeUtil {
  static async now(format) {
    if (format) return DateTime.local().toFormat(format);
    else return DateTime.local().toISO();
  }

  // static async now(format) {
  //   if (format) return DateTime.utc().toFormat(format);
  //   else return DateTime.utc().toISO();
  // }
  static async localNow(format) {
    if (format) return DateTime.local().toFormat(format);
    else return DateTime.local().toISO();
  }

  static async compareDateTime(smaller, bigger) {
    return smaller < bigger;
  }

  static async fromJSDate(date = new Date()) {
    const target = new Date(date);
    return DateTime.fromJSDate(target);
  }

  static async diffDatetime(smaller, bigger) {
    const diffValue = bigger.diff(smaller, ['years', 'months', 'days', 'hours', 'minutes', 'seconds', 'milliseconds']).toObject();
    return diffValue;
  }

  static async transformDatetime(years = 0, months = 0, days = 0, hours = 0, minutes = 0, seconds = 0, milliseconds = 0, datetime = DateTime.local()) {
    const transformDatetime = datetime.plus({ years: years, months: months, days: days, hours: hours, minutes: minutes, seconds: seconds, milliseconds: milliseconds });

    return transformDatetime.toFormat('yyyy-MM-dd HH:mm:ss.SSS');
  }
}
