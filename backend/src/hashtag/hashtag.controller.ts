import { Controller, Query, Get, Param, ParseIntPipe, Post, Body, Put, Delete } from '@nestjs/common';
import { ApiUseTags, ApiImplicitParam, ApiImplicitHeader } from '@nestjs/swagger';
import { HashtagService } from './hashtag.service';
import { PaginationDto } from '../shared/pagination.filter';
import { HashTagDto } from './hashtag.dto';
import { HashTagUpdateDto } from './hashtag.update.dto';

@ApiUseTags('hashtags')
@Controller('hashtags')
export class HashtagController {
    constructor(private hashTagService: HashtagService) { }

    @Get()
    async getAllHashTags(@Query() paginate: PaginationDto) {
        return this.hashTagService.getAllHashtags(paginate);
    }

    @Get('/getOne/:id')
    @ApiImplicitParam({ name: 'id' })
    async getOnehashTag(
        @Param('id', new ParseIntPipe()) id,
    ) {
        return this.hashTagService.getOnehashTag(id);
    }

    @ApiImplicitHeader({ name: 'authorization', required: true })
    @Post('/new')
    async createNewUser(@Body() cate: HashTagDto) {
        return this.hashTagService.createNewhashTag(cate);
    }

    @ApiImplicitHeader({ name: 'authorization', required: true })
    @ApiImplicitParam({ name: 'id' })
    @Put('/update/:id')
    async updatehashTag(
        @Param('id', new ParseIntPipe()) id,
        @Body() cate: HashTagUpdateDto,
    ) {
        return this.hashTagService.updatehashTag(id, cate);
    }

    @ApiImplicitHeader({ name: 'authorization', required: true })
    @ApiImplicitParam({ name: 'id' })
    @Delete('/delete/:id')
    async deletehashTag(
        @Param('id', new ParseIntPipe()) id,
    ) {
        return this.hashTagService.delethashTag(id);
    }
}
