import { Controller, Query, Get, Param, ParseIntPipe, Post, Body, Put, Delete } from '@nestjs/common';
import { ApiUseTags, ApiImplicitParam, ApiImplicitHeader } from '@nestjs/swagger';
import { TermsService } from './terms.service';
import { PaginationDto } from '../shared/pagination.filter';
import { TermsDto } from './terms.dto';
import { TermsUpdateDto } from './terms.update.dto';

@ApiUseTags('terms')
@Controller('terms')
export class TermsController {
    constructor(private termservice: TermsService) { }

    @Get()
    async getAllterms(@Query() paginate: PaginationDto) {
        return this.termservice.getAlltermss(paginate);
    }

    @Get('/getOne/:id')
    @ApiImplicitParam({ name: 'id' })
    async getOneterms(
        @Param('id', new ParseIntPipe()) id,
    ) {
        return this.termservice.getOneterms(id);
    }

    @ApiImplicitHeader({ name: 'authorization', required: true })
    @Post('/new')
    async createNewUser(@Body() cate: TermsDto) {
        return this.termservice.createNewterms(cate);
    }

    @ApiImplicitHeader({ name: 'authorization', required: true })
    @ApiImplicitParam({ name: 'id' })
    @Put('/update/:id')
    async updateterms(
        @Param('id', new ParseIntPipe()) id,
        @Body() cate: TermsUpdateDto,
    ) {
        return this.termservice.updateterms(id, cate);
    }

    @ApiImplicitHeader({ name: 'authorization', required: true })
    @ApiImplicitParam({ name: 'id' })
    @Delete('/delete/:id')
    async deleteterms(
        @Param('id', new ParseIntPipe()) id,
    ) {
        return this.termservice.deletterms(id);
    }

    //// dashboard ////////
    @Get('/dashboard')
    async getAlltermsDash(@Query() paginate: PaginationDto) {
        return this.termservice.getAlltermsDashboard(paginate);
    }

    @Get('/dashboard/getOne/:id')
    @ApiImplicitParam({ name: 'id' })
    async getOnetermsDash(
        @Param('id', new ParseIntPipe()) id,
    ) {
        return this.termservice.getOneterms(id);
    }

    @ApiImplicitHeader({ name: 'authorization', required: true })
    @Post('/dashboard/new')
    async createNewUserDash(@Body() cate: TermsDto) {
        return this.termservice.createNewterms(cate);
    }

    @ApiImplicitHeader({ name: 'authorization', required: true })
    @ApiImplicitParam({ name: 'id' })
    @Put('/dashboard/update/:id')
    async updatetermsDash(
        @Param('id', new ParseIntPipe()) id,
        @Body() cate: TermsUpdateDto,
    ) {
        return this.termservice.updateterms(id, cate);
    }

    @ApiImplicitHeader({ name: 'authorization', required: true })
    @ApiImplicitParam({ name: 'id' })
    @Delete('/dashboard/delete/:id')
    async deletetermsDash(
        @Param('id', new ParseIntPipe()) id,
    ) {
        return this.termservice.deletterms(id);
    }
}
