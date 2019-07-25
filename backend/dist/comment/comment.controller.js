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
const comment_service_1 = require("./comment.service");
const pagination_filter_1 = require("../shared/pagination.filter");
const comment_dto_1 = require("./comment.dto");
const user_decorator_1 = require("../user/user.decorator");
const comment_update_dto_1 = require("./comment.update.dto");
let CommentController = class CommentController {
    constructor(commentService) {
        this.commentService = commentService;
    }
    getAllComments(paginate) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.commentService.getAllComments(paginate);
        });
    }
    getOneComment(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.commentService.getOneComment(id);
        });
    }
    createNewUser(id, comment) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.commentService.CreateNewComment(id, comment);
        });
    }
    updateComment(userId, id, cate) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.commentService.updateComment(userId, id, cate);
        });
    }
    deleteComment(userId, id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.commentService.deletComment(userId, id);
        });
    }
    reportComment(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.commentService.ReportComment(id);
        });
    }
};
__decorate([
    common_1.Get(),
    swagger_1.ApiImplicitQuery({ name: 'postId', type: 'number', required: false }),
    swagger_1.ApiImplicitQuery({ name: 'parentId', type: 'number', required: false }),
    __param(0, common_1.Query()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [pagination_filter_1.PaginationDto]),
    __metadata("design:returntype", Promise)
], CommentController.prototype, "getAllComments", null);
__decorate([
    common_1.Get('/getOne/:id'),
    swagger_1.ApiImplicitParam({ name: 'id' }),
    __param(0, common_1.Param('id', new common_1.ParseIntPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CommentController.prototype, "getOneComment", null);
__decorate([
    swagger_1.ApiImplicitHeader({ name: 'authorization', required: true }),
    common_1.Post('/new'),
    __param(0, user_decorator_1.User('id')),
    __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, comment_dto_1.CommentDto]),
    __metadata("design:returntype", Promise)
], CommentController.prototype, "createNewUser", null);
__decorate([
    swagger_1.ApiImplicitHeader({ name: 'authorization', required: true }),
    swagger_1.ApiImplicitParam({ name: 'id' }),
    common_1.Put('/update/:id'),
    __param(0, user_decorator_1.User('id')),
    __param(1, common_1.Param('id', new common_1.ParseIntPipe())),
    __param(2, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, comment_update_dto_1.CommentUpdateDto]),
    __metadata("design:returntype", Promise)
], CommentController.prototype, "updateComment", null);
__decorate([
    swagger_1.ApiImplicitHeader({ name: 'authorization', required: true }),
    swagger_1.ApiImplicitParam({ name: 'id' }),
    common_1.Delete('/delete/:id'),
    __param(0, user_decorator_1.User('id')),
    __param(1, common_1.Param('id', new common_1.ParseIntPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], CommentController.prototype, "deleteComment", null);
__decorate([
    swagger_1.ApiImplicitHeader({ name: 'authorization', required: true }),
    swagger_1.ApiImplicitParam({ name: 'id' }),
    common_1.Get('/report/:id'),
    __param(0, common_1.Param('id', new common_1.ParseIntPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CommentController.prototype, "reportComment", null);
CommentController = __decorate([
    swagger_1.ApiUseTags('comments'),
    common_1.Controller('comments'),
    __metadata("design:paramtypes", [comment_service_1.CommentService])
], CommentController);
exports.CommentController = CommentController;
//# sourceMappingURL=comment.controller.js.map