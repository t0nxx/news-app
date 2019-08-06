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
const source_service_1 = require("./source.service");
const source_dto_1 = require("./source.dto");
const pagination_filter_1 = require("../shared/pagination.filter");
const platform_express_1 = require("@nestjs/platform-express");
const awsUploader_1 = require("../shared/awsUploader");
let SourceController = class SourceController {
    constructor(sourceService) {
        this.sourceService = sourceService;
    }
    getAllSources(paginate) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.sourceService.getAllSources(paginate);
        });
    }
    getOneSource(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.sourceService.getOneSource(id);
        });
    }
    createNewSource(cate, files) {
        return __awaiter(this, void 0, void 0, function* () {
            if (files) {
                if (files.length > 0) {
                    cate.backgroundImage = yield awsUploader_1.UploadToS3(files[0]);
                }
            }
            return this.sourceService.createNewSource(cate);
        });
    }
    updateSource(id, cate, files) {
        return __awaiter(this, void 0, void 0, function* () {
            if (files) {
                if (files.length > 0) {
                    cate.backgroundImage = yield awsUploader_1.UploadToS3(files[0]);
                }
            }
            return this.sourceService.updateSource(id, cate);
        });
    }
    deleteSource(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.sourceService.deletSource(id);
        });
    }
};
__decorate([
    common_1.Get(),
    __param(0, common_1.Query()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [pagination_filter_1.PaginationDto]),
    __metadata("design:returntype", Promise)
], SourceController.prototype, "getAllSources", null);
__decorate([
    common_1.Get('/getOne/:id'),
    swagger_1.ApiImplicitParam({ name: 'id' }),
    __param(0, common_1.Param('id', new common_1.ParseIntPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], SourceController.prototype, "getOneSource", null);
__decorate([
    swagger_1.ApiImplicitHeader({ name: 'authorization', required: true }),
    common_1.Post('/new'),
    common_1.UseInterceptors(platform_express_1.FilesInterceptor('files')),
    __param(0, common_1.Body()), __param(1, common_1.UploadedFiles()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [source_dto_1.SourceDto, Array]),
    __metadata("design:returntype", Promise)
], SourceController.prototype, "createNewSource", null);
__decorate([
    swagger_1.ApiImplicitHeader({ name: 'authorization', required: true }),
    swagger_1.ApiImplicitParam({ name: 'id' }),
    common_1.Put('/update/:id'),
    common_1.UseInterceptors(platform_express_1.FilesInterceptor('files')),
    __param(0, common_1.Param('id', new common_1.ParseIntPipe())),
    __param(1, common_1.Body()),
    __param(2, common_1.UploadedFiles()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, source_dto_1.SourceDto, Array]),
    __metadata("design:returntype", Promise)
], SourceController.prototype, "updateSource", null);
__decorate([
    swagger_1.ApiImplicitHeader({ name: 'authorization', required: true }),
    swagger_1.ApiImplicitParam({ name: 'id' }),
    common_1.Delete('/delete/:id'),
    __param(0, common_1.Param('id', new common_1.ParseIntPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], SourceController.prototype, "deleteSource", null);
SourceController = __decorate([
    swagger_1.ApiUseTags('sources'),
    common_1.Controller('sources'),
    __metadata("design:paramtypes", [source_service_1.SourceService])
], SourceController);
exports.SourceController = SourceController;
//# sourceMappingURL=source.controller.js.map