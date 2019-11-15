import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { ReportsService } from './report.service';
import { ReportsController } from './report.controller';
import { Report } from './report.entity';
import { UserModule } from '../user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserAuthMiddleware } from '../auth/user.auth.middleware';
import { MaintainerOrAdminMiddleAuth } from '../auth/maintainerOrAdmin.auth';
import { Comment } from '../comment/comment.entity';
import { User } from '../user/user.entity';
@Module({
  imports: [TypeOrmModule.forFeature([Report, Comment, User]), UserModule],
  providers: [ReportsService],
  controllers: [ReportsController],
})
export class ReportModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(UserAuthMiddleware)
      .exclude(
        { path: 'reports', method: RequestMethod.GET },
        { path: 'reports/getOne/:id', method: RequestMethod.GET },
      )
      .forRoutes(ReportsController);
  }
}