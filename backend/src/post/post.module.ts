import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { Post } from './post.entity';
import { UserModule } from '../user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserAuthMiddleware } from '../auth/user.auth.middleware';
import { User } from '../user/user.entity';
import { PostReactions } from '../relationsEntities/postReactions.entity';
import { MulterModule } from '@nestjs/platform-express';
import * as path from 'path';
import * as multer from 'multer';
import { Category } from '../category/category.entity';
import { HashTag } from '../hashtag/hashtage.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Post, User, PostReactions, Category, HashTag]), UserModule,
    MulterModule.register({

      storage: multer.diskStorage({
        destination(req, file, cb) {
          cb(null, 'uploads');
        },
        filename(req, file, cb) {
          cb(null, file.originalname + '-' + Date.now() + path.extname(file.originalname));
        },
      }),
    }),
  ],
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
