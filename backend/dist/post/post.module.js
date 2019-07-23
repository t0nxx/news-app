"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const post_service_1 = require("./post.service");
const post_controller_1 = require("./post.controller");
const post_entity_1 = require("./post.entity");
const user_module_1 = require("../user/user.module");
const typeorm_1 = require("@nestjs/typeorm");
const user_auth_middleware_1 = require("../auth/user.auth.middleware");
const user_entity_1 = require("../user/user.entity");
const postReactions_entity_1 = require("../relationsEntities/postReactions.entity");
const platform_express_1 = require("@nestjs/platform-express");
const path = require("path");
const multer = require("multer");
const category_entity_1 = require("../category/category.entity");
const hashtage_entity_1 = require("../hashtag/hashtage.entity");
const maintainerOrAdmin_auth_1 = require("../auth/maintainerOrAdmin.auth");
let PostModule = class PostModule {
    configure(consumer) {
        consumer
            .apply(user_auth_middleware_1.UserAuthMiddleware, maintainerOrAdmin_auth_1.MaintainerOrAdminMiddleAuth)
            .exclude({ path: 'posts', method: common_1.RequestMethod.GET }, { path: 'posts/getOne/:id', method: common_1.RequestMethod.GET })
            .forRoutes(post_controller_1.PostController);
    }
};
PostModule = __decorate([
    common_1.Module({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([post_entity_1.Post, user_entity_1.User, postReactions_entity_1.PostReactions, category_entity_1.Category, hashtage_entity_1.HashTag]), user_module_1.UserModule,
            platform_express_1.MulterModule.register({
                storage: multer.diskStorage({
                    destination(req, file, cb) {
                        cb(null, 'uploads');
                    },
                    filename(req, file, cb) {
                        cb(null, file.originalname + '-' + Date.now() + path.extname(file.originalname));
                    },
                }),
            }),
        ],
        providers: [post_service_1.PostService],
        controllers: [post_controller_1.PostController],
    })
], PostModule);
exports.PostModule = PostModule;
//# sourceMappingURL=post.module.js.map