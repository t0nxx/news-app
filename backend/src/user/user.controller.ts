import { Controller, Get, Body, ParseIntPipe, Post, Put, Delete, Query, Param, UseInterceptors, UploadedFile } from '@nestjs/common';
import { ApiUseTags, ApiImplicitParam, ApiImplicitHeader, ApiImplicitQuery, ApiImplicitBody } from '@nestjs/swagger';
import { UserService } from './user.service';
import { UserDto, resetDTo, resetDToAnddPass } from './user.dto';
import { UserUpdateDto } from './user.update.dto';
import { User } from './user.decorator';
import { PaginationDto } from '../shared/pagination.filter';
import { Category } from '../category/category.entity';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadToS3, UploadToS3Base64 } from '../shared/awsUploader';
import { NotiTokenDto } from './notiToken.dto';

@ApiUseTags('users')
@Controller('users')
export class UserController {
    constructor(private userService: UserService) { }

    @ApiImplicitHeader({ name: 'authorization', required: true })
    @Get()
    async getAllUsers(
        @Query() paginate: PaginationDto
    ) {
        return this.userService.getAllUsers(paginate);
    }

    @ApiImplicitHeader({ name: 'authorization', required: true })
    @Get('/getOne/:id')
    async getOneUser(@Param('id') id) {
        return this.userService.getOneUser(id);
    }

    @ApiImplicitHeader({ name: 'authorization', required: true })
    @Get('/me')
    async getMe(@User('id') id) {
        return this.userService.getOneUser(id);
    }

    @Post('/new')
    @UseInterceptors(FileInterceptor('image'))
    async createNewUser(@Body() userDto: UserDto, @UploadedFile() image: any) {
        // if (image) {
        //     userDto.profileImage = await UploadToS3(image);
        // }
        if (userDto.img) {
            userDto.profileImage = await UploadToS3Base64(userDto.img);
        }
        //console.log(userDto);

        return this.userService.createNewUser(userDto);
    }

    @ApiImplicitHeader({ name: 'authorization', required: true })
    @Put('/update/me')
    @UseInterceptors(FileInterceptor('image'))
    async updateUser(
        @User('id') id,
        @Body() updateUserDto: UserUpdateDto,
        // @UploadedFile() image: any,
    ) {
        if (updateUserDto.img) {
            updateUserDto.profileImage = await UploadToS3Base64(updateUserDto.img);
            delete updateUserDto.img;
        }
        return await this.userService.updateUser(id, updateUserDto);
    }

    @ApiImplicitHeader({ name: 'authorization', required: true })
    @Put('/update/me/addNotificationToken')
    async updateUserNotificationToken(
        @User('id') id,
        @Body() updateUserNotiTokenDto: NotiTokenDto,
    ) {
        return await this.userService.addNotificationToken(id, updateUserNotiTokenDto);
    }

    @ApiImplicitHeader({ name: 'authorization', required: true })
    @Delete('/delete/me')
    @ApiImplicitParam({ name: 'id' })
    async deletPie(@User('id') id) {
        return this.userService.deletUser(id);
    }

    @Delete('/delete/:id')
    @ApiImplicitParam({ name: 'id' })
    async deletUserDashboard(@User('id') id, @Param('id') UserId) {
        return this.userService.deletUser(UserId);
    }

    @ApiImplicitHeader({ name: 'authorization', required: true })
    @ApiImplicitQuery({ name: 'id', type: 'number', required: true })
    @ApiImplicitQuery({ name: 'role', enum: ['ADMIN', 'MAINTAINER', 'USER'], required: true })
    @Put('/promote/:id')
    async promoteUserLevel(
        @Param('id', new ParseIntPipe()) id,
        @Body('role') role: string,
    ) {
        return this.userService.promoteUserLevel(id, role);
    }

    /* start relations */

    @ApiImplicitHeader({ name: 'authorization', required: true })
    @Put('/update/me/subscribe')
    async subscribeToCategories(
        @User('id') id,
        @Body() categories: number[],
    ) {
        return await this.userService.subscribeToCategories(id, categories);
    }

    @ApiImplicitHeader({ name: 'authorization', required: true })
    @Put('/update/me/unsubscribe')
    async UnsubscribeFromCategories(
        @User('id') id,
        @Body() categories: number[],
    ) {
        return await this.userService.UnsubscribeFromCategories(id, categories);
    }

    @Post('/forgetpassword')
    async forgetPassword(
        @Body() body: any,
    ) {
        return await this.userService.forgetPassword(body);
    }

    @Post('/forgetpassword/resetcode')
    async validResetCode(
        @Body() resDto: resetDTo,
    ) {
        return await this.userService.validResetCode(resDto);
    }

    @Post('/forgetpassword/resetcode/changepassword')
    async changePasswordAfterResetode(
        @Body() resAndPAss: resetDToAnddPass,
    ) {
        return await this.userService.changePasswordAfterResetode(resAndPAss);
    }

}
