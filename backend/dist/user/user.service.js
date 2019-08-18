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
const user_entity_1 = require("./user.entity");
const typeorm_2 = require("typeorm");
const bcryptjs_1 = require("bcryptjs");
const generate_jwt_1 = require("../shared/generate.jwt");
const category_entity_1 = require("../category/category.entity");
const QueryOrderFormat_1 = require("../shared/QueryOrderFormat");
const sendMail_1 = require("../shared/sendMail");
let UserService = class UserService {
    constructor(userRepository, categoryRepository) {
        this.userRepository = userRepository;
        this.categoryRepository = categoryRepository;
    }
    getAllUsers(paginate) {
        return __awaiter(this, void 0, void 0, function* () {
            const q = this.userRepository.createQueryBuilder('user');
            q.select(['user.id', 'user.fullName', 'user.email', 'user.number', 'user.role', 'user.createdAt', 'user.updatedAt']);
            const qAfterFormat = QueryOrderFormat_1.FormatQueryOrderAndPagination(paginate, q, ['email', 'role', 'number', 'fullName']);
            const [data, count] = yield qAfterFormat.getManyAndCount();
            return { data, count };
        });
    }
    getOneUser(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const findOne = yield this.userRepository.findOne({ id: userId }, { relations: ['subscribed'] });
            if (!findOne) {
                throw new common_1.NotFoundException('invalid id');
            }
            const { id, fullName, email, number, role, subscribed } = findOne;
            return {
                data: {
                    id,
                    fullName,
                    email,
                    number,
                    joined: findOne.createdAt,
                    role,
                    subscribed,
                },
            };
        });
    }
    createNewUser(userDto) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newUser = new user_entity_1.User();
                Object.assign(newUser, userDto);
                newUser.password = yield bcryptjs_1.hashSync(newUser.password, 10);
                const saveUser = yield this.userRepository.save(newUser);
                return {
                    data: {
                        id: saveUser.id,
                        fullName: saveUser.fullName,
                        email: saveUser.email,
                        number: saveUser.number,
                        profileImage: saveUser.profileImage,
                        joined: saveUser.createdAt,
                    },
                    token: yield generate_jwt_1.generateJwtToken({
                        id: saveUser.id,
                        email: saveUser.email,
                        changePassCode: saveUser.changePassCode,
                    }),
                };
            }
            catch (error) {
                if (error.errno === 1062) {
                    throw new common_1.BadRequestException('email alreardy exist');
                }
            }
        });
    }
    updateUser(id, updateUser) {
        return __awaiter(this, void 0, void 0, function* () {
            const findOne = yield this.userRepository.findOne(id);
            if (!findOne) {
                throw new common_1.NotFoundException('invalid id');
            }
            if (Object.keys(updateUser).length <= 0) {
                throw new common_1.BadRequestException('no data provided');
            }
            try {
                if (updateUser.password) {
                    updateUser.password = yield bcryptjs_1.hashSync(updateUser.password, 10);
                    const changePassCode = Math.floor(100000 + Math.random() * 900000);
                    yield this.userRepository.update({ id: findOne.id }, { changePassCode });
                }
                yield this.userRepository.update({ id: findOne.id }, updateUser);
                const updated = yield this.userRepository.findOne(id);
                const { fullName, email, number, changePassCode, profileImage } = updated;
                return {
                    data: {
                        fullName,
                        email,
                        number,
                        joined: findOne.createdAt,
                        profileImage,
                    },
                    token: yield generate_jwt_1.generateJwtToken({
                        id,
                        email,
                        changePassCode,
                    }),
                };
            }
            catch (error) {
                if (error.errno === 1062) {
                    throw new common_1.BadRequestException('email alreardy exist');
                }
            }
        });
    }
    addNotificationToken(id, token) {
        return __awaiter(this, void 0, void 0, function* () {
            const findOne = yield this.userRepository.findOne(id);
            if (!findOne) {
                throw new common_1.NotFoundException('invalid id');
            }
            if (token.oldToken) {
                findOne.fcmTokens.splice(findOne.fcmTokens.indexOf(token.oldToken, 1));
            }
            if (findOne.fcmTokens == null) {
                findOne.fcmTokens = [];
            }
            findOne.fcmTokens.push(token.newToken);
            yield this.userRepository.save(findOne);
            return 'done . token added';
        });
    }
    deletUser(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const findOne = yield this.userRepository.findOne({ id: userId });
            if (!findOne) {
                throw new common_1.NotFoundException('invalid id');
            }
            const { id } = findOne;
            yield this.userRepository.delete(id);
            return { data: { id } };
        });
    }
    promoteUserLevel(id, newRole) {
        return __awaiter(this, void 0, void 0, function* () {
            const findOne = yield this.userRepository.findOne(id);
            if (!findOne) {
                throw new common_1.NotFoundException('invalid id');
            }
            let role;
            switch (newRole) {
                case 'admin':
                    role = user_entity_1.UserRole.ADMIN;
                    break;
                case 'maintainer':
                    role = user_entity_1.UserRole.MAINTAINER;
                    break;
                default:
                    role = user_entity_1.UserRole.USER;
                    break;
            }
            yield this.userRepository.update({ id: findOne.id }, { role });
            const updated = yield this.userRepository.findOne(id);
            return { data: updated };
        });
    }
    subscribeToCategories(id, categories) {
        return __awaiter(this, void 0, void 0, function* () {
            const findOne = yield this.userRepository.findOne(id, { relations: ['subscribed'] });
            if (!findOne) {
                throw new common_1.NotFoundException('invalid id');
            }
            const result = yield this.categoryRepository.findByIds(categories);
            findOne.subscribed.push(...result);
            const subDone = yield this.userRepository.save(findOne);
            return { data: 'subscribe Done' };
        });
    }
    UnsubscribeFromCategories(id, categories) {
        return __awaiter(this, void 0, void 0, function* () {
            const findOne = yield this.userRepository.findOne(id, { relations: ['subscribed'] });
            if (!findOne) {
                throw new common_1.NotFoundException('invalid id');
            }
            const result = yield this.categoryRepository.findByIds(categories);
            const filtered = findOne.subscribed.filter(element => !result.find(remove => remove.id == element.id));
            findOne.subscribed = filtered;
            const UnsubDone = yield this.userRepository.save(findOne);
            return { data: 'Unsubscribe Done' };
        });
    }
    forgetPassword(body) {
        return __awaiter(this, void 0, void 0, function* () {
            const findOne = yield this.userRepository.findOne({ email: body.email });
            if (!findOne) {
                throw new common_1.BadRequestException('email not found');
            }
            findOne.changePassCode = Math.floor(100000 + Math.random() * 900000);
            yield this.userRepository.save(findOne);
            sendMail_1.sendMail(findOne.email, findOne.changePassCode);
            return { data: 'Done. reset code was sent to your email' };
        });
    }
    validResetCode(resDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const findOne = yield this.userRepository.findOne({ email: resDto.email });
            if (!findOne) {
                throw new common_1.BadRequestException('email not found');
            }
            if (findOne.changePassCode !== parseInt(resDto.resetCode)) {
                {
                    throw new common_1.BadRequestException('bad reset code ');
                }
            }
            return { data: 'Good Code' };
        });
    }
    changePasswordAfterResetode(resAndPAss) {
        return __awaiter(this, void 0, void 0, function* () {
            const findOne = yield this.userRepository.findOne({ email: resAndPAss.email });
            if (!findOne) {
                throw new common_1.BadRequestException('email not found');
            }
            if (findOne.changePassCode !== parseInt(resAndPAss.resetCode)) {
                {
                    throw new common_1.BadRequestException('bad reset code ');
                }
            }
            findOne.password = yield bcryptjs_1.hashSync(resAndPAss.password, 10);
            yield this.userRepository.save(findOne);
            return { data: 'Done . Password changed , please login again' };
        });
    }
};
UserService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(user_entity_1.User)),
    __param(1, typeorm_1.InjectRepository(category_entity_1.Category)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map