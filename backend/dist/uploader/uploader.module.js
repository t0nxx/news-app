"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const user_module_1 = require("../user/user.module");
const user_auth_middleware_1 = require("../auth/user.auth.middleware");
const maintainerOrAdmin_auth_1 = require("../auth/maintainerOrAdmin.auth");
const uploader_service_1 = require("./uploader.service");
const uploader_controller_1 = require("./uploader.controller");
const uploader_entity_1 = require("./uploader.entity");
let UploaderModule = class UploaderModule {
    configure(consumer) {
        consumer
            .apply(user_auth_middleware_1.UserAuthMiddleware, maintainerOrAdmin_auth_1.MaintainerOrAdminMiddleAuth)
            .forRoutes(uploader_controller_1.UploaderController);
    }
};
UploaderModule = __decorate([
    common_1.Module({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([uploader_entity_1.Uploader]), user_module_1.UserModule,
        ],
        providers: [uploader_service_1.UploaderService],
        controllers: [uploader_controller_1.UploaderController],
    })
], UploaderModule);
exports.UploaderModule = UploaderModule;
//# sourceMappingURL=uploader.module.js.map