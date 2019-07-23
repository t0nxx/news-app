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
const post_entity_1 = require("../post/post.entity");
var reactionEnum;
(function (reactionEnum) {
    reactionEnum["like"] = "like";
    reactionEnum["love"] = "love";
    reactionEnum["haha"] = "haha";
    reactionEnum["wow"] = "wow";
    reactionEnum["sad"] = "sad";
    reactionEnum["angry"] = "angry";
})(reactionEnum = exports.reactionEnum || (exports.reactionEnum = {}));
let PostReactions = class PostReactions {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], PostReactions.prototype, "id", void 0);
__decorate([
    typeorm_1.ManyToOne(type => user_entity_1.User, user => user.id, { onDelete: 'CASCADE' }),
    __metadata("design:type", Number)
], PostReactions.prototype, "user", void 0);
__decorate([
    typeorm_1.ManyToOne(type => post_entity_1.Post, post => post.id, { onDelete: 'CASCADE' }),
    __metadata("design:type", Number)
], PostReactions.prototype, "post", void 0);
__decorate([
    typeorm_1.Column({ type: 'enum', enum: reactionEnum }),
    __metadata("design:type", Number)
], PostReactions.prototype, "reaction", void 0);
PostReactions = __decorate([
    typeorm_1.Entity()
], PostReactions);
exports.PostReactions = PostReactions;
//# sourceMappingURL=postReactions.entity.js.map