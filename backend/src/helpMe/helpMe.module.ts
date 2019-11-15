import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';

import { UserModule } from '../user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserAuthMiddleware } from '../auth/user.auth.middleware';
import { MaintainerOrAdminMiddleAuth } from '../auth/maintainerOrAdmin.auth';
import { HelpMe } from './helpMe.entity';
import { HelpMeService } from './helpMe.service';
import { HelpMeController } from './helpMe.controller';

@Module({
  imports: [TypeOrmModule.forFeature([HelpMe]), UserModule],
  providers: [HelpMeService],
  controllers: [HelpMeController],
})
export class HelpMeModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(UserAuthMiddleware, MaintainerOrAdminMiddleAuth)
      .exclude(
        { path: 'helpMe/new', method: RequestMethod.POST },
      )
      .forRoutes(HelpMeController);
  }
}