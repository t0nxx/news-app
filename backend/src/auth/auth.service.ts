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
                firstName: user.fullName,
                email: user.email,
                number: user.number,
                profileImage: user.profileImage,
                role: user.role,
                receiveNotification: user.receiveNotification,
            },
            token: await generateJwtToken({
                id: user.id,
                email: user.email,
                changePassCode: user.changePassCode,
            }),
        };

    }
    /* admin & maintainer login */
    async adminEmailLogin(emailDto: EmailLoginDto): Promise<any> {
        const user = await this.userRepository.findOne({ email: emailDto.email });
        if (!user) { throw new BadRequestException('invalid email / password'); }

        const checkPass = await bcrypt.compareSync(emailDto.password, user.password);
        if (!checkPass) { throw new BadRequestException('invalid email / password'); }
        /* check if admin or maintainer */
        if (user.role === 'user') { throw new BadRequestException('invalid email / password'); }
        return {
            data: {
                id: user.id,
                fullName: user.fullName,
                email: user.email,
                number: user.number,
                role: user.role,
            },
            token: await generateJwtToken({
                id: user.id,
                email: user.email,
                changePassCode: user.changePassCode,
            }),
        };

    }
}
