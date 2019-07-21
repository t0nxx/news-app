import { Module, MiddlewareConsumer, RequestMethod, NestModule } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';
import { UserModule } from '../user/user.module';
import { Comment } from './comment.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserAuthMiddleware } from 'src/auth/user.auth.middleware';

@Module({
  imports: [TypeOrmModule.forFeature([Comment]), UserModule],
  providers: [CommentService],
  controllers: [CommentController]
})
export class CommentModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(UserAuthMiddleware)
      .exclude(
        { path: 'comments', method: RequestMethod.GET },
        { path: 'comments/replies', method: RequestMethod.GET },
        { path: 'comments/getOne/:id', method: RequestMethod.GET },
      )
      .forRoutes(CommentController);
  }
}
