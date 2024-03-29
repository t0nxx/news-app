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
const source_entity_1 = require("../source/source.entity");
const comment_entity_1 = require("../comment/comment.entity");
const lodash_1 = require("lodash");
const fcm_1 = require("../notification/fcm");
let PostService = class PostService {
    constructor(PostRepository, tagRepository, categoryRepository, userRepository, sourceRepository, postReationsRepository, commentRepository) {
        this.PostRepository = PostRepository;
        this.tagRepository = tagRepository;
        this.categoryRepository = categoryRepository;
        this.userRepository = userRepository;
        this.sourceRepository = sourceRepository;
        this.postReationsRepository = postReationsRepository;
        this.commentRepository = commentRepository;
    }
    getAllPosts(paginate) {
        return __awaiter(this, void 0, void 0, function* () {
            const q = this.PostRepository.createQueryBuilder('post');
            q.leftJoinAndSelect('post.categories', 'categories');
            q.leftJoinAndSelect('post.tags', 'tags');
            q.leftJoinAndSelect('post.source', 'source');
            q.innerJoin('post.user', 'user');
            q.addSelect(['user.id', 'user.fullName', 'user.profileImage']);
            q.orderBy('post.id', 'DESC');
            const qAfterFormat = QueryOrderFormat_1.FormatQueryOrderAndPagination(paginate, q, ['title', 'body'], 'post');
            if (paginate.tag) {
                q.orWhere(`tags.name like '%${paginate.tag}%'`);
            }
            if (paginate.kind) {
                if (paginate.kind === 'mostComment') {
                    q.orderBy('post.commentsCount', 'DESC');
                }
                if (paginate.kind === 'mostRead') {
                    q.orderBy('post.readCount', 'DESC');
                }
            }
            const [data, count] = yield qAfterFormat.getManyAndCount();
            if (paginate.userId) {
                const findOne = yield this.userRepository.findOne({ id: paginate.userId }, { relations: ['bookmarks'] });
                data.forEach(element => {
                    let isExist = lodash_1.some(findOne.bookmarks, { id: element.id });
                    if (isExist) {
                        element.isBookmarked = true;
                    }
                    else {
                        element.isBookmarked = false;
                    }
                });
            }
            else {
                data.forEach(element => {
                    element.isBookmarked = false;
                });
            }
            return { data, count };
        });
    }
    getPostsOfMySubscription(userId, paginate) {
        return __awaiter(this, void 0, void 0, function* () {
            const findOne = yield this.userRepository.findOne({ id: userId }, { relations: ['subscribed', 'bookmarks'] });
            if (!findOne) {
                throw new common_1.NotFoundException('invalid id');
            }
            const ids = findOne.subscribed.map(cate => cate.id);
            const q = this.PostRepository.createQueryBuilder('post')
                .leftJoinAndSelect('post.categories', 'categories')
                .leftJoinAndSelect('post.tags', 'tags')
                .leftJoinAndSelect('post.source', 'source')
                .innerJoin('post.user', 'user')
                .addSelect(['user.id', 'user.fullName', 'user.profileImage'])
                .orderBy('post_id', 'DESC');
            if (ids.length > 0) {
                q.where(`categories.id IN (${ids})`);
            }
            const qAfterFormat = QueryOrderFormat_1.FormatQueryOrderAndPagination(paginate, q, ['title', 'body'], 'post');
            const [data, count] = yield qAfterFormat.getManyAndCount();
            data.forEach(element => {
                let isExist = lodash_1.some(findOne.bookmarks, { id: element.id });
                if (isExist) {
                    element.isBookmarked = true;
                }
                else {
                    element.isBookmarked = false;
                }
            });
            return { data, count };
        });
    }
    getOnePost(postId, paginate) {
        return __awaiter(this, void 0, void 0, function* () {
            const q = this.PostRepository.createQueryBuilder('post')
                .leftJoinAndSelect('post.categories', 'categories')
                .leftJoinAndSelect('post.tags', 'tags')
                .leftJoinAndSelect('post.source', 'source')
                .innerJoin('post.user', 'user')
                .addSelect(['user.id', 'user.fullName', 'user.profileImage'])
                .where(`post.id =  (${postId})`);
            const findOne = yield q.getOne();
            let data = {};
            Object.assign(data, findOne);
            if (!findOne) {
                throw new common_1.NotFoundException('invalid id');
            }
            findOne.readCount = findOne.readCount + 1;
            const reactions = yield this.postReationsRepository.createQueryBuilder()
                .select('reaction , Count(*) as count')
                .where(`postId = ${postId}`)
                .groupBy('reaction')
                .getRawMany();
            yield this.PostRepository.save(findOne);
            if (paginate.userId) {
                const user = yield this.userRepository.findOne({ id: paginate.userId }, { relations: ['bookmarks'] });
                const isReacted = yield this.postReationsRepository.findOne({ user: paginate.userId, post: postId });
                let isExist = lodash_1.some(user.bookmarks, { id: findOne.id });
                if (isExist) {
                    if (isReacted) {
                        data['userReaction'] = isReacted.reaction;
                    }
                    else {
                        data['userReaction'] = 'noReaction';
                    }
                    data['isBookmarked'] = true;
                }
                else {
                    data['isBookmarked'] = false;
                    data['userReaction'] = 'noReaction';
                }
            }
            else {
                data['isBookmarked'] = false;
                data['userReaction'] = 'noReaction';
            }
            const comments = yield this.commentRepository.find({ where: { post: findOne }, order: { id: 'DESC' }, take: 3 });
            return { data: Object.assign({}, data, { reactions, comments }) };
        });
    }
    getOnePostDashBoard(postId) {
        return __awaiter(this, void 0, void 0, function* () {
            const findOne = yield this.PostRepository.findOne({ id: postId }, { relations: ['source'] });
            if (!findOne) {
                throw new common_1.NotFoundException('invalid id');
            }
            const tagArrayIds = findOne.tags.map(e => e.id);
            const cateArrayIds = findOne.categories.map(e => e.id);
            const { id, title, body, backgroundImage, comments, reactionsCount, source, createdAt, updatedAt } = findOne;
            const reactions = yield this.postReationsRepository.createQueryBuilder()
                .select('reaction , Count(*) as count')
                .where(`postId = ${postId}`)
                .groupBy('reaction')
                .getRawMany();
            let like = '0', love = '0', wow = '0', haha = '0', angry = '0', sad = '0';
            reactions.forEach(react => {
                if (react.reaction == 'like') {
                    like = react.count;
                }
                else if (react.reaction == 'love') {
                    love = react.count;
                }
                else if (react.reaction == 'wow') {
                    wow = react.count;
                }
                else if (react.reaction == 'haha') {
                    haha = react.count;
                }
                else if (react.reaction == 'sad') {
                    sad = react.count;
                }
                else if (react.reaction == 'angry') {
                    angry = react.count;
                }
            });
            return {
                data: {
                    id, title, body, backgroundImage, comments,
                    reactionsCount, source, createdAt, updatedAt, categories: cateArrayIds,
                    tags: tagArrayIds,
                    like, love, haha, wow, sad, angry,
                },
            };
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
            let paginate = {};
            paginate['userId'] = userId;
            if (isReacted) {
                if (isReacted.reaction === reaction) {
                    yield this.PostRepository.decrement({ id: postId }, 'reactionsCount', 1);
                    yield this.postReationsRepository.remove(isReacted);
                    return this.getOnePost(postId, paginate);
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
            return this.getOnePost(postId, paginate);
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
            const [tags, categories, source] = yield Promise.all([
                this.tagRepository.findByIds(newPost.tags),
                this.categoryRepository.findByIds(newPost.categories),
                this.sourceRepository.findOne({ id: PostDto.source }),
            ]);
            newPost.user = user;
            newPost.tags = [];
            newPost.categories = [];
            newPost.tags.push(...tags);
            newPost.categories.push(...categories);
            newPost.source = source;
            const create = yield this.PostRepository.save(newPost);
            const users = yield this.userRepository.createQueryBuilder('user')
                .innerJoinAndSelect('user.subscribed', 'categories')
                .where(`categories.id IN (${newPost.categories})`)
                .select(['user.fcmTokens'])
                .where('user.receiveNotification = true')
                .getMany();
            const tokens = users.map(e => e.fcmTokens);
            const flatArr = lodash_1.flatten(tokens);
            let messages = [];
            flatArr.forEach(e => {
                messages.push({
                    to: e,
                    sound: 'default',
                    title: create.title,
                    body: create.title,
                    data: { 'postId': create.id },
                });
            });
            fcm_1.sendNotification(messages);
            const savePost = yield this.PostRepository.findOne({ id: create.id });
            return { data: savePost };
        });
    }
    updatePost(id, updatePost) {
        return __awaiter(this, void 0, void 0, function* () {
            const findOne = yield this.PostRepository.findOne(id);
            if (!findOne) {
                throw new common_1.NotFoundException('invalid id');
            }
            if (Object.keys(updatePost).length <= 0) {
                throw new common_1.BadRequestException('no data provided');
            }
            const [tags, categories, source] = yield Promise.all([
                this.tagRepository.findByIds(updatePost.tags),
                this.categoryRepository.findByIds(updatePost.categories),
                this.sourceRepository.findOne({ id: updatePost.source }),
            ]);
            findOne.title = updatePost.title;
            findOne.body = updatePost.body;
            findOne.backgroundImage = updatePost.backgroundImage;
            findOne.tags = [];
            findOne.categories = [];
            findOne.tags.push(...tags);
            findOne.categories.push(...categories);
            findOne.source = source;
            yield this.PostRepository.save(findOne);
            const updated = yield this.PostRepository.findOne(id);
            return { data: updated };
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
    bookmarkPost(userId, postId) {
        return __awaiter(this, void 0, void 0, function* () {
            const findPost = yield this.PostRepository.findOne({ id: postId });
            if (!findPost) {
                throw new common_1.NotFoundException('invalid id');
            }
            const user = yield this.userRepository.findOne({ id: userId }, { relations: ['bookmarks'] });
            if (!user) {
                throw new common_1.NotFoundException('invalid id');
            }
            user.bookmarks = [...user.bookmarks, findPost];
            yield this.userRepository.save(user);
            return { data: 'done . post bookmarked' };
        });
    }
    unBookmarkPost(userId, postId) {
        return __awaiter(this, void 0, void 0, function* () {
            const findPost = yield this.PostRepository.findOne({ id: postId });
            if (!findPost) {
                throw new common_1.NotFoundException('invalid id');
            }
            const user = yield this.userRepository.findOne({ id: userId }, { relations: ['bookmarks'] });
            if (!user) {
                throw new common_1.NotFoundException('invalid id');
            }
            user.bookmarks = user.bookmarks.filter((p) => p.id !== postId);
            yield this.userRepository.save(user);
            return { data: 'done . post unbookmarked' };
        });
    }
    getStatistics() {
        return __awaiter(this, void 0, void 0, function* () {
            const [comments, users, posts, reactions, tags, categories, mostLiked, mostLoved, mostAngry, mostCommented] = yield Promise.all([
                this.commentRepository.count(),
                this.userRepository.count(),
                this.PostRepository.count(),
                this.postReationsRepository.count(),
                this.tagRepository.count(),
                this.categoryRepository.count(),
                this.postReationsRepository.createQueryBuilder()
                    .select('postId , Count(*) as count')
                    .where(`reaction like 'like'`)
                    .groupBy('postId')
                    .orderBy('count', 'DESC')
                    .getRawOne(),
                this.postReationsRepository.createQueryBuilder()
                    .select('postId , Count(*) as count')
                    .where(`reaction like 'love'`)
                    .groupBy('postId')
                    .orderBy('count', 'DESC')
                    .getRawOne(),
                this.postReationsRepository.createQueryBuilder()
                    .select('postId , Count(*) as count')
                    .where(`reaction like 'angry'`)
                    .groupBy('postId')
                    .orderBy('count', 'DESC')
                    .getRawOne(),
                this.commentRepository.createQueryBuilder()
                    .select('postId , Count(*) as count')
                    .groupBy('postId')
                    .orderBy('count', 'DESC')
                    .getRawOne(),
            ]);
            return {
                commentsCount: comments,
                usersCount: users,
                postsCount: posts,
                reactionsCount: reactions,
                tagsCount: tags,
                categoriesCount: categories,
                mostLiked,
                mostLoved,
                mostAngry,
                mostCommented,
            };
        });
    }
};
PostService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(post_entity_1.Post)),
    __param(1, typeorm_1.InjectRepository(hashtage_entity_1.HashTag)),
    __param(2, typeorm_1.InjectRepository(category_entity_1.Category)),
    __param(3, typeorm_1.InjectRepository(user_entity_1.User)),
    __param(4, typeorm_1.InjectRepository(source_entity_1.Source)),
    __param(5, typeorm_1.InjectRepository(postReactions_entity_1.PostReactions)),
    __param(6, typeorm_1.InjectRepository(comment_entity_1.Comment)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], PostService);
exports.PostService = PostService;
//# sourceMappingURL=post.service.js.map