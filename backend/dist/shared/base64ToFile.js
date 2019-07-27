"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
const fs = require("fs");
exports.extractBase64FromBody = (body) => {
    const condation = new RegExp(/"(data:image\/[^;]+;base64[^"]+)"/, 'g');
    const found = body.match(condation);
    if (found) {
        found.map(e => {
            const rmvData = e.replace(/data:image\/\w+;base64,/, '');
            const type = e.split(';')[0].split('/')[1];
            const buff = Buffer.from(rmvData, 'base64');
            const imgName = Math.floor(Math.random() * 100) + '-' + Date.now();
            let updir = 'http://18.194.127.99:3001/';
            fs.writeFile(path.join(__dirname + '../../../uploads/' + `${imgName}.${type}`), buff, (err) => console.log(err));
            body = body.replace(e, `"${updir}${imgName}.${type}"`);
        });
    }
    return body;
};
//# sourceMappingURL=base64ToFile.js.map