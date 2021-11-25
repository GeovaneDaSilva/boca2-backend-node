import Redis from 'ioredis'
import { IRedis } from './../infra/db/redis/cache-redis'
export class RedisCache implements IRedis {
    private readonly redis
    constructor () {
        this.redis = new Redis({
            host: process.env.REDIS_HOST,
            port: 6379,
            keyPrefix: 'cache:',
        })
    }

    async get (key: any): Promise<void> {
        const value = await this.redis.get(key)
        return value ? JSON.parse(value) : null
    }
      async set (key: any, value: any, timeExp: any): Promise<void> {
        return await this.redis.set(key, JSON.stringify(value), 'EX', timeExp)
    }

    async del (key: any): Promise<void> {
        return this.redis.del(key)
    }    

    async delPrefix (prefix: any): Promise<void> {
        const keys = (await this.redis.keys(`cache:${prefix}:*`)).map((key) =>
        key.replace("cache:", ""))
        return this.redis.del(keys)
    }  
}