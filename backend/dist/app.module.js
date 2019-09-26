"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const auth_module_1 = require("./auth/auth.module");
const user_module_1 = require("./user/user.module");
const post_module_1 = require("./post/post.module");
const category_module_1 = require("./category/category.module");
const hashtag_module_1 = require("./hashtag/hashtag.module");
const comment_module_1 = require("./comment/comment.module");
const typeorm_1 = require("@nestjs/typeorm");
const uploader_module_1 = require("./uploader/uploader.module");
const noti_module_1 = require("./notification/noti.module");
const source_module_1 = require("./source/source.module");
const aboutUs_module_1 = require("./aboutUs/aboutUs.module");
const helpMe_module_1 = require("./helpMe/helpMe.module");
const terms_module_1 = require("./terms/terms.module");
let AppModule = class AppModule {
};
AppModule = __decorate([
    common_1.Module({
        imports: [
            auth_module_1.AuthModule,
            user_module_1.UserModule,
            post_module_1.PostModule,
            category_module_1.CategoryModule,
            hashtag_module_1.HashtagModule,
            comment_module_1.CommentModule,
            uploader_module_1.UploaderModule,
            noti_module_1.NotificationModule,
            source_module_1.SourceModule,
            helpMe_module_1.HelpMeModule,
            aboutUs_module_1.AboutUsModule,
            terms_module_1.TermsModule,
            typeorm_1.TypeOrmModule.forRoot({
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
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map