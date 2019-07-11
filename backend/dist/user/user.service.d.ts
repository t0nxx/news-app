import { User, UserRole } from './user.entity';
import { Repository } from 'typeorm';
import { UserDto } from './user.dto';
import { UserUpdateDto } from './user.update.dto';
import { PaginationDto } from '../shared/pagination.filter';
import { Category } from '../category/category.entity';
export declare class UserService {
    private readonly userRepository;
    private readonly categoryRepository;
    constructor(userRepository: Repository<User>, categoryRepository: Repository<Category>);
    getAllUsers(paginate: PaginationDto): Promise<any>;
    getOneUser(userId: number): Promise<{
        data: {
            id: number;
            firstName: string;
            lastName: string;
            email: string;
            number: string;
            joined: Date;
            role: UserRole;
            subscribed: Category[];
        };
    }>;
    createNewUser(userDto: UserDto): Promise<{
        data: {
            id: number;
            firstName: string;
            lastName: string;
            email: string;
            number: string;
            joined: Date;
        };
        token: string;
    }>;
    updateUser(id: number, updateUser: UserUpdateDto): Promise<any>;
    deletUser(id: number): Promise<string>;
    promoteUserLevel(id: number, newRole: string): Promise<string>;
    subscribeToCategories(id: number, categories: Category[]): Promise<string>;
    UnsubscribeFromCategories(id: number, categories: Category[]): Promise<string>;
}
