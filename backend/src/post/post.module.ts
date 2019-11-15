import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { Post } from './post.entity';
import { UserModule } from '../user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserAuthMiddleware } from '../auth/user.auth.middleware';
import { User } from '../user/user.entity';
import { PostReactions } from '../relationsEntities/postReactions.entity';
import { Category } from '../category/category.entity';
import { HashTag } from '../hashtag/hashtage.entity';
import { MaintainerOrAdminMiddleAuth } from '../auth/maintainerOrAdmin.auth';
import { Source } from '../source/source.entity';
import { Comment } from '../comment/comment.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Post, User, PostReactions, Category, HashTag, Source, Comment]), UserModule,
  ],
  providers: [PostService],
  controllers: [PostController],
})
export class PostModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(UserAuthMiddleware, MaintainerOrAdminMiddleAuth)
      .exclude(
        { path: 'posts', method: RequestMethod.GET },
        { path: 'posts/getOne/:id', method: RequestMethod.GET },
        { path: 'posts/getOne/mobile/:id', method: RequestMethod.GET },
        { path: 'posts/mySubscriptions', method: RequestMethod.GET },
        { path: 'posts/bookmark/:id', method: RequestMethod.PUT },
        { path: 'posts/unbookmark/:id', method: RequestMethod.PUT },
        { path: 'posts/reactions/:id', method: RequestMethod.POST },
      )
      .forRoutes(PostController)
      .apply(UserAuthMiddleware)
      .forRoutes(
        { path: 'posts/mySubscriptions', method: RequestMethod.GET },
        { path: 'posts/bookmark/:id', method: RequestMethod.PUT },
        { path: 'posts/unbookmark/:id', method: RequestMethod.PUT },
        { path: 'posts/reactions/:id', method: RequestMethod.POST },
      );
  }
}
