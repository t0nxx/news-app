import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EmailLoginDto } from './login.dto';
import * as bcrypt from 'bcryptjs';
import { generateJwtToken } from '../shared/generate.jwt';
import { User } from '../user/user.entity';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) { }
    async emailLogin(emailDto: EmailLoginDto): Promise<any> {
        const user = await this.userRepository.findOne({ email: emailDto.email });
        if (!user) { throw new BadRequestException('invalid email / password'); }

        const checkPass = await bcrypt.compareSync(emailDto.password, user.password);
        if (!checkPass) { throw new BadRequestException('invalid email / password'); }
        return {
            data: {
                id: user.id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                number: user.number,
            },
            token: await generateJwtToken({
                id: user.id,
                email: user.email,
                changePassCode: user.changePassCode,
            }),
        };

    }
}
