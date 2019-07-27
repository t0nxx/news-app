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
const uploader_service_1 = require("./uploader.service");
const platform_express_1 = require("@nestjs/platform-express");
const uploader_entity_1 = require("./uploader.entity");
const pagination_filter_1 = require("../shared/pagination.filter");
let UploaderController = class UploaderController {
    constructor(uploadService) {
        this.uploadService = uploadService;
    }
    getAllPosts(paginate) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.uploadService.getAllUploads(paginate);
        });
    }
    getOneCategory(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.uploadService.getOneUpload(id);
        });
    }
    createNewPost(files) {
        return __awaiter(this, void 0, void 0, function* () {
            let updir = 'http://18.194.127.99:3001/';
            let upload = new uploader_entity_1.Uploader();
            if (files) {
                if (files.length > 0) {
                    upload.url = `${updir}${files[0].filename}`;
                }
            }
            return this.uploadService.createNewUpload(upload);
        });
    }
    deleteCategory(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.uploadService.deletUpload(id);
        });
    }
};
__decorate([
    common_1.Get(),
    __param(0, common_1.Query()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [pagination_filter_1.PaginationDto]),
    __metadata("design:returntype", Promise)
], UploaderController.prototype, "getAllPosts", null);
__decorate([
    common_1.Get('/getOne/:id'),
    __param(0, common_1.Param('id', new common_1.ParseIntPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UploaderController.prototype, "getOneCategory", null);
__decorate([
    common_1.Post('/new'),
    common_1.UseInterceptors(platform_express_1.FilesInterceptor('files')),
    __param(0, common_1.UploadedFiles()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", Promise)
], UploaderController.prototype, "createNewPost", null);
__decorate([
    common_1.Delete('/delete/:id'),
    __param(0, common_1.Param('id', new common_1.ParseIntPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UploaderController.prototype, "deleteCategory", null);
UploaderController = __decorate([
    common_1.Controller('uploads'),
    __metadata("design:paramtypes", [uploader_service_1.UploaderService])
], UploaderController);
exports.UploaderController = UploaderController;
//# sourceMappingURL=uploader.controller.js.map