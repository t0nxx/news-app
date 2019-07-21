import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { PostModule } from './post/post.module';
import { CategoryModule } from './category/category.module';
import { HashtagModule } from './hashtag/hashtag.module';
import { CommentModule } from './comment/comment.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    AuthModule,
    UserModule,
    PostModule,
    CategoryModule,
    HashtagModule,
    CommentModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '123456',
      database: 'news_app',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
      logging: true,
      charset: 'UTF8_GENERAL_CI',
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
