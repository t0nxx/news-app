"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const comment_service_1 = require("./comment.service");
const comment_controller_1 = require("./comment.controller");
const user_module_1 = require("../user/user.module");
const comment_entity_1 = require("./comment.entity");
const typeorm_1 = require("@nestjs/typeorm");
const user_auth_middleware_1 = require("../auth/user.auth.middleware");
const post_entity_1 = require("../post/post.entity");
const user_entity_1 = require("../user/user.entity");
let CommentModule = class CommentModule {
    configure(consumer) {
        consumer
            .apply(user_auth_middleware_1.UserAuthMiddleware)
            .exclude({ path: 'comments', method: common_1.RequestMethod.GET }, { path: 'comments/getOne/:id', method: common_1.RequestMethod.GET })
            .forRoutes(comment_controller_1.CommentController);
    }
};
CommentModule = __decorate([
    common_1.Module({
        imports: [typeorm_1.TypeOrmModule.forFeature([comment_entity_1.Comment, post_entity_1.Post, user_entity_1.User]), user_module_1.UserModule],
        providers: [comment_service_1.CommentService],
        controllers: [comment_controller_1.CommentController]
    })
], CommentModule);
exports.CommentModule = CommentModule;
//# sourceMappingURL=comment.module.js.map