import { ApiModelProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsAlphanumeric } from 'class-validator';

export class HashTagDto {
    @ApiModelProperty()
    @IsNotEmpty()
    name: string;

}
