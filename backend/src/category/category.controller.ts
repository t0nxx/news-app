import { Controller, Get, Query, Post, Body, Put, Param, ParseIntPipe, Delete } from '@nestjs/common';
import { ApiUseTags, ApiImplicitHeader, ApiImplicitParam } from '@nestjs/swagger';
import { CategoryService } from './category.service';
import { CategoryDto } from './category.dto';
import { PaginationDto } from 'src/shared/pagination.filter';
import { CategoryUpdateDto } from './category.update.dto';

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
    async createNewUser(@Body() cate: CategoryDto) {
        return this.categoryService.createNewcategory(cate);
    }

    @ApiImplicitHeader({ name: 'authorization', required: true })
    @ApiImplicitParam({ name: 'id' })
    @Put('/update/:id')
    async updateCategory(
        @Param('id', new ParseIntPipe()) id,
        @Body() cate: CategoryUpdateDto,
    ) {
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
