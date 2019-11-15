import { Controller, Query, Get, Param, ParseIntPipe, Post, Body, Put, Delete } from '@nestjs/common';
import { PaginationDto } from '../shared/pagination.filter';
import { NotificationService } from './noti.service';
import { ApiUseTags, ApiImplicitParam, ApiImplicitHeader } from '@nestjs/swagger';
import { NotificationDto } from './noti.dto';

@ApiUseTags('notifications')
@Controller('notifications')
export class NotificationController {
    constructor(private notificationsService: NotificationService) { }

    @Get()
    async getAllNotifications(@Query() paginate: PaginationDto) {
        return this.notificationsService.getAllNotifications(paginate);
    }

    @Get('/getOne/:id')
    @ApiImplicitParam({ name: 'id' })
    async getOneNotification(
        @Param('id', new ParseIntPipe()) id,
    ) {
        return this.notificationsService.getOneNotification(id);
    }

    @Post('/new')
    async createNewUser(@Body() noti: NotificationDto) {
        return this.notificationsService.createNewNotification(noti);
    }

    @ApiImplicitParam({ name: 'id' })
    @Put('/update/:id')
    async updateNotification(
        @Param('id', new ParseIntPipe()) id,
    ) {
        return { data: 'done . notification updated' };
    }

    @ApiImplicitParam({ name: 'id' })
    @Delete('/delete/:id')
    async deleteNotification(
        @Param('id', new ParseIntPipe()) id,
    ) {
        return this.notificationsService.deletNotification(id);
    }
}