import { User } from '../user/user.entity';
import { Post } from '../post/post.entity';
export declare class Comment {
    id: number;
    body: string;
    reports: number;
    children: Comment[];
    parent: Comment;
    user: User;
    post: Post;
    createdAt: Date;
    updatedAt: Date;
}
