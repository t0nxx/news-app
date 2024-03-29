import { ApiModelPropertyOptional } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { Category } from '../category/category.entity';
import { HashTag } from '../hashtag/hashtage.entity';
import { Transform } from 'class-transformer';

export class PostUpdateDto {

    @ApiModelPropertyOptional()
    @IsString()
    title: string;

    @ApiModelPropertyOptional()
    body: string;

    photos: string[];

    @ApiModelPropertyOptional()
    categories: Category[];

    @ApiModelPropertyOptional()
    tags: HashTag[];

    @ApiModelPropertyOptional()
    @Transform(obj => parseInt(obj.id))
    source: number;

}
