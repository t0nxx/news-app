import { IsNotEmpty, IsAlpha, MinLength, MaxLength, IsEmail } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class UserDto {

    @ApiModelProperty()
    @IsNotEmpty()
    @IsAlpha()
    firstName: string;

    @ApiModelProperty()
    @IsNotEmpty()
    @IsAlpha()
    lastName: string;

    @ApiModelProperty()
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @ApiModelProperty()
    @IsNotEmpty()
    @MinLength(5)
    @MaxLength(20)
    number: string;

    @ApiModelProperty()
    @IsNotEmpty()
    @MinLength(6)
    password: string;

}
