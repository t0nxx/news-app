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
const swagger_1 = require("@nestjs/swagger");
const user_service_1 = require("./user.service");
const user_dto_1 = require("./user.dto");
const user_update_dto_1 = require("./user.update.dto");
const user_decorator_1 = require("./user.decorator");
const pagination_filter_1 = require("../shared/pagination.filter");
const platform_express_1 = require("@nestjs/platform-express");
const awsUploader_1 = require("../shared/awsUploader");
const notiToken_dto_1 = require("./notiToken.dto");
let UserController = class UserController {
    constructor(userService) {
        this.userService = userService;
    }
    getAllUsers(paginate) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.userService.getAllUsers(paginate);
        });
    }
    getOneUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.userService.getOneUser(id);
        });
    }
    getMe(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.userService.getOneUser(id);
        });
    }
    createNewUser(userDto, image) {
        return __awaiter(this, void 0, void 0, function* () {
            if (userDto.img) {
                userDto.profileImage = yield awsUploader_1.UploadToS3Base64(userDto.img);
            }
            return this.userService.createNewUser(userDto);
        });
    }
    updateUser(id, updateUserDto) {
        return __awaiter(this, void 0, void 0, function* () {
            if (updateUserDto.img) {
                updateUserDto.profileImage = yield awsUploader_1.UploadToS3(updateUserDto.img);
            }
            return yield this.userService.updateUser(id, updateUserDto);
        });
    }
    updateUserNotificationToken(id, updateUserNotiTokenDto) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.userService.addNotificationToken(id, updateUserNotiTokenDto);
        });
    }
    deletPie(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.userService.deletUser(id);
        });
    }
    deletUserDashboard(id, UserId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.userService.deletUser(UserId);
        });
    }
    promoteUserLevel(id, role) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.userService.promoteUserLevel(id, role);
        });
    }
    subscribeToCategories(id, categories) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.userService.subscribeToCategories(id, categories);
        });
    }
    UnsubscribeFromCategories(id, categories) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.userService.UnsubscribeFromCategories(id, categories);
        });
    }
    forgetPassword(body) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.userService.forgetPassword(body);
        });
    }
    validResetCode(resDto) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.userService.validResetCode(resDto);
        });
    }
    changePasswordAfterResetode(resAndPAss) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.userService.changePasswordAfterResetode(resAndPAss);
        });
    }
};
__decorate([
    swagger_1.ApiImplicitHeader({ name: 'authorization', required: true }),
    common_1.Get(),
    __param(0, common_1.Query()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [pagination_filter_1.PaginationDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getAllUsers", null);
__decorate([
    swagger_1.ApiImplicitHeader({ name: 'authorization', required: true }),
    common_1.Get('/getOne/:id'),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getOneUser", null);
__decorate([
    swagger_1.ApiImplicitHeader({ name: 'authorization', required: true }),
    common_1.Get('/me'),
    __param(0, user_decorator_1.User('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getMe", null);
__decorate([
    common_1.Post('/new'),
    common_1.UseInterceptors(platform_express_1.FileInterceptor('image')),
    __param(0, common_1.Body()), __param(1, common_1.UploadedFile()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_dto_1.UserDto, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "createNewUser", null);
__decorate([
    swagger_1.ApiImplicitHeader({ name: 'authorization', required: true }),
    common_1.Put('/update/me'),
    common_1.UseInterceptors(platform_express_1.FileInterceptor('image')),
    __param(0, user_decorator_1.User('id')),
    __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, user_update_dto_1.UserUpdateDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "updateUser", null);
__decorate([
    swagger_1.ApiImplicitHeader({ name: 'authorization', required: true }),
    common_1.Put('/update/me/addNotificationToken'),
    __param(0, user_decorator_1.User('id')),
    __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, notiToken_dto_1.NotiTokenDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "updateUserNotificationToken", null);
__decorate([
    swagger_1.ApiImplicitHeader({ name: 'authorization', required: true }),
    common_1.Delete('/delete/me'),
    swagger_1.ApiImplicitParam({ name: 'id' }),
    __param(0, user_decorator_1.User('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "deletPie", null);
__decorate([
    common_1.Delete('/delete/:id'),
    swagger_1.ApiImplicitParam({ name: 'id' }),
    __param(0, user_decorator_1.User('id')), __param(1, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "deletUserDashboard", null);
__decorate([
    swagger_1.ApiImplicitHeader({ name: 'authorization', required: true }),
    swagger_1.ApiImplicitQuery({ name: 'id', type: 'number', required: true }),
    swagger_1.ApiImplicitQuery({ name: 'role', enum: ['ADMIN', 'MAINTAINER', 'USER'], required: true }),
    common_1.Put('/promote/:id'),
    __param(0, common_1.Param('id', new common_1.ParseIntPipe())),
    __param(1, common_1.Body('role')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "promoteUserLevel", null);
__decorate([
    swagger_1.ApiImplicitHeader({ name: 'authorization', required: true }),
    common_1.Put('/update/me/subscribe'),
    __param(0, user_decorator_1.User('id')),
    __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Array]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "subscribeToCategories", null);
__decorate([
    swagger_1.ApiImplicitHeader({ name: 'authorization', required: true }),
    common_1.Put('/update/me/unsubscribe'),
    __param(0, user_decorator_1.User('id')),
    __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Array]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "UnsubscribeFromCategories", null);
__decorate([
    common_1.Post('/forgetpassword'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "forgetPassword", null);
__decorate([
    common_1.Post('/forgetpassword/resetcode'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_dto_1.resetDTo]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "validResetCode", null);
__decorate([
    common_1.Post('/forgetpassword/resetcode/changepassword'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_dto_1.resetDToAnddPass]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "changePasswordAfterResetode", null);
UserController = __decorate([
    swagger_1.ApiUseTags('users'),
    common_1.Controller('users'),
    __metadata("design:paramtypes", [user_service_1.UserService])
], UserController);
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map