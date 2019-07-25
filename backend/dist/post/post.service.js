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
const typeorm_2 = require("typeorm");
const post_entity_1 = require("./post.entity");
const QueryOrderFormat_1 = require("../shared/QueryOrderFormat");
const user_entity_1 = require("../user/user.entity");
const postReactions_entity_1 = require("../relationsEntities/postReactions.entity");
const category_entity_1 = require("../category/category.entity");
const hashtage_entity_1 = require("../hashtag/hashtage.entity");
let PostService = class PostService {
    constructor(PostRepository, tagRepository, categoryRepository, userRepository, postReationsRepository) {
        this.PostRepository = PostRepository;
        this.tagRepository = tagRepository;
        this.categoryRepository = categoryRepository;
        this.userRepository = userRepository;
        this.postReationsRepository = postReationsRepository;
    }
    getAllPosts(paginate) {
        return __awaiter(this, void 0, void 0, function* () {
            const q = this.PostRepository.createQueryBuilder('post');
            q.leftJoinAndSelect('post.categories', 'categories');
            q.leftJoinAndSelect('post.tags', 'tags');
            q.innerJoin('post.user', 'user');
            q.addSelect(['user.id', 'user.fullName']);
            const qAfterFormat = QueryOrderFormat_1.FormatQueryOrderAndPagination(paginate, q, ['title', 'body'], 'post');
            if (paginate.tag) {
                q.where(`tags.name like '%${paginate.tag}%'`);
            }
            if (paginate.category) {
                q.where(`categories.name like '%${paginate.category}%'`);
            }
            if (paginate.userID) {
                q.where(`user.id  = ${paginate.userID}`);
            }
            const [data, count] = yield qAfterFormat.getManyAndCount();
            return { data, count };
        });
    }
    getPostsOfMySubscription(userId, paginate) {
        return __awaiter(this, void 0, void 0, function* () {
            const findOne = yield this.userRepository.findOne({ id: userId }, { relations: ['subscribed'] });
            if (!findOne) {
                throw new common_1.NotFoundException('invalid id');
            }
            const ids = findOne.subscribed.map(cate => cate.id);
            const q = this.PostRepository.createQueryBuilder('post');
            q.leftJoinAndSelect('post.categories', 'categories', `categories.id IN (${ids})`)
                .orderBy('post_id', 'DESC');
            const qAfterFormat = QueryOrderFormat_1.FormatQueryOrderAndPagination(paginate, q, ['title', 'body']);
            const [data, count] = yield qAfterFormat.getManyAndCount();
            return { data, count };
        });
    }
    getOnePost(postId) {
        return __awaiter(this, void 0, void 0, function* () {
            const findOne = yield this.PostRepository.findOne({ id: postId });
            if (!findOne) {
                throw new common_1.NotFoundException('invalid id');
            }
            const { id, title, body, categories, tags, backgroundImage, reactionsCount, createdAt, updatedAt } = findOne;
            const arrangedPhotos = findOne.photos.map(el => {
                return { url: el };
            });
            return { data: { id, title, body, backgroundImage, photos: arrangedPhotos, categories, tags, reactionsCount, createdAt, updatedAt } };
        });
    }
    reactToPost(postId, userId, reaction) {
        return __awaiter(this, void 0, void 0, function* () {
            const findOne = yield this.PostRepository.findOne({ id: postId });
            if (!findOne) {
                throw new common_1.NotFoundException('invalid id');
            }
            const newReaction = new postReactions_entity_1.PostReactions();
            const isReacted = yield this.postReationsRepository.findOne({ user: userId, post: postId });
            if (isReacted) {
                if (isReacted.reaction === reaction) {
                    yield this.PostRepository.decrement({ id: postId }, 'reactionsCount', 1);
                    return yield this.postReationsRepository.remove(isReacted);
                }
                else {
                    newReaction.id = isReacted.id;
                }
            }
            let rct;
            switch (reaction) {
                case 'like':
                    rct = postReactions_entity_1.reactionEnum.like;
                    break;
                case 'love':
                    rct = postReactions_entity_1.reactionEnum.love;
                    break;
                case 'haha':
                    rct = postReactions_entity_1.reactionEnum.haha;
                    break;
                case 'wow':
                    rct = postReactions_entity_1.reactionEnum.wow;
                    break;
                case 'sad':
                    rct = postReactions_entity_1.reactionEnum.sad;
                    break;
                case 'angry':
                    rct = postReactions_entity_1.reactionEnum.angry;
                    break;
                default:
                    rct = postReactions_entity_1.reactionEnum.like;
            }
            newReaction.reaction = rct;
            newReaction.user = userId;
            newReaction.post = postId;
            const save = yield this.postReationsRepository.save(newReaction);
            yield this.PostRepository.increment({ id: postId }, 'reactionsCount', 1);
            return { data: 'done . reacted to post' };
        });
    }
    createNewPost(userId, PostDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userRepository.findOne({ id: userId });
            if (!user) {
                throw new common_1.NotFoundException('invalid id');
            }
            const newPost = new post_entity_1.Post();
            Object.assign(newPost, PostDto);
            const [tags, categories] = yield Promise.all([
                this.tagRepository.findByIds(newPost.tags),
                this.categoryRepository.findByIds(newPost.categories),
            ]);
            newPost.user = user;
            newPost.tags = [];
            newPost.categories = [];
            newPost.tags.push(...tags);
            newPost.categories.push(...categories);
            const create = yield this.PostRepository.save(newPost);
            const savePost = yield this.PostRepository.findOne({ id: create.id });
            return { data: savePost };
        });
    }
    deletPost(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const findOne = yield this.PostRepository.findOne(id);
            if (!findOne) {
                throw new common_1.NotFoundException('invalid id');
            }
            yield this.PostRepository.delete(id);
            return { data: findOne };
        });
    }
};
PostService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(post_entity_1.Post)),
    __param(1, typeorm_1.InjectRepository(hashtage_entity_1.HashTag)),
    __param(2, typeorm_1.InjectRepository(category_entity_1.Category)),
    __param(3, typeorm_1.InjectRepository(user_entity_1.User)),
    __param(4, typeorm_1.InjectRepository(postReactions_entity_1.PostReactions)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], PostService);
exports.PostService = PostService;
//# sourceMappingURL=post.service.js.map