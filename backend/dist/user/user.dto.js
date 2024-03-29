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
class UserDto {
}
__decorate([
    swagger_1.ApiModelProperty(),
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", String)
], UserDto.prototype, "fullName", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsEmail(),
    __metadata("design:type", String)
], UserDto.prototype, "email", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], UserDto.prototype, "number", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    class_validator_1.IsNotEmpty(),
    class_validator_1.MinLength(6),
    __metadata("design:type", String)
], UserDto.prototype, "password", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], UserDto.prototype, "img", void 0);
exports.UserDto = UserDto;
class resetDTo {
}
__decorate([
    swagger_1.ApiModelProperty(),
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsEmail(),
    __metadata("design:type", String)
], resetDTo.prototype, "email", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", String)
], resetDTo.prototype, "resetCode", void 0);
exports.resetDTo = resetDTo;
class resetDToAnddPass {
}
__decorate([
    swagger_1.ApiModelProperty(),
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsEmail(),
    __metadata("design:type", String)
], resetDToAnddPass.prototype, "email", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    class_validator_1.IsNotEmpty(),
    class_validator_1.MinLength(6),
    __metadata("design:type", String)
], resetDToAnddPass.prototype, "password", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", String)
], resetDToAnddPass.prototype, "resetCode", void 0);
exports.resetDToAnddPass = resetDToAnddPass;
//# sourceMappingURL=user.dto.js.map