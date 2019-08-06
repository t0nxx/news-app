import { Post } from '../post/post.entity';
export declare class Source {
    id: number;
    name: string;
    backgroundImage: string;
    posts: Post[];
    createdAt: Date;
    updatedAt: Date;
}
