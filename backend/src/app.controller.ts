import { Controller, Get, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { Response } from 'express-serve-static-core';
import { ApiExcludeEndpoint } from '@nestjs/swagger';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }
  @ApiExcludeEndpoint()
  @Get('/logtoni')
  getlog(@Res() res: Response) {
    return res.sendFile(__dirname + '/logs.log');
  }
}
