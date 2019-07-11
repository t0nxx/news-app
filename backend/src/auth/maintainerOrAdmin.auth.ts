import { NestMiddleware, UnauthorizedException } from "@nestjs/common";
import { Request, Response, NextFunction } from 'express';
export class MaintainerOrAdminMiddleAuth implements NestMiddleware {
    async use(req: Request, res: Response, next: NextFunction) {
        const isLogedIn = req['user'];
        if (!isLogedIn) {
            throw new UnauthorizedException('Not authorized');
        }
        if (isLogedIn.role === 'admin' || isLogedIn.role === 'maintainer') {
            next();
        } else {
            throw new UnauthorizedException('Not authorized');
        }
    }
}