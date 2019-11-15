import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PaginationDto } from '../shared/pagination.filter';
import { FormatQueryOrderAndPagination } from '../shared/QueryOrderFormat';
import { Notification } from './noti.entity';
import { NotificationDto } from './noti.dto';
import { User } from '../user/user.entity';
import { chunk, flatten } from 'lodash';
import { sendNotification } from './fcm';

@Injectable()
export class NotificationService {
    constructor(
        @InjectRepository(Notification)
        private readonly notificationRepository: Repository<Notification>,
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) { }

    async getAllNotifications(paginate) {
        const q = this.notificationRepository.createQueryBuilder('notification');
        const qAfterFormat = FormatQueryOrderAndPagination(paginate, q, ['title', 'body']);
        const [data, count] = await qAfterFormat.getManyAndCount();
        return { data, count };
    }

    async getOneNotification(id) {
        const findOne = await this.notificationRepository.findOne({ id });
        if (!findOne) {
            throw new NotFoundException('invalid id');
        }
        return { data: findOne };
    }

    async createNewNotification(noti: NotificationDto) {

        const users = await this.userRepository.createQueryBuilder('user')
            .innerJoinAndSelect('user.subscribed', 'categories')
            .where(`categories.id IN (${noti.categories})`)
            .select(['user.fcmTokens'])
            .getMany();

        const tokens = users.map(e => e.fcmTokens);
        const flatArr = flatten(tokens);
        // max of fcm tokens is 100 per req
        const splited = chunk(flatArr, 99);

        splited.forEach(arr => {
            // remove empty from the array
            arr = arr.filter(e => e.length)
            const message = {
                notification: {
                    title: noti.title,
                    body: noti.body,
                },
                android: {
                    priority: 'high',
                    notification: {
                        sound: 'default',
                    }
                },
                tokens: arr,
            };
            sendNotification(message);
        });

        const notification = new Notification();
        notification.title = noti.title;
        notification.body = noti.body;

        const save = await this.notificationRepository.save(notification);

        return { data: save };

    }

    async deletNotification(id) {
        const findOne = await this.notificationRepository.findOne(id);
        if (!findOne) {
            throw new NotFoundException('invalid id');
        }
        await this.notificationRepository.delete(id);
        return { data: findOne };
    }
}