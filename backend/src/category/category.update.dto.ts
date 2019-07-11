import { ApiModelPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsAlpha, IsAlphanumeric } from 'class-validator';

export class CategoryUpdateDto {
    @ApiModelPropertyOptional()
    @IsOptional()
    @IsAlphanumeric()
    name: string;
}
