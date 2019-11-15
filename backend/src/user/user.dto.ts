import { IsNotEmpty, IsAlpha, MinLength, MaxLength, IsEmail } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class UserDto {

    @ApiModelProperty()
    @IsNotEmpty()
    fullName: string;

    @ApiModelProperty()
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @ApiModelProperty()
    number: string;

    @ApiModelProperty()
    @IsNotEmpty()
    @MinLength(6)
    password: string;

    profileImage: string;

    @ApiModelProperty()
    img: string;


}
export class resetDTo {
    @ApiModelProperty()
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @ApiModelProperty()
    @IsNotEmpty()
    resetCode: string;
}

export class resetDToAnddPass {
    @ApiModelProperty()
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @ApiModelProperty()
    @IsNotEmpty()
    @MinLength(6)
    password: string;

    @ApiModelProperty()
    @IsNotEmpty()
    resetCode: string;
}