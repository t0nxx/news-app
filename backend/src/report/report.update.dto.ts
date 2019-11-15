import { ApiModelProperty, ApiModelPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsAlphanumeric, IsNotEmpty } from 'class-validator';
import { Transform } from 'class-transformer';

export class ReportUpdateDto {
    @ApiModelProperty()
    @IsNotEmpty()
    body: string;

    @ApiModelProperty()
    @IsNotEmpty()
    @Transform(id => parseInt(id))
    commentId: number;

}
