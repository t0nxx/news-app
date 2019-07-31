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
const awsUploader_1 = require("./awsUploader");
exports.extractBase64FromBody = (body) => __awaiter(this, void 0, void 0, function* () {
    const condation = new RegExp(/"(data:image\/[^;]+;base64[^"]+)"/, 'g');
    const found = body.match(condation);
    if (found) {
        yield Promise.all(found.map((e) => __awaiter(this, void 0, void 0, function* () {
            const rmvData = e.replace(/data:image\/\w+;base64,/, '');
            const mimetype = e.split(';')[0];
            const type = e.split(';')[0].split('/')[1];
            const buff = Buffer.from(rmvData, 'base64');
            const imgName = Math.floor(Math.random() * 100) + '-' + Date.now() + '.' + type;
            const file = {
                buffer: buff,
                originalname: imgName,
                mimetype,
            };
            const upLink = yield awsUploader_1.UploadToS3(file);
            body = body.replace(e, `${upLink}`);
        })));
    }
    return body;
});
//# sourceMappingURL=base64ToFile.js.map