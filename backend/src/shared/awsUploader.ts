import * as AWS from 'aws-sdk';
import * as awsConfig from '../config/aws.json'

AWS.config.update(awsConfig);
const s3 = new AWS.S3();

const bucketName = 'news-app-uploads';

export const UploadToS3 = (file) => {
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
        }
            , err => {
                return err;
            });
};

export const UploadToS3Base64 = async (bas64File) => {
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
    const upLink = await UploadToS3(file);
    return upLink;
};