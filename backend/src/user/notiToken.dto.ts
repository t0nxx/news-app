import { ApiModelProperty, ApiModelPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class NotiTokenDto {

    @ApiModelProperty()
    @IsNotEmpty()
    newToken: string;

    @ApiModelPropertyOptional()
    oldToken: string;

}
