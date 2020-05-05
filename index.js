const Redis = require('ioredis');

module.exports = (options = {}) => {
  const redisOption = options.redis || {};
  /**
   * if redis instance is passed as option
   * then no need to initialize new instance
   */
  const redis =
    redisOption instanceof Redis ? redisOption : new Redis(options.redis);

  return {
    async put(key, data, tags, ttl) {
      if (tags.length) {
        // cache data with tag
        const multi = redis.multi();
        multi.setex(key, ttl, data);
        tags.forEach((tag) => {
          multi.sadd(`tag:${tag}`, key);
        });
        await multi.exec();
      } else {
        // cache data without tag
        await redis.setex(key, ttl, data);
      }
    },
  };
};
