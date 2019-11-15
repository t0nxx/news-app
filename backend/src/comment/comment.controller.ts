import { Controller, Get, Query, Param, ParseIntPipe, Post, Body, Put, Delete } from '@nestjs/common';
import { ApiUseTags, ApiImplicitParam, ApiImplicitHeader, ApiImplicitQuery } from '@nestjs/swagger';
import { CommentService } from './comment.service';
import { PaginationDto } from '../shared/pagination.filter';
import { CommentDto } from './comment.dto';
import { User } from '../user/user.decorator';
import { CommentUpdateDto } from './comment.update.dto';

@ApiUseTags('comments')
@Controller('comments')
export class CommentController {
    constructor(private commentService: CommentService) { }

    @Get()
    @ApiImplicitQuery({ name: 'postId', type: 'number', required: false })
    @ApiImplicitQuery({ name: 'parentId', type: 'number', required: false })
    async getAllComments(@Query() paginate: PaginationDto) {
        return this.commentService.getAllComments(paginate);
    }

    @Get('/me')
    @ApiImplicitHeader({ name: 'authorization', required: true })
    async getAllMyComments(@Query() paginate: PaginationDto, @User('id') id, ) {
        return this.commentService.getMyComments(id, paginate);
    }

    // @Get('/replies')
    // @ApiImplicitQuery({ name: 'parentId', type: 'number', required: true })
    // async getReplies(@Query() paginate: PaginationDto) {
    //     return this.commentService.getRepliesOfComments(paginate);
    // }

    @Get('/getOne/:id')
    @ApiImplicitParam({ name: 'id' })
    async getOneComment(
        @Query() paginate: PaginationDto,
        @Param('id', new ParseIntPipe()) id,
    ) {
        return this.commentService.getOneComment(id, paginate);
    }

    @ApiImplicitHeader({ name: 'authorization', required: true })
    @Post('/new')
    async createNewUser(
        @User('id') id,
        @Body() comment: CommentDto,
    ) {
        return this.commentService.CreateNewComment(id, comment);
    }

    @ApiImplicitHeader({ name: 'authorization', required: true })
    @ApiImplicitParam({ name: 'id' })
    @Put('/update/:id')
    async updateComment(
        @User('id') userId,
        @Param('id', new ParseIntPipe()) id,
        @Body() cate: CommentUpdateDto,
    ) {
        return this.commentService.updateComment(userId, id, cate);
    }

    @ApiImplicitHeader({ name: 'authorization', required: true })
    @ApiImplicitParam({ name: 'id' })
    @Delete('/delete/:id')
    async deleteComment(
        @User('id') userId,
        @Param('id', new ParseIntPipe()) id,
    ) {
        return this.commentService.deletComment(userId, id);
    }

    @ApiImplicitHeader({ name: 'authorization', required: true })
    @ApiImplicitParam({ name: 'id' })
    @Get('/report/:id')
    async reportComment(
        @Param('id', new ParseIntPipe()) id,
    ) {
        return this.commentService.ReportComment(id);
    }
}
