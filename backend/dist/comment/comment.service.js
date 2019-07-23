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
const comment_entity_1 = require("./comment.entity");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@nestjs/typeorm");
const QueryOrderFormat_1 = require("../shared/QueryOrderFormat");
const user_entity_1 = require("../user/user.entity");
const post_entity_1 = require("../post/post.entity");
let CommentService = class CommentService {
    constructor(commentRepository, userRepository, postRepository) {
        this.commentRepository = commentRepository;
        this.userRepository = userRepository;
        this.postRepository = postRepository;
    }
    getAllComments(paginate) {
        return __awaiter(this, void 0, void 0, function* () {
            const q = this.commentRepository
                .createQueryBuilder('comment')
                .innerJoin('comment.post', 'post')
                .innerJoin('comment.user', 'user')
                .addSelect(['post.id', 'user.id', 'user.fullName', 'comment.parentId']);
            if (paginate.postId) {
                q.where(`comment.parent IS NULL`);
                q.andWhere(`comment.post = ${paginate.postId}`);
            }
            if (paginate.parentId) {
                q.where(`comment.parent = ${paginate.parentId}`);
            }
            const qAfterFormat = QueryOrderFormat_1.FormatQueryOrderAndPagination(paginate, q, ['comment.body'], 'comment');
            const [data, count] = yield qAfterFormat.getManyAndCount();
            return { data, count };
        });
    }
    getRepliesOfComments(id, paginate) {
        return __awaiter(this, void 0, void 0, function* () {
            const q = this.commentRepository
                .createQueryBuilder('comment')
                .where(`comment.parent = ${id}`)
                .innerJoin('comment.post', 'post')
                .innerJoin('comment.user', 'user')
                .addSelect(['post.id', 'user.id', 'user.fullName']);
            const qAfterFormat = QueryOrderFormat_1.FormatQueryOrderAndPagination(paginate, q, ['comment.body']);
            const [data, count] = yield qAfterFormat.getManyAndCount();
            return { data, count };
        });
    }
    getOneComment(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const q = yield this.commentRepository
                .createQueryBuilder('comment')
                .where(`comment.id = ${id}`)
                .innerJoin('comment.post', 'post')
                .innerJoin('comment.user', 'user')
                .addSelect(['post.id', 'user.id', 'user.fullName'])
                .getOne();
            return { data: q };
        });
    }
    CreateNewComment(userId, commentDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const post = yield this.postRepository.findOne({ id: commentDto.postId });
            console.log(commentDto);
            if (!post) {
                throw new common_1.NotFoundException('invalid post id');
            }
            const user = yield this.userRepository.findOne({ id: userId });
            if (!user) {
                throw new common_1.NotFoundException('invalid user id');
            }
            const comment = new comment_entity_1.Comment();
            comment.post = post;
            comment.user = user;
            comment.body = commentDto.body;
            if (commentDto.parentId) {
                const parent = yield this.commentRepository.findOne({ id: commentDto.parentId });
                comment.parent = parent;
            }
            const save = yield this.commentRepository.save(comment);
            const { id, body, createdAt, updatedAt, reports } = save;
            return { data: { id, body, reports, createdAt, updatedAt } };
        });
    }
};
CommentService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_2.InjectRepository(comment_entity_1.Comment)),
    __param(1, typeorm_2.InjectRepository(user_entity_1.User)),
    __param(2, typeorm_2.InjectRepository(post_entity_1.Post)),
    __metadata("design:paramtypes", [typeorm_1.TreeRepository,
        typeorm_1.Repository,
        typeorm_1.Repository])
], CommentService);
exports.CommentService = CommentService;
//# sourceMappingURL=comment.service.js.map