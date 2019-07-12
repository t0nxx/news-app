import { ApiModelPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsAlpha, IsAlphanumeric, IsString } from 'class-validator';

export class CategoryUpdateDto {
    @ApiModelPropertyOptional()
    @IsOptional()
    @IsString()
    name: string;
}
