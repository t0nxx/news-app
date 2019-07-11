import { Module, MiddlewareConsumer, RequestMethod, NestModule } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserAuthMiddleware } from 'src/auth/user.auth.middleware';
import { AdminMiddleAuth } from 'src/auth/admin.auth.middleware';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Category } from 'src/category/category.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Category])],
  providers: [UserService],
  controllers: [UserController],
  exports: [UserService], /* for using in another module */
})
export class UserModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(UserAuthMiddleware)
      .forRoutes(
        { path: 'users/me', method: RequestMethod.GET },
        { path: 'users/update/me', method: RequestMethod.PUT },
        { path: 'users/delete/me', method: RequestMethod.DELETE } ,
        { path: 'users/update/me/subscribe', method: RequestMethod.POST } ,
        { path: 'users/update/me/unsubscribe', method: RequestMethod.POST } ,
      );
    consumer
      .apply(UserAuthMiddleware, AdminMiddleAuth)
      .forRoutes(
        { path: 'users', method: RequestMethod.GET },
        { path: 'users/promote', method: RequestMethod.GET },
      );
  }
}
