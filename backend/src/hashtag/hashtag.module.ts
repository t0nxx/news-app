import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { HashtagService } from './hashtag.service';
import { HashtagController } from './hashtag.controller';
import { HashTag } from './hashtage.entity';
import { UserModule } from 'src/user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserAuthMiddleware } from 'src/auth/user.auth.middleware';
import { MaintainerOrAdminMiddleAuth } from 'src/auth/maintainerOrAdmin.auth';

@Module({
  imports: [TypeOrmModule.forFeature([HashTag]), UserModule],
  providers: [HashtagService],
  controllers: [HashtagController],
})
export class HashtagModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(UserAuthMiddleware, MaintainerOrAdminMiddleAuth)
      .exclude(
        { path: 'hashtags', method: RequestMethod.GET },
        { path: 'hashtags/getOne/:id', method: RequestMethod.GET },
      )
      .forRoutes(HashtagController);
  }
}