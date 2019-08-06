import { PaginationDto } from '../shared/pagination.filter';
import { NotificationService } from './noti.service';
import { NotificationDto } from './noti.dto';
export declare class NotificationController {
    private notificationsService;
    constructor(notificationsService: NotificationService);
    getAllNotifications(paginate: PaginationDto): Promise<{
        data: any;
        count: any;
    }>;
    getOneNotification(id: any): Promise<{
        data: import("./noti.entity").Notification;
    }>;
    createNewUser(noti: NotificationDto): Promise<{
        data: import("./noti.entity").Notification;
    }>;
    updateNotification(id: any): Promise<{
        data: string;
    }>;
    deleteNotification(id: any): Promise<{
        data: import("./noti.entity").Notification;
    }>;
}
