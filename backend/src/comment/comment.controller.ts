import { Controller, Get, Query, Param, ParseIntPipe, Post, Body, Put, Delete } from '@nestjs/common';
import { ApiUseTags, ApiImplicitParam, ApiImplicitHeader, ApiImplicitQuery } from '@nestjs/swagger';
import { CommentService } from './comment.service';
import { PaginationDto } from '../shared/pagination.filter';
import { CommentDto } from './comment.dto';

@ApiUseTags('comments')
@Controller('comments')
export class CommentController {
    constructor(private commentService: CommentService) { }

    @Get()
    @ApiImplicitQuery({ name: 'postId', type: 'number', required: true })
    async getAllComments(@Query() paginate: PaginationDto) {
        return this.commentService.getAllComments(paginate);
    }

    @Get('/replies')
    @ApiImplicitQuery({ name: 'parentId', type: 'number', required: true })
    async getReplies(@Query() paginate: PaginationDto) {
        console.log(paginate);
        return this.commentService.getRepliesOfComments(paginate);
    }

    @Get('/getOne/:id')
    @ApiImplicitParam({ name: 'id' })
    async getOneComment(
        @Param('id', new ParseIntPipe()) id,
    ) {
        return this.commentService.getOneComment(id);
    }

    @ApiImplicitHeader({ name: 'authorization', required: true })
    @Post('/new')
    async createNewUser(@Body() comment: CommentDto) {
        // console.log(cate);
        // return this.CommentService.createNewComment(cate);
    }

    @ApiImplicitHeader({ name: 'authorization', required: true })
    @ApiImplicitParam({ name: 'id' })
    @Put('/update/:id')
    async updateComment(
        @Param('id', new ParseIntPipe()) id,
        // @Body() cate: CommentUpdateDto,
    ) {
        // console.log(cate);
        // return this.CommentService.updateComment(id, cate);
    }

    @ApiImplicitHeader({ name: 'authorization', required: true })
    @ApiImplicitParam({ name: 'id' })
    @Delete('/delete/:id')
    async deleteComment(
        @Param('id', new ParseIntPipe()) id,
    ) {
        // return this.CommentService.deletComment(id);
    }
}
