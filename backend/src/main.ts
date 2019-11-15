import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as express from 'express';
import * as path from 'path';
import * as bodyParser from 'body-parser';
import * as  fs from 'fs';
import * as  morgan from 'morgan';
const accessLogStream = fs.createWriteStream(__dirname + '/logs.log', { flags: 'a' });

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.use(express.static(path.resolve(__dirname, '../uploads')));
  app.use(bodyParser.json({ limit: '50mb' }));
  app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
  app.enableCors();
  app.use(morgan('combined', { stream: accessLogStream }));
  const options = new DocumentBuilder()
    .setTitle('News App Doc')
    .setDescription('The News API description')
    .setVersion('1.0')
    .addTag('News-App')
    .setSchemes('https')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('docs', app, document);

  await app.listen(3001);
}
bootstrap();
