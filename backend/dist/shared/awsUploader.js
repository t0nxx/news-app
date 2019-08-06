"use strict";
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
//# sourceMappingURL=awsUploader.js.map