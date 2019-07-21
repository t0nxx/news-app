import { IsNotEmpty, IsString, IsArray } from 'class-validator';
import { ApiModelProperty, ApiModelPropertyOptional } from '@nestjs/swagger';
import { Category } from '../category/category.entity';
import { HashTag } from '../hashtag/hashtage.entity';

export class PostDto {

    @ApiModelProperty()
    @IsNotEmpty()
    @IsString()
    title: string;

    @ApiModelProperty()
    @IsNotEmpty()
    @IsString()
    body: string;

    backgroundImage: string;

    photos: string[];

    @ApiModelPropertyOptional()
    categories: Category[];

    @ApiModelPropertyOptional()
    tags: HashTag[];
}
