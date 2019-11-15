import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { AboutUsService } from './aboutUs.service';
import { AboutUsController } from './aboutUs.controller';
import { AboutUs } from './aboutUs.entity';
import { UserModule } from '../user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserAuthMiddleware } from '../auth/user.auth.middleware';
import { MaintainerOrAdminMiddleAuth } from '../auth/maintainerOrAdmin.auth';

@Module({
  imports: [TypeOrmModule.forFeature([AboutUs]), UserModule],
  providers: [AboutUsService],
  controllers: [AboutUsController],
})
export class AboutUsModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(UserAuthMiddleware, MaintainerOrAdminMiddleAuth)
      .exclude(
        { path: 'aboutUs', method: RequestMethod.GET },
        { path: 'aboutUs/getOne/:id', method: RequestMethod.GET },
      )
      .forRoutes(AboutUsController);
  }
}