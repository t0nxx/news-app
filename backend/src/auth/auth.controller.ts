import { Controller, Post, Body } from '@nestjs/common';
import { ApiUseTags } from '@nestjs/swagger';
import { EmailLoginDto } from './login.dto';
import { AuthService } from './auth.service';

@ApiUseTags('auth')
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post('/login')
    async emailLogin(@Body() emailDto: EmailLoginDto) {
        return this.authService.emailLogin(emailDto);
    }
    @Post('/login/admin')
    async adminLogin(@Body() emailDto: EmailLoginDto) {
        return this.authService.adminEmailLogin(emailDto);
    }
}
