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
const helpMe_service_1 = require("./helpMe.service");
const pagination_filter_1 = require("../shared/pagination.filter");
const helpMe_dto_1 = require("./helpMe.dto");
const helpMe_update_dto_1 = require("./helpMe.update.dto");
let HelpMeController = class HelpMeController {
    constructor(helpMeervice) {
        this.helpMeervice = helpMeervice;
    }
    getAllhelpMe(paginate) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.helpMeervice.getAllhelpMes(paginate);
        });
    }
    getOnehelpMe(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.helpMeervice.getOnehelpMe(id);
        });
    }
    createNewUser(cate) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.helpMeervice.createNewhelpMe(cate);
        });
    }
    updatehelpMe(id, cate) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.helpMeervice.updatehelpMe(id, cate);
        });
    }
    deletehelpMe(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.helpMeervice.delethelpMe(id);
        });
    }
};
__decorate([
    common_1.Get(),
    swagger_1.ApiImplicitHeader({ name: 'authorization', required: true }),
    __param(0, common_1.Query()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [pagination_filter_1.PaginationDto]),
    __metadata("design:returntype", Promise)
], HelpMeController.prototype, "getAllhelpMe", null);
__decorate([
    common_1.Get('/getOne/:id'),
    swagger_1.ApiImplicitHeader({ name: 'authorization', required: true }),
    swagger_1.ApiImplicitParam({ name: 'id' }),
    __param(0, common_1.Param('id', new common_1.ParseIntPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], HelpMeController.prototype, "getOnehelpMe", null);
__decorate([
    common_1.Post('/new'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [helpMe_dto_1.HelpMeDto]),
    __metadata("design:returntype", Promise)
], HelpMeController.prototype, "createNewUser", null);
__decorate([
    swagger_1.ApiImplicitHeader({ name: 'authorization', required: true }),
    swagger_1.ApiImplicitParam({ name: 'id' }),
    common_1.Put('/update/:id'),
    __param(0, common_1.Param('id', new common_1.ParseIntPipe())),
    __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, helpMe_update_dto_1.HelpMeUpdateDto]),
    __metadata("design:returntype", Promise)
], HelpMeController.prototype, "updatehelpMe", null);
__decorate([
    swagger_1.ApiImplicitHeader({ name: 'authorization', required: true }),
    swagger_1.ApiImplicitParam({ name: 'id' }),
    common_1.Delete('/delete/:id'),
    __param(0, common_1.Param('id', new common_1.ParseIntPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], HelpMeController.prototype, "deletehelpMe", null);
HelpMeController = __decorate([
    swagger_1.ApiUseTags('helpMe'),
    common_1.Controller('helpMe'),
    __metadata("design:paramtypes", [helpMe_service_1.HelpMeService])
], HelpMeController);
exports.HelpMeController = HelpMeController;
//# sourceMappingURL=helpMe.controller.js.map