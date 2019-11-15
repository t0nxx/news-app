import { ApiModelProperty, ApiModelPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsAlphanumeric } from 'class-validator';

export class TermsUpdateDto {
    @ApiModelPropertyOptional()
    @IsOptional()
    body: string;

}
