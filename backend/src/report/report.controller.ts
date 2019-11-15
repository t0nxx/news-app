import { Controller, Query, Get, Param, ParseIntPipe, Post, Body, Put, Delete } from '@nestjs/common';
import { ApiUseTags, ApiImplicitParam, ApiImplicitHeader } from '@nestjs/swagger';
import { ReportsService } from './report.service';
import { PaginationDto } from '../shared/pagination.filter';
import { ReportDto } from './report.dto';
import { ReportUpdateDto } from './report.update.dto';
import { User } from '../user/user.decorator';

@ApiUseTags('reports')
@Controller('reports')
export class ReportsController {
    constructor(private reportservice: ReportsService) { }

    @Get()
    async getAllreports(@Query() paginate: PaginationDto) {
        return this.reportservice.getAllReports(paginate);
    }

    @Get('/getOne/:id')
    @ApiImplicitParam({ name: 'id' })
    async getOnereports(
        @Param('id', new ParseIntPipe()) id,
    ) {
        return this.reportservice.getOneReports(id);
    }

    @ApiImplicitHeader({ name: 'authorization', required: true })
    @Post('/new')
    async createNewUser(@Body() report: ReportDto, @User('id') id) {
        return this.reportservice.createNewReports(id, report);
    }

    // @ApiImplicitHeader({ name: 'authorization', required: true })
    // @ApiImplicitParam({ name: 'id' })
    // @Put('/update/:id')
    // async updatereports(
    //     @Param('id', new ParseIntPipe()) id,
    //     @Body() cate: reportsUpdateDto,
    // ) {
    //     return this.reportservice.updatereports(id, cate);
    // }

    @ApiImplicitHeader({ name: 'authorization', required: true })
    @ApiImplicitParam({ name: 'id' })
    @Delete('/delete/:id')
    async deletereports(
        @Param('id', new ParseIntPipe()) id,
    ) {
        return this.reportservice.deletReports(id);
    }


}
