import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { TermsService } from './terms.service';
import { TermsController } from './terms.controller';
import { Terms } from './terms.entity';
import { UserModule } from '../user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserAuthMiddleware } from '../auth/user.auth.middleware';
import { MaintainerOrAdminMiddleAuth } from '../auth/maintainerOrAdmin.auth';

@Module({
  imports: [TypeOrmModule.forFeature([Terms]), UserModule],
  providers: [TermsService],
  controllers: [TermsController],
})
export class TermsModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(UserAuthMiddleware, MaintainerOrAdminMiddleAuth)
      .exclude(
        { path: 'terms', method: RequestMethod.GET },
        { path: 'terms/getOne/:id', method: RequestMethod.GET },
      )
      .forRoutes(TermsController);
  }
}