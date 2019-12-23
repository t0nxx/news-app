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
import { UploaderModule } from './uploader/uploader.module';
import { NotificationModule } from './notification/noti.module';
import { SourceModule } from './source/source.module';
import { AboutUsModule } from './aboutUs/aboutUs.module';
import { HelpMeModule } from './helpMe/helpMe.module';
import { TermsModule } from './terms/terms.module';
import { ReportModule } from './report/report.module';

@Module({
  imports: [
    AuthModule,
    UserModule,
    PostModule,
    CategoryModule,
    HashtagModule,
    CommentModule,
    UploaderModule,
    NotificationModule,
    SourceModule,
    HelpMeModule,
    AboutUsModule,
    ReportModule,
    TermsModule,
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
