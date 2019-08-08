"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const user_service_1 = require("./user.service");
const user_controller_1 = require("./user.controller");
const user_auth_middleware_1 = require("../auth/user.auth.middleware");
const admin_auth_middleware_1 = require("../auth/admin.auth.middleware");
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("./user.entity");
const category_entity_1 = require("../category/category.entity");
let UserModule = class UserModule {
    configure(consumer) {
        consumer
            .apply(user_auth_middleware_1.UserAuthMiddleware)
            .forRoutes({ path: 'users/me', method: common_1.RequestMethod.GET }, { path: 'users/update/me', method: common_1.RequestMethod.PUT }, { path: 'users/update/me/addNotificationToken', method: common_1.RequestMethod.PUT }, { path: 'users/delete/me', method: common_1.RequestMethod.DELETE }, { path: 'users/update/me/subscribe', method: common_1.RequestMethod.PUT }, { path: 'users/update/me/unsubscribe', method: common_1.RequestMethod.PUT });
        consumer
            .apply(user_auth_middleware_1.UserAuthMiddleware, admin_auth_middleware_1.AdminMiddleAuth)
            .forRoutes({ path: 'users', method: common_1.RequestMethod.GET }, { path: 'users/promote', method: common_1.RequestMethod.PUT }, { path: 'users/delete/:id', method: common_1.RequestMethod.DELETE });
    }
};
UserModule = __decorate([
    common_1.Module({
        imports: [typeorm_1.TypeOrmModule.forFeature([user_entity_1.User, category_entity_1.Category])],
        providers: [user_service_1.UserService],
        controllers: [user_controller_1.UserController],
        exports: [user_service_1.UserService],
    })
], UserModule);
exports.UserModule = UserModule;
//# sourceMappingURL=user.module.js.map