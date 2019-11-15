import { Controller, Get, Query, Post, Body, Put, Param, ParseIntPipe, Delete, Res, UseInterceptors, UploadedFiles } from '@nestjs/common';
import { ApiUseTags, ApiImplicitHeader, ApiImplicitParam } from '@nestjs/swagger';
import { SourceService } from './source.service';
import { SourceDto } from './source.dto';
import { PaginationDto } from '../shared/pagination.filter';
import { SourceUpdateDto } from './source.update.dto';
import { FilesInterceptor } from '@nestjs/platform-express';
import { UploadToS3 } from '../shared/awsUploader';


@ApiUseTags('sources')
@Controller('sources')
export class SourceController {
    constructor(private sourceService: SourceService) { }

    @Get()
    async getAllSources(@Query() paginate: PaginationDto) {
        return this.sourceService.getAllSources(paginate);
    }

    @Get('/getOne/:id')
    @ApiImplicitParam({ name: 'id' })
    async getOneSource(
        @Param('id', new ParseIntPipe()) id,
    ) {
        return this.sourceService.getOneSource(id);
    }

    @ApiImplicitHeader({ name: 'authorization', required: true })
    @Post('/new')
    @UseInterceptors(FilesInterceptor('files'))
    async createNewSource(@Body() cate: SourceDto, @UploadedFiles() files: any[]) {
        // let updir = 'http://localhost:3001/';
        // prod 
        // let updir = 'http://18.194.127.99:3001/';
        if (files) {
            if (files.length > 0) {
                cate.backgroundImage = await UploadToS3(files[0]);
            }
        }
        return this.sourceService.createNewSource(cate);
    }

    @ApiImplicitHeader({ name: 'authorization', required: true })
    @ApiImplicitParam({ name: 'id' })
    @Put('/update/:id')
    @UseInterceptors(FilesInterceptor('files'))
    async updateSource(
        @Param('id', new ParseIntPipe()) id,
        @Body() cate: SourceDto,
        @UploadedFiles() files: any[]
    ) {
        if (files) {
            if (files.length > 0) {
                cate.backgroundImage = await UploadToS3(files[0]);
            }
        }
        return this.sourceService.updateSource(id, cate);
    }

    @ApiImplicitHeader({ name: 'authorization', required: true })
    @ApiImplicitParam({ name: 'id' })
    @Delete('/delete/:id')
    async deleteSource(
        @Param('id', new ParseIntPipe()) id,
    ) {
        return this.sourceService.deletSource(id);
    }
}
