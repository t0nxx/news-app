import { Category } from '../category/category.entity';
import { Post } from '../post/post.entity';
import { Comment } from '../comment/comment.entity';
import { Report } from '../report/report.entity';
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
    receiveNotification: boolean;
    password: string;
    changePassCode: number;
    fcmTokens: string[];
    role: UserRole;
    profileImage: string;
    subscribed: Category[];
    bookmarks: Post[];
    posts: Post[];
    comments: Comment[];
    reports: Report[];
    createdAt: Date;
    updatedAt: Date;
}
