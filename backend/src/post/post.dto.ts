import { IsNotEmpty, IsString, IsArray } from 'class-validator';
import { ApiModelProperty, ApiModelPropertyOptional } from '@nestjs/swagger';
import { Category } from '../category/category.entity';
import { HashTag } from '../hashtag/hashtage.entity';
import { Transform } from 'class-transformer';

export class PostDto {

    @ApiModelProperty()
    @IsNotEmpty()
    title: string;

    @ApiModelProperty()
    body: string;

    @ApiModelProperty()
    @Transform(id => parseInt(id))
    source: number;

    backgroundImage: string;

    @ApiModelPropertyOptional()
    categories: Category[];

    @ApiModelPropertyOptional()
    tags: HashTag[];
}
