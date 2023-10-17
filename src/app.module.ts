import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { CacheModule } from '@nestjs/cache-manager';

import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { RedisModule } from './redis/redis.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env'],
      isGlobal: true,
    }),

    //caching with server RAM
    CacheModule.register({ isGlobal: true }),
    //caching with redis server
    // CacheModule.registerAsync({
    //   isGlobal: true,
    //   imports: [ConfigModule],
    //   useFactory: async (configService: ConfigService) => ({
    //     ttl: configService.get('CACHE_TTL'),
    //     store: (await redisStore({
    //       url: configService.get('REDIS_URL'),
    //     })) as unknown as CacheStore,
    //   }),
    //   inject: [ConfigService],
    // }),

    UsersModule,
    AuthModule,
    RedisModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
