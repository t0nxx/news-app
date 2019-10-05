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
const terms_service_1 = require("./terms.service");
const pagination_filter_1 = require("../shared/pagination.filter");
const terms_dto_1 = require("./terms.dto");
const terms_update_dto_1 = require("./terms.update.dto");
let TermsController = class TermsController {
    constructor(termservice) {
        this.termservice = termservice;
    }
    getAllterms(paginate) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.termservice.getAlltermss(paginate);
        });
    }
    getOneterms(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.termservice.getOneterms(id);
        });
    }
    createNewUser(cate) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.termservice.createNewterms(cate);
        });
    }
    updateterms(id, cate) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.termservice.updateterms(id, cate);
        });
    }
    deleteterms(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.termservice.deletterms(id);
        });
    }
    getAlltermsDash(paginate) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.termservice.getAlltermsDashboard(paginate);
        });
    }
    getOnetermsDash(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.termservice.getOneterms(id);
        });
    }
    createNewUserDash(cate) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.termservice.createNewterms(cate);
        });
    }
    updatetermsDash(id, cate) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.termservice.updateterms(id, cate);
        });
    }
    deletetermsDash(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.termservice.deletterms(id);
        });
    }
};
__decorate([
    common_1.Get(),
    __param(0, common_1.Query()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [pagination_filter_1.PaginationDto]),
    __metadata("design:returntype", Promise)
], TermsController.prototype, "getAllterms", null);
__decorate([
    common_1.Get('/getOne/:id'),
    swagger_1.ApiImplicitParam({ name: 'id' }),
    __param(0, common_1.Param('id', new common_1.ParseIntPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TermsController.prototype, "getOneterms", null);
__decorate([
    swagger_1.ApiImplicitHeader({ name: 'authorization', required: true }),
    common_1.Post('/new'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [terms_dto_1.TermsDto]),
    __metadata("design:returntype", Promise)
], TermsController.prototype, "createNewUser", null);
__decorate([
    swagger_1.ApiImplicitHeader({ name: 'authorization', required: true }),
    swagger_1.ApiImplicitParam({ name: 'id' }),
    common_1.Put('/update/:id'),
    __param(0, common_1.Param('id', new common_1.ParseIntPipe())),
    __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, terms_update_dto_1.TermsUpdateDto]),
    __metadata("design:returntype", Promise)
], TermsController.prototype, "updateterms", null);
__decorate([
    swagger_1.ApiImplicitHeader({ name: 'authorization', required: true }),
    swagger_1.ApiImplicitParam({ name: 'id' }),
    common_1.Delete('/delete/:id'),
    __param(0, common_1.Param('id', new common_1.ParseIntPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TermsController.prototype, "deleteterms", null);
__decorate([
    common_1.Get('/dashboard'),
    __param(0, common_1.Query()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [pagination_filter_1.PaginationDto]),
    __metadata("design:returntype", Promise)
], TermsController.prototype, "getAlltermsDash", null);
__decorate([
    common_1.Get('/dashboard/getOne/:id'),
    swagger_1.ApiImplicitParam({ name: 'id' }),
    __param(0, common_1.Param('id', new common_1.ParseIntPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TermsController.prototype, "getOnetermsDash", null);
__decorate([
    swagger_1.ApiImplicitHeader({ name: 'authorization', required: true }),
    common_1.Post('/dashboard/new'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [terms_dto_1.TermsDto]),
    __metadata("design:returntype", Promise)
], TermsController.prototype, "createNewUserDash", null);
__decorate([
    swagger_1.ApiImplicitHeader({ name: 'authorization', required: true }),
    swagger_1.ApiImplicitParam({ name: 'id' }),
    common_1.Put('/dashboard/update/:id'),
    __param(0, common_1.Param('id', new common_1.ParseIntPipe())),
    __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, terms_update_dto_1.TermsUpdateDto]),
    __metadata("design:returntype", Promise)
], TermsController.prototype, "updatetermsDash", null);
__decorate([
    swagger_1.ApiImplicitHeader({ name: 'authorization', required: true }),
    swagger_1.ApiImplicitParam({ name: 'id' }),
    common_1.Delete('/dashboard/delete/:id'),
    __param(0, common_1.Param('id', new common_1.ParseIntPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TermsController.prototype, "deletetermsDash", null);
TermsController = __decorate([
    swagger_1.ApiUseTags('terms'),
    common_1.Controller('terms'),
    __metadata("design:paramtypes", [terms_service_1.TermsService])
], TermsController);
exports.TermsController = TermsController;
//# sourceMappingURL=terms.controller.js.map