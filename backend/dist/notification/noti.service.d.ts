import { Repository } from 'typeorm';
import { Notification } from './noti.entity';
import { NotificationDto } from './noti.dto';
import { User } from '../user/user.entity';
export declare class NotificationService {
    private readonly notificationRepository;
    private readonly userRepository;
    constructor(notificationRepository: Repository<Notification>, userRepository: Repository<User>);
    getAllNotifications(paginate: any): Promise<{
        data: any;
        count: any;
    }>;
    getOneNotification(id: any): Promise<{
        data: Notification;
    }>;
    createNewNotification(noti: NotificationDto): Promise<{
        data: Notification;
    }>;
    deletNotification(id: any): Promise<{
        data: Notification;
    }>;
}
