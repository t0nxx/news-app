import { Category } from '../category/category.entity';
import { HashTag } from '../hashtag/hashtage.entity';
export declare class PostUpdateDto {
    title: string;
    body: string;
    photos: string[];
    categories: Category[];
    tags: HashTag[];
    source: number;
}
