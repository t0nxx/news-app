"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const user_module_1 = require("../user/user.module");
const typeorm_1 = require("@nestjs/typeorm");
const user_auth_middleware_1 = require("../auth/user.auth.middleware");
const maintainerOrAdmin_auth_1 = require("../auth/maintainerOrAdmin.auth");
const helpMe_entity_1 = require("./helpMe.entity");
const helpMe_service_1 = require("./helpMe.service");
const helpMe_controller_1 = require("./helpMe.controller");
let HelpMeModule = class HelpMeModule {
    configure(consumer) {
        consumer
            .apply(user_auth_middleware_1.UserAuthMiddleware, maintainerOrAdmin_auth_1.MaintainerOrAdminMiddleAuth)
            .exclude({ path: 'helpMe/new', method: common_1.RequestMethod.POST })
            .forRoutes(helpMe_controller_1.HelpMeController);
    }
};
HelpMeModule = __decorate([
    common_1.Module({
        imports: [typeorm_1.TypeOrmModule.forFeature([helpMe_entity_1.HelpMe]), user_module_1.UserModule],
        providers: [helpMe_service_1.HelpMeService],
        controllers: [helpMe_controller_1.HelpMeController],
    })
], HelpMeModule);
exports.HelpMeModule = HelpMeModule;
//# sourceMappingURL=helpMe.module.js.map