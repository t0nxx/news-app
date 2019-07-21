import { ApiModelProperty, ApiModelPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';

export class CommentDto {
    @ApiModelProperty()
    @IsNotEmpty()
    body: string;

    @ApiModelProperty()
    @Transform(id => parseInt(id))
    postId: number;

    @ApiModelPropertyOptional()
    @IsOptional()
    @Transform(id => parseInt(id))
    parentId: number;
}
