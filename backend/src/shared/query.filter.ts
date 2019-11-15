import { ApiModelPropertyOptional } from '@nestjs/swagger';
import { IsOptional, Min } from 'class-validator';
import { Transform } from 'class-transformer';
import { PaginationDto } from './pagination.filter';

export class QueryDto extends PaginationDto {

    @ApiModelPropertyOptional()
    @Transform(id => parseInt(id))
    @IsOptional()
    @Min(0)
    priceFrom: number;

    @ApiModelPropertyOptional()
    @Transform(id => parseInt(id))
    @IsOptional()
    @Min(0)
    priceTo: number;

}
