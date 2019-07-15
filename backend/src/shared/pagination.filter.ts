import { ApiModelPropertyOptional } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';

export enum orderEnum {
    ASC = 'ASC',
    DESC = 'DESC',
}
export class PaginationDto {

    @ApiModelPropertyOptional()
    @Transform(id => parseInt(id))
    @IsOptional()
    limit: number;

    @ApiModelPropertyOptional()
    @Transform(id => parseInt(id))
    @IsOptional()
    page: number;

    @ApiModelPropertyOptional()
    @IsOptional()
    query: string;

    @ApiModelPropertyOptional()
    @IsOptional()
    sortField: string;

    @ApiModelPropertyOptional()
    @IsOptional()
    order: orderEnum;

}
