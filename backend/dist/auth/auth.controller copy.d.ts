import { EmailLoginDto } from './login.dto';
import { AuthService } from './auth.service';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    emailLogin(emailDto: EmailLoginDto): Promise<any>;
}
