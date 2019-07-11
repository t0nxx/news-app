import { Category } from '../category/category.entity';
export declare enum UserRole {
    ADMIN = "admin",
    MAINTAINER = "maintainer",
    USER = "user"
}
export declare class User {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    number: string;
    password: string;
    changePassCode: number;
    role: UserRole;
    subscribed: Category[];
    createdAt: Date;
    updatedAt: Date;
}
