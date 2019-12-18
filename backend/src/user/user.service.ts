import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User, UserRole } from './user.entity';
import { Repository } from 'typeorm';
import { UserDto, resetDTo, resetDToAnddPass } from './user.dto';
import { UserUpdateDto } from './user.update.dto';
import { hashSync } from 'bcryptjs';
import { generateJwtToken } from '../shared/generate.jwt';
import { PaginationDto } from '../shared/pagination.filter';
import { Category } from '../category/category.entity';
import { FormatQueryOrderAndPagination } from '../shared/QueryOrderFormat';
import { NotiTokenDto } from './notiToken.dto';
import { sendMail } from '../shared/sendMail';

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
        const q = this.userRepository.createQueryBuilder('user');
        q.select(['user.id', 'user.fullName', 'user.email', 'user.number', 'user.role', 'user.createdAt', 'user.updatedAt']);
        const qAfterFormat = FormatQueryOrderAndPagination(paginate, q, ['email', 'role', 'number', 'fullName']);
        const [data, count] = await qAfterFormat.getManyAndCount();
        return { data, count };
    }

    /* get one user */
    async getOneUser(userId: number) {
        const findOne = await this.userRepository.findOne({ id: userId }, { relations: ['subscribed', 'bookmarks'] });
        if (!findOne) {
            throw new NotFoundException('invalid id');
        }
        const { id, fullName, email, number, role, profileImage, subscribed, receiveNotification, bookmarks } = findOne;
        return {
            data: {
                id,
                fullName,
                email,
                number,
                joined: findOne.createdAt,
                role,
                profileImage,
                receiveNotification,
                subscribed,
                bookmarks,
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
                    fullName: saveUser.fullName,
                    email: saveUser.email,
                    number: saveUser.number,
                    profileImage: saveUser.profileImage,
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
            const { fullName, email, number, changePassCode, profileImage, receiveNotification } = updated;

            return {
                data: {
                    fullName,
                    email,
                    number,
                    joined: findOne.createdAt,
                    profileImage,
                    receiveNotification,
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

    /* update notification token */
    async addNotificationToken(id: number, token: NotiTokenDto): Promise<any> {
        const findOne = await this.userRepository.findOne(id);
        if (!findOne) {
            throw new NotFoundException('invalid id');
        }

        if (token.oldToken) {
            findOne.fcmTokens.splice(findOne.fcmTokens.indexOf(token.oldToken, 1));
        }
        if (findOne.fcmTokens == null) {
            findOne.fcmTokens = [];
        }

        findOne.fcmTokens.push(token.newToken);
        let newArr = new Set(...findOne.fcmTokens);
        findOne.fcmTokens = [...newArr];

        await this.userRepository.save(findOne);
        return 'done . token added';
    }
    /* delete one user */
    async deletUser(userId: number) {
        const findOne = await this.userRepository.findOne({ id: userId });
        if (!findOne) {
            throw new NotFoundException('invalid id');
        }
        const { id } = findOne;
        await this.userRepository.delete(id);
        return { data: { id } };
    }

    /* promote User Level */
    async promoteUserLevel(id: number, newRole: string) {
        const findOne = await this.userRepository.findOne(id);
        if (!findOne) {
            throw new NotFoundException('invalid id');
        }
        let role;
        switch (newRole) {
            case 'admin':
                role = UserRole.ADMIN;
                break;
            case 'maintainer':
                role = UserRole.MAINTAINER;
                break;
            default:
                role = UserRole.USER;
                break;
        }
        await this.userRepository.update({ id: findOne.id }, { role });
        const updated = await this.userRepository.findOne(id);
        return { data: updated };
    }

    /* subscribe to categories */
    async subscribeToCategories(id: number, categories) {
        const findOne = await this.userRepository.findOne(id, { relations: ['subscribed'] });
        if (!findOne) {
            throw new NotFoundException('invalid id');
        }
        const result = await this.categoryRepository.findByIds(categories);
        findOne.subscribed.push(...result);
        const subDone = await this.userRepository.save(findOne);
        return this.getOneUser(id);
    }

    /* subscribe to categories */
    async UnsubscribeFromCategories(id: number, categories) {
        const findOne = await this.userRepository.findOne(id, { relations: ['subscribed'] });
        if (!findOne) {
            throw new NotFoundException('invalid id');
        }
        const result = await this.categoryRepository.findByIds(categories);

        const filtered = findOne.subscribed.filter(element => !result.find(remove => remove.id == element.id));
        findOne.subscribed = filtered;
        const UnsubDone = await this.userRepository.save(findOne);

        return this.getOneUser(id);
    }
    /* forget password */
    async forgetPassword(body) {
        const findOne = await this.userRepository.findOne({ email: body.email });
        if (!findOne) { throw new BadRequestException('email not found'); }
        findOne.changePassCode = Math.floor(100000 + Math.random() * 900000);
        await this.userRepository.save(findOne);
        sendMail(findOne.email, findOne.changePassCode);
        return { data: 'Done. reset code was sent to your email' };
    }
    /*valid reset code  */
    async validResetCode(resDto: resetDTo) {
        const findOne = await this.userRepository.findOne({ email: resDto.email });
        if (!findOne) { throw new BadRequestException('email not found'); }
        if (findOne.changePassCode !== parseInt(resDto.resetCode)) {
            { throw new BadRequestException('bad reset code '); }
        }
        return { data: 'Good Code' };

    }

    /* changePasswordAfterResetode */
    async changePasswordAfterResetode(resAndPAss: resetDToAnddPass) {
        const findOne = await this.userRepository.findOne({ email: resAndPAss.email });
        if (!findOne) { throw new BadRequestException('email not found'); }
        if (findOne.changePassCode !== parseInt(resAndPAss.resetCode)) {
            { throw new BadRequestException('bad reset code '); }
        }
        findOne.password = await hashSync(resAndPAss.password, 10);
        await this.userRepository.save(findOne);
        return { data: 'Done . Password changed , please login again' }

    }
}
