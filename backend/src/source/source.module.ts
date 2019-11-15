import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { SourceService } from './source.service';
import { SourceController } from './source.controller';
import { Source } from './source.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserAuthMiddleware } from '../auth/user.auth.middleware';
import { MaintainerOrAdminMiddleAuth } from '../auth/maintainerOrAdmin.auth';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Source]), UserModule,
  ],
  providers: [SourceService],
  controllers: [SourceController]
})
export class SourceModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(UserAuthMiddleware, MaintainerOrAdminMiddleAuth)
      .exclude(
        { path: 'sources', method: RequestMethod.GET },
        { path: 'sources/getOne/:id', method: RequestMethod.GET },
      )
      .forRoutes(SourceController);
  }
}
