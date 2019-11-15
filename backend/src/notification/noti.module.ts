import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { UserModule } from '../user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserAuthMiddleware } from '../auth/user.auth.middleware';
import { MaintainerOrAdminMiddleAuth } from '../auth/maintainerOrAdmin.auth';
import { NotificationController } from './noti.controller';
import { Notification } from './noti.entity';
import { NotificationService } from './noti.service';
import { User } from '../user/user.entity';
@Module({
    imports: [TypeOrmModule.forFeature([Notification,User]), UserModule],
    providers: [NotificationService],
    controllers: [NotificationController],
})
export class NotificationModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        // consumer
        //     .apply(UserAuthMiddleware, MaintainerOrAdminMiddleAuth)
        //     .forRoutes(NotificationController);
    }
}