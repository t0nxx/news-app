"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const hashtag_service_1 = require("./hashtag.service");
const hashtag_controller_1 = require("./hashtag.controller");
const hashtage_entity_1 = require("./hashtage.entity");
const user_module_1 = require("../user/user.module");
const typeorm_1 = require("@nestjs/typeorm");
const user_auth_middleware_1 = require("../auth/user.auth.middleware");
const maintainerOrAdmin_auth_1 = require("../auth/maintainerOrAdmin.auth");
let HashtagModule = class HashtagModule {
    configure(consumer) {
        consumer
            .apply(user_auth_middleware_1.UserAuthMiddleware, maintainerOrAdmin_auth_1.MaintainerOrAdminMiddleAuth)
            .exclude({ path: 'hashtags', method: common_1.RequestMethod.GET }, { path: 'hashtags/getOne/:id', method: common_1.RequestMethod.GET })
            .forRoutes(hashtag_controller_1.HashtagController);
    }
};
HashtagModule = __decorate([
    common_1.Module({
        imports: [typeorm_1.TypeOrmModule.forFeature([hashtage_entity_1.HashTag]), user_module_1.UserModule],
        providers: [hashtag_service_1.HashtagService],
        controllers: [hashtag_controller_1.HashtagController],
    })
], HashtagModule);
exports.HashtagModule = HashtagModule;
//# sourceMappingURL=hashtag.module.js.map