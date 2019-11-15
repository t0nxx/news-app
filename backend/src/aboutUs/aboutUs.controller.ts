import { Controller, Query, Get, Param, ParseIntPipe, Post, Body, Put, Delete } from '@nestjs/common';
import { ApiUseTags, ApiImplicitParam, ApiImplicitHeader } from '@nestjs/swagger';
import { AboutUsService } from './aboutUs.service';
import { PaginationDto } from '../shared/pagination.filter';
import { AboutUsDto } from './aboutUs.dto';
import { AboutUsUpdateDto } from './aboutUs.update.dto';

@ApiUseTags('aboutUs')
@Controller('aboutUs')
export class AboutUsController {
    constructor(private aboutUservice: AboutUsService) { }

    @Get()
    async getAllaboutUs(@Query() paginate: PaginationDto) {
        return this.aboutUservice.getAllAboutUss(paginate);
    }

    @Get('/getOne/:id')
    @ApiImplicitParam({ name: 'id' })
    async getOneAboutUs(
        @Param('id', new ParseIntPipe()) id,
    ) {
        return this.aboutUservice.getOneAboutUs(id);
    }

    @ApiImplicitHeader({ name: 'authorization', required: true })
    @Post('/new')
    async createNewUser(@Body() cate: AboutUsDto) {
        return this.aboutUservice.createNewAboutUs(cate);
    }

    @ApiImplicitHeader({ name: 'authorization', required: true })
    @ApiImplicitParam({ name: 'id' })
    @Put('/update/:id')
    async updateAboutUs(
        @Param('id', new ParseIntPipe()) id,
        @Body() cate: AboutUsUpdateDto,
    ) {
        return this.aboutUservice.updateAboutUs(id, cate);
    }

    @ApiImplicitHeader({ name: 'authorization', required: true })
    @ApiImplicitParam({ name: 'id' })
    @Delete('/delete/:id')
    async deleteAboutUs(
        @Param('id', new ParseIntPipe()) id,
    ) {
        return this.aboutUservice.deletAboutUs(id);
    }


    /// dasboard ////////////////////
    @ApiImplicitHeader({ name: 'authorization', required: true })
    @Get('/dashboard')
    async getAllaboutUsDash(@Query() paginate: PaginationDto) {
        return this.aboutUservice.getAllAboutUsDashboard(paginate);
    }

    @Get('/dashboard/getOne/:id')
    @ApiImplicitParam({ name: 'id' })
    async getOneAboutUsDAsh(
        @Param('id', new ParseIntPipe()) id,
    ) {
        return this.aboutUservice.getOneAboutUs(id);
    }

    @ApiImplicitHeader({ name: 'authorization', required: true })
    @Post('/dashboard/new')
    async createNewUserDAsh(@Body() cate: AboutUsDto) {
        return this.aboutUservice.createNewAboutUs(cate);
    }

    @ApiImplicitHeader({ name: 'authorization', required: true })
    @ApiImplicitParam({ name: 'id' })
    @Put('/dashboard/update/:id')
    async updateAboutUsDAsh(
        @Param('id', new ParseIntPipe()) id,
        @Body() cate: AboutUsUpdateDto,
    ) {
        return this.aboutUservice.updateAboutUs(id, cate);
    }

    @ApiImplicitHeader({ name: 'authorization', required: true })
    @ApiImplicitParam({ name: 'id' })
    @Delete('/dashboard/delete/:id')
    async deleteAboutUsDash(
        @Param('id', new ParseIntPipe()) id,
    ) {
        return this.aboutUservice.deletAboutUs(id);
    }
}
