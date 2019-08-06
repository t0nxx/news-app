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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
const bcryptjs_1 = require("bcryptjs");
class UserUpdateDto {
}
__decorate([
    swagger_1.ApiModelPropertyOptional(),
    class_validator_1.IsOptional(),
    class_validator_1.IsAlpha(),
    __metadata("design:type", String)
], UserUpdateDto.prototype, "firstName", void 0);
__decorate([
    swagger_1.ApiModelPropertyOptional(),
    class_validator_1.IsOptional(),
    class_validator_1.IsAlpha(),
    __metadata("design:type", String)
], UserUpdateDto.prototype, "lastName", void 0);
__decorate([
    swagger_1.ApiModelPropertyOptional(),
    class_validator_1.IsOptional(),
    class_validator_1.IsEmail(),
    __metadata("design:type", String)
], UserUpdateDto.prototype, "email", void 0);
__decorate([
    swagger_1.ApiModelPropertyOptional(),
    class_validator_1.IsOptional(),
    class_validator_1.MinLength(5),
    class_validator_1.MaxLength(20),
    __metadata("design:type", String)
], UserUpdateDto.prototype, "number", void 0);
__decorate([
    swagger_1.ApiModelPropertyOptional(),
    class_validator_1.IsOptional(),
    class_validator_1.MinLength(6),
    __metadata("design:type", String)
], UserUpdateDto.prototype, "password", void 0);
__decorate([
    swagger_1.ApiModelPropertyOptional(),
    class_validator_1.IsOptional(),
    __metadata("design:type", String)
], UserUpdateDto.prototype, "fcmToken", void 0);
exports.UserUpdateDto = UserUpdateDto;
;
function hashUpdatePass(pass) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield bcryptjs_1.hashSync(pass, 10);
    });
}
exports.hashUpdatePass = hashUpdatePass;
//# sourceMappingURL=user.update.dto.js.map