import { Inject, Injectable } from '@nestjs/common';
import { RedisClient } from './redis.providers';

@Injectable()
export class RedisService {
  public constructor(
    @Inject('REDIS_CLIENT')
    private readonly client: RedisClient,
  ) {}

  async set(key: string, value: string, expirationSeconds: number) {
    try {
      const result = await this.client.set(key, value, 'EX', expirationSeconds);
      return result;
    } catch (error) {
      return error;
    }
  }

  async get(key: string): Promise<string | null> {
    return await this.client.get(key);
  }
}
