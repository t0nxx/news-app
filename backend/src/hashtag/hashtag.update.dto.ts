import { ApiModelProperty, ApiModelPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsAlphanumeric } from 'class-validator';

export class HashTagUpdateDto {
    @ApiModelPropertyOptional()
    @IsOptional()
    @IsAlphanumeric()
    name: string;

}
