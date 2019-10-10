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
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
class PostDto {
}
__decorate([
    swagger_1.ApiModelProperty(),
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", String)
], PostDto.prototype, "title", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], PostDto.prototype, "body", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    class_transformer_1.Transform(id => parseInt(id)),
    __metadata("design:type", Number)
], PostDto.prototype, "source", void 0);
__decorate([
    swagger_1.ApiModelPropertyOptional(),
    __metadata("design:type", Array)
], PostDto.prototype, "categories", void 0);
__decorate([
    swagger_1.ApiModelPropertyOptional(),
    __metadata("design:type", Array)
], PostDto.prototype, "tags", void 0);
exports.PostDto = PostDto;
//# sourceMappingURL=post.dto.js.map