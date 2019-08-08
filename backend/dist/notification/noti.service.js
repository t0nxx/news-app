"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const QueryOrderFormat_1 = require("../shared/QueryOrderFormat");
const noti_entity_1 = require("./noti.entity");
const user_entity_1 = require("../user/user.entity");
const lodash_1 = require("lodash");
const fcm_1 = require("./fcm");
let NotificationService = class NotificationService {
    constructor(notificationRepository, userRepository) {
        this.notificationRepository = notificationRepository;
        this.userRepository = userRepository;
    }
    getAllNotifications(paginate) {
        return __awaiter(this, void 0, void 0, function* () {
            const q = this.notificationRepository.createQueryBuilder('notification');
            const qAfterFormat = QueryOrderFormat_1.FormatQueryOrderAndPagination(paginate, q, ['title', 'body']);
            const [data, count] = yield qAfterFormat.getManyAndCount();
            return { data, count };
        });
    }
    getOneNotification(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const findOne = yield this.notificationRepository.findOne({ id });
            if (!findOne) {
                throw new common_1.NotFoundException('invalid id');
            }
            return { data: findOne };
        });
    }
    createNewNotification(noti) {
        return __awaiter(this, void 0, void 0, function* () {
            const users = yield this.userRepository.createQueryBuilder('user')
                .innerJoinAndSelect('user.subscribed', 'categories')
                .where(`categories.id IN (${noti.categories})`)
                .select(['user.fcmTokens'])
                .getMany();
            const tokens = users.map(e => e.fcmTokens);
            const flatArr = lodash_1.flatten(tokens);
            const splited = lodash_1.chunk(flatArr, 99);
            splited.forEach(arr => {
                arr = arr.filter(e => e.length);
                const message = {
                    notification: {
                        title: noti.title,
                        body: noti.body,
                    },
                    tokens: arr,
                };
                fcm_1.sendNotification(message);
            });
            const notification = new noti_entity_1.Notification();
            notification.title = noti.title;
            notification.body = noti.body;
            const save = yield this.notificationRepository.save(notification);
            return { data: save };
        });
    }
    deletNotification(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const findOne = yield this.notificationRepository.findOne(id);
            if (!findOne) {
                throw new common_1.NotFoundException('invalid id');
            }
            yield this.notificationRepository.delete(id);
            return { data: findOne };
        });
    }
};
NotificationService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(noti_entity_1.Notification)),
    __param(1, typeorm_1.InjectRepository(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], NotificationService);
exports.NotificationService = NotificationService;
//# sourceMappingURL=noti.service.js.map