import { IsNotEmpty, IsAlphanumeric } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class NotificationDto {
    @ApiModelProperty()
    @IsNotEmpty()
    title: string;

    @ApiModelProperty()
    @IsNotEmpty()
    body: string;

    @ApiModelProperty()
    @IsNotEmpty()
    categories: number[];

}
