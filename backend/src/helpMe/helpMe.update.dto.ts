import { ApiModelProperty, ApiModelPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsAlphanumeric } from 'class-validator';

export class HelpMeUpdateDto {
    @ApiModelPropertyOptional()
    @IsOptional()
    name: string;

    @ApiModelPropertyOptional()
    @IsOptional()
    email: string;

    @ApiModelPropertyOptional()
    @IsOptional()
    phone: string;

    @ApiModelPropertyOptional()
    @IsOptional()
    description: string;

}
