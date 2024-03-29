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
const noti_controller_1 = require("./noti.controller");
const noti_entity_1 = require("./noti.entity");
const noti_service_1 = require("./noti.service");
const user_entity_1 = require("../user/user.entity");
let NotificationModule = class NotificationModule {
    configure(consumer) {
    }
};
NotificationModule = __decorate([
    common_1.Module({
        imports: [typeorm_1.TypeOrmModule.forFeature([noti_entity_1.Notification, user_entity_1.User]), user_module_1.UserModule],
        providers: [noti_service_1.NotificationService],
        controllers: [noti_controller_1.NotificationController],
    })
], NotificationModule);
exports.NotificationModule = NotificationModule;
//# sourceMappingURL=noti.module.js.map