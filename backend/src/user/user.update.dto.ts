import { IsAlpha, MinLength, MaxLength, IsOptional, IsEmail } from 'class-validator';
import { ApiModelPropertyOptional } from '@nestjs/swagger';
import { hashSync } from 'bcryptjs';

export class UserUpdateDto {

    @ApiModelPropertyOptional()
    @IsOptional()
    @IsAlpha()
    firstName: string;

    @ApiModelPropertyOptional()
    @IsOptional()
    @IsAlpha()
    lastName: string;

    @ApiModelPropertyOptional()
    @IsOptional()
    @IsEmail()
    email: string;

    @ApiModelPropertyOptional()
    @IsOptional()
    @MinLength(5)
    @MaxLength(20)
    number: string;

    @ApiModelPropertyOptional()
    @IsOptional()
    @MinLength(6)
    password: string;

};

export async function hashUpdatePass(pass) {
    return await hashSync(pass, 10);
}