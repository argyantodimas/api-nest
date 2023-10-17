// redis.module.ts

import { Module } from '@nestjs/common';
import { RedisService } from './redis.service';
import { RedisController } from './redis.controller';
import { redisProvider } from './redis.providers';

@Module({
  providers: [redisProvider, RedisService],
  controllers: [RedisController],
  exports: [RedisService],
})
export class RedisModule {}
