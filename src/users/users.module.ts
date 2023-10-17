import {
  Module,
  NestModule,
  RequestMethod,
  MiddlewareConsumer,
} from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

import { LoggerMiddleware } from '../common/middleware/logger.middleware';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      //.apply(cors(), helmet(), LoggerMiddleware)
      .apply(LoggerMiddleware)
      // .exclude(
      //   { path: 'users', method: RequestMethod.GET },
      //   { path: 'users', method: RequestMethod.POST },
      //   'users/(.*)',
      // )
      //.forRoutes('users');
      //forRoutes({ path: 'ab*cd', method: RequestMethod.ALL });
      .forRoutes({ path: 'users', method: RequestMethod.GET });
  }
}
