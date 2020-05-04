const Redis = require('ioredis');

class TaggedCache {
  constructor(options = {}) {
    const redisOption = options.redis || {};
    /**
     * if redis instance is passed as option
     * then no need to initialize new instance
     */
    this.redis =
      redisOption instanceof Redis ? redisOption : new Redis(options.redis);
  }
}

module.exports = TaggedCache;
