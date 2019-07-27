import { Category } from '../category/category.entity';
import { HashTag } from '../hashtag/hashtage.entity';
export declare class PostDto {
    title: string;
    body: string;
    backgroundImage: string;
    categories: Category[];
    tags: HashTag[];
}
