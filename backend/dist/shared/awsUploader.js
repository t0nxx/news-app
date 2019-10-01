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
const AWS = require("aws-sdk");
const awsConfig = require("../config/aws.json");
AWS.config.update(awsConfig);
const s3 = new AWS.S3();
const bucketName = 'news-app-uploads';
exports.UploadToS3 = (file) => {
    return s3.upload({
        Body: file.buffer,
        Bucket: bucketName,
        Key: `${Date.now().toString()} - ${file.originalname}`,
        ACL: 'public-read',
        ContentType: file.mimetype,
    })
        .promise()
        .then(data => {
        return data.Location;
    }, err => {
        return err;
    });
};
exports.UploadToS3Base64 = (bas64File) => __awaiter(this, void 0, void 0, function* () {
    const rmvData = bas64File.replace(/data:image\/\w+;base64,/, '');
    const mimetype = bas64File.split(';')[0];
    const type = bas64File.split(';')[0].split('/')[1];
    const buff = Buffer.from(rmvData, 'base64');
    const imgName = Math.floor(Math.random() * 100) + '-' + Date.now() + '.' + type;
    const file = {
        buffer: buff,
        originalname: imgName,
        mimetype,
    };
    const upLink = yield exports.UploadToS3(file);
    return upLink;
});
//# sourceMappingURL=awsUploader.js.map