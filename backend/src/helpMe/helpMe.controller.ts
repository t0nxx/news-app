import { Controller, Query, Get, Param, ParseIntPipe, Post, Body, Put, Delete } from '@nestjs/common';
import { ApiUseTags, ApiImplicitParam, ApiImplicitHeader } from '@nestjs/swagger';
import { HelpMeService } from './helpMe.service';
import { PaginationDto } from '../shared/pagination.filter';
import { HelpMeDto } from './helpMe.dto';
import { HelpMeUpdateDto } from './helpMe.update.dto';

@ApiUseTags('helpMe')
@Controller('helpMe')
export class HelpMeController {
    constructor(private helpMeervice: HelpMeService) { }

    @Get()
    @ApiImplicitHeader({ name: 'authorization', required: true })
    async getAllhelpMe(@Query() paginate: PaginationDto) {
        return this.helpMeervice.getAllhelpMes(paginate);
    }

    @Get('/getOne/:id')
    @ApiImplicitHeader({ name: 'authorization', required: true })
    @ApiImplicitParam({ name: 'id' })
    async getOnehelpMe(
        @Param('id', new ParseIntPipe()) id,
    ) {
        return this.helpMeervice.getOnehelpMe(id);
    }

    @Post('/new')
    async createNewUser(@Body() cate: HelpMeDto) {
        return this.helpMeervice.createNewhelpMe(cate);
    }

    @ApiImplicitHeader({ name: 'authorization', required: true })
    @ApiImplicitParam({ name: 'id' })
    @Put('/update/:id')
    async updatehelpMe(
        @Param('id', new ParseIntPipe()) id,
        @Body() cate: HelpMeUpdateDto,
    ) {
        return this.helpMeervice.updatehelpMe(id, cate);
    }

    @ApiImplicitHeader({ name: 'authorization', required: true })
    @ApiImplicitParam({ name: 'id' })
    @Delete('/delete/:id')
    async deletehelpMe(
        @Param('id', new ParseIntPipe()) id,
    ) {
        return this.helpMeervice.delethelpMe(id);
    }
}
