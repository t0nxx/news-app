import { Repository } from 'typeorm';
import { EmailLoginDto } from './login.dto';
import { User } from '../user/user.entity';
export declare class AuthService {
    private readonly userRepository;
    constructor(userRepository: Repository<User>);
    emailLogin(emailDto: EmailLoginDto): Promise<any>;
    adminEmailLogin(emailDto: EmailLoginDto): Promise<any>;
}
