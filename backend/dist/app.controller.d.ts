import { AppService } from './app.service';
import { Response } from 'express-serve-static-core';
export declare class AppController {
    private readonly appService;
    constructor(appService: AppService);
    getlog(res: Response): void;
}
