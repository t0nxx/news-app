import { Controller, Get, Body, ParseIntPipe, Post, Put, Delete, Query } from '@nestjs/common';
import { ApiUseTags, ApiImplicitParam, ApiImplicitHeader, ApiImplicitQuery } from '@nestjs/swagger';
import { UserService } from './user.service';
import { UserDto } from './user.dto';
import { UserUpdateDto } from './user.update.dto';
import { User } from './user.decorator';
import { PaginationDto } from 'src/shared/pagination.filter';
import { Category } from 'src/category/category.entity';

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
    @Get('/me')
    async getOneUser(@User('id') id) {
        return this.userService.getOneUser(id);
    }

    @Post('/new')
    async createNewUser(@Body() userDto: UserDto) {
        return this.userService.createNewUser(userDto);
    }

    @ApiImplicitHeader({ name: 'authorization', required: true })
    @Put('/update/me')
    async updateUser(
        @User('id') id,
        @Body() updateUserDto: UserUpdateDto,
    ) {
        return await this.userService.updateUser(id, updateUserDto);
    }

    @ApiImplicitHeader({ name: 'authorization', required: true })
    @Delete('/delete/me')
    @ApiImplicitParam({ name: 'id' })
    async deletPie(@User('id') id) {
        return this.userService.deletUser(id);
    }

    @ApiImplicitHeader({ name: 'authorization', required: true })
    @ApiImplicitQuery({ name: 'id', type: 'number', required: true })
    @ApiImplicitQuery({ name: 'role', enum: ['ADMIN', 'MAINTAINER', 'USER'], required: true })
    @Get('/promote')
    async promoteUserLevel(
        @Query('id', new ParseIntPipe()) id,
        @Query('role') role: string,
    ) {
        return this.userService.promoteUserLevel(id, role);
    }

    /* start relations */

    @ApiImplicitHeader({ name: 'authorization', required: true })
    @Put('/update/me/subscribe')
    async subscribeToCategories(
        @User('id') id,
        @Body() categories: Category[],
    ) {
        return await this.userService.subscribeToCategories(id, categories);
    }

    @ApiImplicitHeader({ name: 'authorization', required: true })
    @Put('/update/me/unsubscribe')
    async UnsubscribeFromCategories(
        @User('id') id,
        @Body() categories: Category[],
    ) {
        return await this.userService.UnsubscribeFromCategories(id, categories);
    }

}
