import { Module, MiddlewareConsumer, RequestMethod, NestModule } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';
import { UserModule } from '../user/user.module';
import { Comment } from './comment.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserAuthMiddleware } from '../auth/user.auth.middleware';
import { Post } from '../post/post.entity';
import { User } from '../user/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Comment,Post,User]), UserModule],
  providers: [CommentService],
  controllers: [CommentController]
})
export class CommentModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(UserAuthMiddleware)
      .exclude(
        { path: 'comments', method: RequestMethod.GET },
        { path: 'comments/getOne/:id', method: RequestMethod.GET },
      )
      .forRoutes(CommentController);
  }
}
