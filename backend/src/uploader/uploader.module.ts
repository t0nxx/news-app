import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MulterModule } from '@nestjs/platform-express';
import * as path from 'path';
import * as multer from 'multer';
import { UserModule } from '../user/user.module';
import { UserAuthMiddleware } from '../auth/user.auth.middleware';
import { MaintainerOrAdminMiddleAuth } from '../auth/maintainerOrAdmin.auth';
import { UploaderService } from './uploader.service';
import { UploaderController } from './uploader.controller';
import { Uploader } from './uploader.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([Uploader]), UserModule,
        // MulterModule.register({

        //     storage: multer.diskStorage({
        //         destination(req, file, cb) {
        //             cb(null, 'uploads');
        //         },
        //         filename(req, file, cb) {
        //             cb(null, file.originalname + '-' + Date.now() + path.extname(file.originalname));
        //         },
        //     }),
        // }),
    ],
    providers: [UploaderService],
    controllers: [UploaderController],
})
export class UploaderModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(UserAuthMiddleware, MaintainerOrAdminMiddleAuth)
            .forRoutes(UploaderController);
    }
}
