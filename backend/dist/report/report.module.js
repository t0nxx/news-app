"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const report_service_1 = require("./report.service");
const report_controller_1 = require("./report.controller");
const report_entity_1 = require("./report.entity");
const user_module_1 = require("../user/user.module");
const typeorm_1 = require("@nestjs/typeorm");
const user_auth_middleware_1 = require("../auth/user.auth.middleware");
const comment_entity_1 = require("../comment/comment.entity");
const user_entity_1 = require("../user/user.entity");
let ReportModule = class ReportModule {
    configure(consumer) {
        consumer
            .apply(user_auth_middleware_1.UserAuthMiddleware)
            .exclude({ path: 'reports', method: common_1.RequestMethod.GET }, { path: 'reports/getOne/:id', method: common_1.RequestMethod.GET })
            .forRoutes(report_controller_1.ReportsController);
    }
};
ReportModule = __decorate([
    common_1.Module({
        imports: [typeorm_1.TypeOrmModule.forFeature([report_entity_1.Report, comment_entity_1.Comment, user_entity_1.User]), user_module_1.UserModule],
        providers: [report_service_1.ReportsService],
        controllers: [report_controller_1.ReportsController],
    })
], ReportModule);
exports.ReportModule = ReportModule;
//# sourceMappingURL=report.module.js.map