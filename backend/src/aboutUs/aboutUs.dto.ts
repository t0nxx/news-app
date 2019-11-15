import { ApiModelProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsAlphanumeric } from 'class-validator';

export class AboutUsDto {
    @ApiModelProperty()
    @IsNotEmpty()
    body: string;

}
