import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User, UserRole } from './user.entity';
import { Repository } from 'typeorm';
import { UserDto } from './user.dto';
import { UserUpdateDto } from './user.update.dto';
import { hashSync } from 'bcryptjs';
import { generateJwtToken } from '../shared/generate.jwt';
import { PaginationDto } from '../shared/pagination.filter';
import { Category } from '../category/category.entity';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        @InjectRepository(Category)
        private readonly categoryRepository: Repository<Category>,
    ) { }

    /* get all users */
    async getAllUsers(paginate: PaginationDto): Promise<any> {
        if (!paginate.page) { paginate.page = 1; }
        if (!paginate.limit) { paginate.limit = 10; }
        const [data, count] = await this.userRepository.findAndCount({
            select: ['id', 'firstName', 'lastName', 'email', 'number', 'role', 'createdAt'],
            take: paginate.limit,
            skip: paginate.page * (paginate.page - 1)
        });
        return { data, count };
    }

    /* get one user */
    async getOneUser(userId: number) {
        const findOne = await this.userRepository.findOne({ id: userId }, { relations: ['subscribed'] });
        if (!findOne) {
            throw new NotFoundException('invalid id');
        }
        const { id, firstName, lastName, email, number, role, subscribed } = findOne;
        return {
            data: {
                id,
                firstName,
                lastName,
                email,
                number,
                joined: findOne.createdAt,
                role,
                subscribed,
            },
        };
    }

    /* add new user */
    async createNewUser(userDto: UserDto) {
        /* to fire before insert trigger
         we need to creat instance of entity first
        then assign the porps to it .
        */
        try {
            const newUser = new User();
            Object.assign(newUser, userDto);
            newUser.password = await hashSync(newUser.password, 10);
            const saveUser = await this.userRepository.save(newUser);
            return {
                data: {
                    id: saveUser.id,
                    firstName: saveUser.firstName,
                    lastName: saveUser.lastName,
                    email: saveUser.email,
                    number: saveUser.number,
                    joined: saveUser.createdAt,
                },
                token: await generateJwtToken({
                    id: saveUser.id,
                    email: saveUser.email,
                    changePassCode: saveUser.changePassCode,
                }),
            };
        } catch (error) {
            if (error.errno === 1062) {
                throw new BadRequestException('email alreardy exist');
            }
        }

    }

    /* update user */
    async updateUser(id: number, updateUser: UserUpdateDto): Promise<any> {
        const findOne = await this.userRepository.findOne(id);
        if (!findOne) {
            throw new NotFoundException('invalid id');
        }
        if (Object.keys(updateUser).length <= 0) {
            throw new BadRequestException('no data provided');
        }
        try {
            if (updateUser.password) {
                updateUser.password = await hashSync(updateUser.password, 10);
                const changePassCode = Math.floor(100000 + Math.random() * 900000);
                await this.userRepository.update({ id: findOne.id }, { changePassCode });
            }

            await this.userRepository.update({ id: findOne.id }, updateUser);
            const updated = await this.userRepository.findOne(id);
            const { firstName, lastName, email, number, changePassCode } = updated;

            return {
                data: {
                    firstName,
                    lastName,
                    email,
                    number,
                    joined: findOne.createdAt,
                },
                token: await generateJwtToken({
                    id,
                    email,
                    changePassCode,
                }),
            };
        } catch (error) {
            if (error.errno === 1062) {
                throw new BadRequestException('email alreardy exist');
            }
        }

    }

    /* delete one user */
    async deletUser(id: number) {
        const findOne = await this.userRepository.findOne(id);
        if (!findOne) {
            throw new NotFoundException('invalid id');
        }
        await this.userRepository.delete(id);
        return 'done . user deleted';
    }

    /* promote User Level */
    async promoteUserLevel(id: number, newRole: string) {
        const findOne = await this.userRepository.findOne(id);
        if (!findOne) {
            throw new NotFoundException('invalid id');
        }
        switch (newRole) {
            case 'ADMIN':
                findOne.role = UserRole.ADMIN;
                break;
            case 'MAINTAINER':
                findOne.role = UserRole.MAINTAINER;
                break;
            default:
                findOne.role = UserRole.USER;
                break;
        }
        await this.userRepository.save(findOne);
        return { data: 'done role upgraded' };
    }

    /* subscribe to categories */
    async subscribeToCategories(id: number, categories: Category[]) {
        const findOne = await this.userRepository.findOne(id, { relations: ['subscribed'] });
        if (!findOne) {
            throw new NotFoundException('invalid id');
        }
        const result = await this.categoryRepository.findByIds(categories);
        findOne.subscribed.push(...result);
        const subDone = await this.userRepository.save(findOne);
        return { data: 'subscribe Done' };
    }

    /* subscribe to categories */
    async UnsubscribeFromCategories(id: number, categories: Category[]) {
        const findOne = await this.userRepository.findOne(id, { relations: ['subscribed'] });
        if (!findOne) {
            throw new NotFoundException('invalid id');
        }
        const result = await this.categoryRepository.findByIds(categories);

        const filtered = findOne.subscribed.filter(element => !result.find(remove => remove.id == element.id));
        findOne.subscribed = filtered;
        const UnsubDone = await this.userRepository.save(findOne);
        return { data: 'Unsubscribe Done' };
    }
}
