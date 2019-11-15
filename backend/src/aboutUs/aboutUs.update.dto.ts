import { ApiModelProperty, ApiModelPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsAlphanumeric } from 'class-validator';

export class AboutUsUpdateDto {
    @ApiModelPropertyOptional()
    @IsOptional()
    body: string;

}
