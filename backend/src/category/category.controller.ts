import { Controller, Get, Query, Post, Body, Put, Param, ParseIntPipe, Delete, Res, UseInterceptors, UploadedFiles } from '@nestjs/common';
import { ApiUseTags, ApiImplicitHeader, ApiImplicitParam } from '@nestjs/swagger';
import { CategoryService } from './category.service';
import { CategoryDto } from './category.dto';
import { PaginationDto } from '../shared/pagination.filter';
import { CategoryUpdateDto } from './category.update.dto';
import { FilesInterceptor } from '@nestjs/platform-express';
import { UploadToS3 } from '../shared/awsUploader';


@ApiUseTags('categories')
@Controller('categories')
export class CategoryController {
    constructor(private categoryService: CategoryService) { }

    @Get()
    async getAllOrders(@Query() paginate: PaginationDto) {
        return this.categoryService.getAllCategories(paginate);
    }

    @Get('/getOne/:id')
    @ApiImplicitParam({ name: 'id' })
    async getOneCategory(
        @Param('id', new ParseIntPipe()) id,
    ) {
        return this.categoryService.getOnecategory(id);
    }

    @ApiImplicitHeader({ name: 'authorization', required: true })
    @Post('/new')
    @UseInterceptors(FilesInterceptor('files'))
    async createNewUser(@Body() cate: CategoryDto, @UploadedFiles() files: any[]) {
        // let updir = 'http://localhost:3001/';
        // prod 
        // let updir = 'http://18.194.127.99:3001/';
        if (files) {
            if (files.length > 0) {
                cate.backgroundImage = await UploadToS3(files[0]);
            }
        }
        return this.categoryService.createNewcategory(cate);
    }

    @ApiImplicitHeader({ name: 'authorization', required: true })
    @ApiImplicitParam({ name: 'id' })
    @Put('/update/:id')
    @UseInterceptors(FilesInterceptor('files'))
    async updateCategory(
        @Param('id', new ParseIntPipe()) id,
        @Body() cate: CategoryDto,
        @UploadedFiles() files: any[]
    ) {
        if (files) {
            if (files.length > 0) {
                cate.backgroundImage = await UploadToS3(files[0]);
            }
        }
        return this.categoryService.updatecategory(id, cate);
    }

    @ApiImplicitHeader({ name: 'authorization', required: true })
    @ApiImplicitParam({ name: 'id' })
    @Delete('/delete/:id')
    async deleteCategory(
        @Param('id', new ParseIntPipe()) id,
    ) {
        return this.categoryService.deletcategory(id);
    }
}
