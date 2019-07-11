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
let UserService = class UserService {
    constructor(userRepository, categoryRepository) {
        this.userRepository = userRepository;
        this.categoryRepository = categoryRepository;
    }
    getAllUsers(paginate) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!paginate.page) {
                paginate.page = 1;
            }
            if (!paginate.limit) {
                paginate.limit = 10;
            }
            const [data, count] = yield this.userRepository.findAndCount({
                select: ['id', 'firstName', 'lastName', 'email', 'number', 'createdAt'],
                take: paginate.limit,
                skip: paginate.page * (paginate.page - 1)
            });
            return { data, count };
        });
    }
    getOneUser(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const findOne = yield this.userRepository.findOne({ id: userId }, { relations: ['subscribed'] });
            if (!findOne) {
                throw new common_1.NotFoundException('invalid id');
            }
            const { id, firstName, lastName, email, number, role, subscribed } = findOne;
            return {
                data: {
                    id,
                    firstName,
                    lastName,
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
                        firstName: saveUser.firstName,
                        lastName: saveUser.lastName,
                        email: saveUser.email,
                        number: saveUser.number,
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
                const { firstName, lastName, email, number, changePassCode } = updated;
                return {
                    data: {
                        firstName,
                        lastName,
                        email,
                        number,
                        joined: findOne.createdAt,
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
    deletUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const findOne = yield this.userRepository.findOne(id);
            if (!findOne) {
                throw new common_1.NotFoundException('invalid id');
            }
            yield this.userRepository.delete(id);
            return 'done . user deleted';
        });
    }
    promoteUserLevel(id, newRole) {
        return __awaiter(this, void 0, void 0, function* () {
            const findOne = yield this.userRepository.findOne(id);
            if (!findOne) {
                throw new common_1.NotFoundException('invalid id');
            }
            switch (newRole) {
                case 'ADMIN':
                    findOne.role = user_entity_1.UserRole.ADMIN;
                    break;
                case 'MAINTAINER':
                    findOne.role = user_entity_1.UserRole.MAINTAINER;
                    break;
                default:
                    findOne.role = user_entity_1.UserRole.USER;
                    break;
            }
            yield this.userRepository.save(findOne);
            return 'done role upgraded';
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
            return 'subscribe Done';
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
            return 'Unsubscribe Done';
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