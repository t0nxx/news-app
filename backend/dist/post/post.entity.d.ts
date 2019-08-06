import { User } from '../user/user.entity';
import { Category } from '../category/category.entity';
import { HashTag } from '../hashtag/hashtage.entity';
import { Comment } from '../comment/comment.entity';
import { Source } from '../source/source.entity';
export declare class Post {
    id: number;
    title: string;
    body: string;
    backgroundImage: string;
    reactionsCount: number;
    user: User;
    source: Source;
    categories: Category[];
    tags: HashTag[];
    comments: Comment[];
    createdAt: Date;
    updatedAt: Date;
}
