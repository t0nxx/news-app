import { Controller, Post, UseInterceptors, UploadedFiles, Get, Query, Param, ParseIntPipe, Delete } from '@nestjs/common';
import { UploaderService } from './uploader.service';
import { FilesInterceptor } from '@nestjs/platform-express';
import { Uploader } from './uploader.entity';
import { PaginationDto } from '../shared/pagination.filter';
import { UploadToS3 } from '../shared/awsUploader';

@Controller('uploads')
export class UploaderController {
    constructor(private uploadService: UploaderService) { }

    @Get()
    async getAllPosts(@Query() paginate: PaginationDto) {
        return this.uploadService.getAllUploads(paginate);
    }

    @Get('/getOne/:id')
    async getOneCategory(
        @Param('id', new ParseIntPipe()) id,
    ) {
        return this.uploadService.getOneUpload(id);
    }

    @Post('/new')
    @UseInterceptors(FilesInterceptor('files'))
    async createNewPost(
        @UploadedFiles() files: any[],
    ) {
        // let updir = 'http://localhost:3001/';
        // prod 
        // let updir = 'http://18.194.127.99:3001/';
        let upload = new Uploader();

        if (files) {
            if (files.length > 0) {
                upload.url = await UploadToS3(files[0]);
            }
        }
        return this.uploadService.createNewUpload(upload);
    }

    @Delete('/delete/:id')
    async deleteCategory(
        @Param('id', new ParseIntPipe()) id,
    ) {
        return this.uploadService.deletUpload(id);
    }
}
