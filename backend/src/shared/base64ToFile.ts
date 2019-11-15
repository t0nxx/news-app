import { UploadToS3 } from './awsUploader';

export const extractBase64FromBody = async (body) => {
    const condation = new RegExp(/"(data:image\/[^;]+;base64[^"]+)"/, 'g');
    const found = body.match(condation);
    if (found) {
        await Promise.all(found.map(async e => {
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
            // //let updir = 'http://localhost:3001/';
            // // prod 
            // let updir = 'http://18.194.127.99:3001/';

            // // could upload to s3 buket in prod
            // fs.writeFile(path.join(__dirname + '../../../uploads/' + `${imgName}.${type}`), buff, (err) => console.log(err));
            //   backend link
            const upLink = await UploadToS3(file);
            body = body.replace(e, `${upLink}`);
        }),
        );
    }
    return body;
};
