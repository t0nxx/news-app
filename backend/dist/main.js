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
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const fs = require("fs");
const morgan = require("morgan");
const accessLogStream = fs.createWriteStream(__dirname + '/logs.log', { flags: 'a' });
function bootstrap() {
    return __awaiter(this, void 0, void 0, function* () {
        const app = yield core_1.NestFactory.create(app_module_1.AppModule);
        app.useGlobalPipes(new common_1.ValidationPipe());
        app.use(express.static(path.resolve(__dirname, '../uploads')));
        app.use(bodyParser.json({ limit: '50mb' }));
        app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
        app.enableCors();
        app.use(morgan('combined', { stream: accessLogStream }));
        const options = new swagger_1.DocumentBuilder()
            .setTitle('News App Doc')
            .setDescription('The News API description')
            .setVersion('1.0')
            .addTag('News-App')
            .setSchemes('http')
            .build();
        const document = swagger_1.SwaggerModule.createDocument(app, options);
        swagger_1.SwaggerModule.setup('docs', app, document);
        yield app.listen(3001);
    });
}
bootstrap();
//# sourceMappingURL=main.js.map