import { NestMiddleware } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { Request, Response, NextFunction } from 'express';
export declare class UserAuthMiddleware implements NestMiddleware {
    private userService;
    constructor(userService: UserService);
    use(req: Request, res: Response, next: NextFunction): Promise<void>;
}
