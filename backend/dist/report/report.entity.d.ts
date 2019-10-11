import { Comment } from '../comment/comment.entity';
import { User } from '../user/user.entity';
export declare class Report {
    id: number;
    body: string;
    comment: Comment;
    user: User;
    createdAt: Date;
    updatedAt: Date;
}
