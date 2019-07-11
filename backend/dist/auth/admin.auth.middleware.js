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
const common_1 = require("@nestjs/common");
class AdminMiddleAuth {
    use(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const isLogedIn = req['user'];
            if (!isLogedIn) {
                throw new common_1.UnauthorizedException('Not authorized');
            }
            if (isLogedIn.role === 'admin') {
                next();
            }
            else {
                throw new common_1.UnauthorizedException('Not authorized');
            }
        });
    }
}
exports.AdminMiddleAuth = AdminMiddleAuth;
//# sourceMappingURL=admin.auth.middleware.js.map