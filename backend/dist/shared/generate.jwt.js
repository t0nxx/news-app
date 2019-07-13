"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = require("jsonwebtoken");
const dotenv_1 = require("dotenv");
const jwt_1 = require("../config/jwt");
dotenv_1.config();
function generateJwtToken(args) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield jsonwebtoken_1.sign(args, jwt_1.JWTSECRET, { expiresIn: '1h' });
    });
}
exports.generateJwtToken = generateJwtToken;
//# sourceMappingURL=generate.jwt.js.map