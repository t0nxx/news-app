import { ApiModelProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsAlphanumeric, IsEmail } from 'class-validator';

export class HelpMeDto {
    @ApiModelProperty()
    @IsNotEmpty()
    name: string;

    @ApiModelProperty()
    @IsEmail()
    email: string;

    @ApiModelProperty()
    @IsNotEmpty()
    phone: string;

    @ApiModelProperty()
    @IsNotEmpty()
    descrption: string;


}
