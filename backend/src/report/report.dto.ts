import { ApiModelProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsAlphanumeric } from 'class-validator';
import { Transform } from 'class-transformer';

export class ReportDto {
    @ApiModelProperty()
    @IsNotEmpty()
    body: string;

    @ApiModelProperty()
    @IsNotEmpty()
    @Transform(id => parseInt(id))
    commentId: number;
    
}
