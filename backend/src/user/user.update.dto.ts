import { IsAlpha, MinLength, MaxLength, IsOptional, IsEmail } from 'class-validator';
import { ApiModelPropertyOptional, ApiModelProperty } from '@nestjs/swagger';
import { hashSync } from 'bcryptjs';

export class UserUpdateDto {

    @ApiModelPropertyOptional()
    fullName: string;

    @ApiModelPropertyOptional()
    @IsOptional()
    @IsEmail()
    email: string;

    @ApiModelPropertyOptional()
    @IsOptional()
    number: string;

    @ApiModelPropertyOptional()
    @IsOptional()
    @MinLength(6)
    password: string;

    profileImage: string;
    
    @ApiModelProperty()
    img: string;

    @ApiModelPropertyOptional()
    @IsOptional()
    receiveNotification: boolean;

};

export async function hashUpdatePass(pass) {
    return await hashSync(pass, 10);
}