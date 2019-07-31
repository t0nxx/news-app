import { UserService } from './user.service';
import { UserDto } from './user.dto';
import { UserUpdateDto } from './user.update.dto';
import { PaginationDto } from '../shared/pagination.filter';
import { Category } from '../category/category.entity';
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
            subscribed: Category[];
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
            subscribed: Category[];
        };
    }>;
    createNewUser(userDto: UserDto): Promise<{
        data: {
            id: number;
            fullName: string;
            email: string;
            number: string;
            joined: Date;
        };
        token: string;
    }>;
    updateUser(id: any, updateUserDto: UserUpdateDto): Promise<any>;
    deletPie(id: any): Promise<string>;
    promoteUserLevel(id: any, role: string): Promise<{
        data: import("./user.entity").User;
    }>;
    subscribeToCategories(id: any, categories: number[]): Promise<{
        data: string;
    }>;
    UnsubscribeFromCategories(id: any, categories: number[]): Promise<{
        data: string;
    }>;
}
