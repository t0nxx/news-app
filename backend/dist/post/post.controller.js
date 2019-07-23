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
const post_service_1 = require("./post.service");
const pagination_filter_1 = require("../shared/pagination.filter");
const platform_express_1 = require("@nestjs/platform-express");
const swagger_1 = require("@nestjs/swagger");
const post_dto_1 = require("./post.dto");
const user_decorator_1 = require("../user/user.decorator");
let PostController = class PostController {
    constructor(postService) {
        this.postService = postService;
    }
    getAllPosts(paginate) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.postService.getAllPosts(paginate);
        });
    }
    getOnepost(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.postService.getOnePost(id);
        });
    }
    reactToPost(userid, postid, reaction) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.postService.reactToPost(postid, userid, reaction);
        });
    }
    createNewPost(id, post, files) {
        return __awaiter(this, void 0, void 0, function* () {
            let updir = 'http://localhost:3001/';
            post = JSON.parse(JSON.stringify(post));
            post.photos = [];
            if (files) {
                if (files.length > 0) {
                    post.backgroundImage = `${updir}${files[0].filename}`;
                    files.forEach(photo => {
                        post.photos.push(`${updir}${photo.filename}`);
                    });
                }
            }
            return this.postService.createNewPost(id, post);
        });
    }
    getPostsOfMySubscription(id, paginate) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.postService.getPostsOfMySubscription(id, paginate);
        });
    }
    deletepost(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.postService.deletPost(id);
        });
    }
};
__decorate([
    common_1.Get(),
    swagger_1.ApiImplicitQuery({ name: 'tag', required: false }),
    swagger_1.ApiImplicitQuery({ name: 'category', required: false }),
    swagger_1.ApiImplicitQuery({ name: 'userID', required: false }),
    __param(0, common_1.Query()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [pagination_filter_1.PaginationDto]),
    __metadata("design:returntype", Promise)
], PostController.prototype, "getAllPosts", null);
__decorate([
    common_1.Get('/getOne/:id'),
    swagger_1.ApiImplicitParam({ name: 'id', required: true }),
    __param(0, common_1.Param('id', new common_1.ParseIntPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PostController.prototype, "getOnepost", null);
__decorate([
    common_1.Post('/reactions/:id'),
    swagger_1.ApiImplicitHeader({ name: 'authorization', required: true }),
    swagger_1.ApiImplicitParam({ name: 'id', required: true }),
    swagger_1.ApiImplicitQuery({ name: 'react', enum: ['like', 'love', 'haha', 'wow', 'sad', 'angry'], required: true }),
    __param(0, user_decorator_1.User('id')),
    __param(1, common_1.Param('id', new common_1.ParseIntPipe())),
    __param(2, common_1.Query('react')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], PostController.prototype, "reactToPost", null);
__decorate([
    swagger_1.ApiImplicitHeader({ name: 'authorization', required: true }),
    common_1.Post('/new'),
    common_1.UseInterceptors(platform_express_1.FilesInterceptor('files')),
    __param(0, user_decorator_1.User('id')),
    __param(1, common_1.Body()),
    __param(2, common_1.UploadedFiles()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, post_dto_1.PostDto, Array]),
    __metadata("design:returntype", Promise)
], PostController.prototype, "createNewPost", null);
__decorate([
    swagger_1.ApiImplicitHeader({ name: 'authorization', required: true }),
    common_1.Get('/mySubscriptions'),
    __param(0, user_decorator_1.User('id')),
    __param(1, common_1.Query()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, pagination_filter_1.PaginationDto]),
    __metadata("design:returntype", Promise)
], PostController.prototype, "getPostsOfMySubscription", null);
__decorate([
    swagger_1.ApiImplicitHeader({ name: 'authorization', required: true }),
    swagger_1.ApiImplicitParam({ name: 'id' }),
    common_1.Delete('/delete/:id'),
    __param(0, common_1.Param('id', new common_1.ParseIntPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PostController.prototype, "deletepost", null);
PostController = __decorate([
    swagger_1.ApiUseTags('posts'),
    common_1.Controller('posts'),
    __metadata("design:paramtypes", [post_service_1.PostService])
], PostController);
exports.PostController = PostController;
//# sourceMappingURL=post.controller.js.map