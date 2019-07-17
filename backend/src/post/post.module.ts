import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { Post } from './post.entity';
import { UserModule } from '../user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserAuthMiddleware } from '../auth/user.auth.middleware';
import { User } from '../user/user.entity';
import { PostReactions } from '../relationsEntities/postReactions.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Post, User,PostReactions]), UserModule],
  providers: [PostService],
  controllers: [PostController],
})
export class PostModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(UserAuthMiddleware)
      .exclude(
        { path: 'posts', method: RequestMethod.GET },
        { path: 'posts/getOne/:id', method: RequestMethod.GET },
      )
      .forRoutes(PostController);
  }
}
