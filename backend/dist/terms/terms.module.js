"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const terms_service_1 = require("./terms.service");
const terms_controller_1 = require("./terms.controller");
const terms_entity_1 = require("./terms.entity");
const user_module_1 = require("../user/user.module");
const typeorm_1 = require("@nestjs/typeorm");
const user_auth_middleware_1 = require("../auth/user.auth.middleware");
const maintainerOrAdmin_auth_1 = require("../auth/maintainerOrAdmin.auth");
let TermsModule = class TermsModule {
    configure(consumer) {
        consumer
            .apply(user_auth_middleware_1.UserAuthMiddleware, maintainerOrAdmin_auth_1.MaintainerOrAdminMiddleAuth)
            .exclude({ path: 'terms', method: common_1.RequestMethod.GET }, { path: 'terms/getOne/:id', method: common_1.RequestMethod.GET })
            .forRoutes(terms_controller_1.TermsController);
    }
};
TermsModule = __decorate([
    common_1.Module({
        imports: [typeorm_1.TypeOrmModule.forFeature([terms_entity_1.Terms]), user_module_1.UserModule],
        providers: [terms_service_1.TermsService],
        controllers: [terms_controller_1.TermsController],
    })
], TermsModule);
exports.TermsModule = TermsModule;
//# sourceMappingURL=terms.module.js.map