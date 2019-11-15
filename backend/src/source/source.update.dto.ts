import { ApiModelPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsAlpha, IsAlphanumeric, IsString } from 'class-validator';

export class SourceUpdateDto {
    @ApiModelPropertyOptional()
    @IsOptional()
    name: string;

    @ApiModelPropertyOptional()
    @IsOptional()
    link: string;
}
