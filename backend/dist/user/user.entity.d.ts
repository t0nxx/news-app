import { Category } from '../category/category.entity';
import { Post } from '../post/post.entity';
import { Comment } from '../comment/comment.entity';
export declare enum UserRole {
    ADMIN = "admin",
    MAINTAINER = "maintainer",
    USER = "user"
}
export declare class User {
    id: number;
    fullName: string;
    email: string;
    number: string;
    password: string;
    changePassCode: number;
    fcmToken: string;
    role: UserRole;
    subscribed: Category[];
    posts: Post[];
    comments: Comment[];
    createdAt: Date;
    updatedAt: Date;
}
