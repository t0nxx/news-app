import { UserService } from './user.service';
import { resetDTo, resetDToAnddPass } from './user.dto';
import { UserUpdateDto } from './user.update.dto';
import { PaginationDto } from '../shared/pagination.filter';
import { Category } from '../category/category.entity';
import { NotiTokenDto } from './notiToken.dto';
export declare class UserController {
    private userService;
    constructor(userService: UserService);
    getAllUsers(paginate: PaginationDto): Promise<any>;
    getOneUser(id: any): Promise<{
        data: {
            id: number;
            fullName: string;
            email: string;
            number: string;
            joined: Date;
            role: import("./user.entity").UserRole;
            profileImage: string;
            receiveNotification: boolean;
            subscribed: Category[];
            bookmarks: import("../post/post.entity").Post[];
        };
    }>;
    getMe(id: any): Promise<{
        data: {
            id: number;
            fullName: string;
            email: string;
            number: string;
            joined: Date;
            role: import("./user.entity").UserRole;
            profileImage: string;
            receiveNotification: boolean;
            subscribed: Category[];
            bookmarks: import("../post/post.entity").Post[];
        };
    }>;
    createNewUser(userDto: any, image: any): Promise<{
        data: {
            id: number;
            fullName: string;
            email: string;
            number: string;
            profileImage: string;
            joined: Date;
        };
        token: string;
    }>;
    updateUser(id: any, updateUserDto: UserUpdateDto, image: any): Promise<any>;
    updateUserNotificationToken(id: any, updateUserNotiTokenDto: NotiTokenDto): Promise<any>;
    deletPie(id: any): Promise<{
        data: {
            id: number;
        };
    }>;
    deletUserDashboard(id: any, UserId: any): Promise<{
        data: {
            id: number;
        };
    }>;
    promoteUserLevel(id: any, role: string): Promise<{
        data: import("./user.entity").User;
    }>;
    subscribeToCategories(id: any, categories: number[]): Promise<{
        data: string;
    }>;
    UnsubscribeFromCategories(id: any, categories: number[]): Promise<{
        data: string;
    }>;
    forgetPassword(body: any): Promise<{
        data: string;
    }>;
    validResetCode(resDto: resetDTo): Promise<{
        data: string;
    }>;
    changePasswordAfterResetode(resAndPAss: resetDToAnddPass): Promise<{
        data: string;
    }>;
}
