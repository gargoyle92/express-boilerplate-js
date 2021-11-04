import Redis from 'ioredis';
import { Container } from 'typedi';
import { redis as redisConfig } from '../../config/index';
import CodeGenerator from './code-generator';
import DateTimeUtil from './datetime';
import Utility from './utility';

const redis = new Redis({ port: redisConfig.port, host: redisConfig.host });
redis.on('error', (err) => {
  console.error(err);
  console.error('-- Not installed Redis Server.');
});

export default class RedisUtil {
  static async setAccessToken(authentication) {
    let id = new Object();
    const token = await CodeGenerator.makeCode(36);

    if (!Utility.isEmpty(authentication.userId)) id.userId = authentication.userId;
    else if (!Utility.isEmpty(authentication.adminId)) id.adminId = authentication.adminId;

    const data = Object.assign({}, { permission: authentication.permission, scope: authentication.scope }, id);

    await redis.hmset(token, data);
    await redis.expire(token, redisConfig.ttl);

    const currentAt = await DateTimeUtil.now('yyyy-MM-dd HH:mm:ss.SSS');
    const expireAt = await DateTimeUtil.transformDatetime(0, 0, 0, 2, 0, 0); // 2 hour

    return { accessToken: token, accessTokenCurrentAt: currentAt, accessTokenExpireAt: expireAt };
  }

  static async getDataOfKey(key) {
    const data = await redis.hgetall(key);
    return data;
  }

  static async setHashMap(key, value, expire = 3600) {
    const result = await redis.hmset(key, value);
    await redis.expire(key, expire);

    return result;
  }

  static async deleteDataOfKey(key) {
    const result = await redis.hdel(key);

    return result;
  }

  static async setExpireOfKey(key, second = redisConfig.ttl) {
    const result = await redis.expire(key, second);

    return result;
  }
}
