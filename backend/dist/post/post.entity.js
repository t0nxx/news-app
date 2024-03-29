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
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const user_entity_1 = require("../user/user.entity");
const category_entity_1 = require("../category/category.entity");
const hashtage_entity_1 = require("../hashtag/hashtage.entity");
const comment_entity_1 = require("../comment/comment.entity");
const source_entity_1 = require("../source/source.entity");
let Post = class Post {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Post.prototype, "id", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Post.prototype, "title", void 0);
__decorate([
    typeorm_1.Column({ type: 'longtext' }),
    __metadata("design:type", String)
], Post.prototype, "body", void 0);
__decorate([
    typeorm_1.Column({ default: 'no image' }),
    __metadata("design:type", String)
], Post.prototype, "backgroundImage", void 0);
__decorate([
    typeorm_1.Column({ default: 0 }),
    __metadata("design:type", Number)
], Post.prototype, "reactionsCount", void 0);
__decorate([
    typeorm_1.Column({ default: 0 }),
    __metadata("design:type", Number)
], Post.prototype, "readCount", void 0);
__decorate([
    typeorm_1.Column({ default: 0 }),
    __metadata("design:type", Number)
], Post.prototype, "commentsCount", void 0);
__decorate([
    typeorm_1.ManyToOne(type => user_entity_1.User, user => user.posts),
    typeorm_1.JoinTable(),
    __metadata("design:type", user_entity_1.User)
], Post.prototype, "user", void 0);
__decorate([
    typeorm_1.ManyToOne(type => source_entity_1.Source, source => source.posts),
    typeorm_1.JoinTable(),
    __metadata("design:type", source_entity_1.Source)
], Post.prototype, "source", void 0);
__decorate([
    typeorm_1.ManyToMany(type => category_entity_1.Category, { eager: true, onDelete: 'CASCADE' }),
    typeorm_1.JoinTable(),
    __metadata("design:type", Array)
], Post.prototype, "categories", void 0);
__decorate([
    typeorm_1.ManyToMany(type => hashtage_entity_1.HashTag, { eager: true, onDelete: 'CASCADE' }),
    typeorm_1.JoinTable(),
    __metadata("design:type", Array)
], Post.prototype, "tags", void 0);
__decorate([
    typeorm_1.OneToMany(type => comment_entity_1.Comment, comment => comment.post),
    __metadata("design:type", Array)
], Post.prototype, "comments", void 0);
__decorate([
    typeorm_1.CreateDateColumn({ type: 'timestamp' }),
    __metadata("design:type", Date)
], Post.prototype, "createdAt", void 0);
__decorate([
    typeorm_1.UpdateDateColumn({ type: 'timestamp' }),
    __metadata("design:type", Date)
], Post.prototype, "updatedAt", void 0);
Post = __decorate([
    typeorm_1.Entity()
], Post);
exports.Post = Post;
//# sourceMappingURL=post.entity.js.map