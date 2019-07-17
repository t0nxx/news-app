import { ApiModelPropertyOptional } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { Category } from '../category/category.entity';
import { HashTag } from '../hashtag/hashtage.entity';

export class PostUpdateDto {

    @ApiModelPropertyOptional()
    @IsString()
    content: string;

    @ApiModelPropertyOptional()
    categories: Category[];

    @ApiModelPropertyOptional()
    tags: HashTag[];
}
