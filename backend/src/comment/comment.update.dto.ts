import { ApiModelProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CommentUpdateDto {
    @ApiModelProperty()
    @IsNotEmpty()
    body: string;
}
