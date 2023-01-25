const Redis = require('ioredis');
const password = process.env.REDIS_PASSWORD;

const redis = new Redis({
    host: 'redis-12255.c54.ap-northeast-1-2.ec2.cloud.redislabs.com',
    port: 12255,
    password
});

module.exports = redis;