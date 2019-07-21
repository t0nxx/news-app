import { Controller, Get, Query, Param, ParseIntPipe, Post, Body, Put, Delete, UseInterceptors, UploadedFiles } from '@nestjs/common';
import { PostService } from './post.service';
import { PaginationDto } from '../shared/pagination.filter';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ApiImplicitParam, ApiImplicitHeader, ApiUseTags, ApiImplicitQuery } from '@nestjs/swagger';
import { PostDto } from './post.dto';
import { User } from '../user/user.decorator';

@ApiUseTags('posts')
@Controller('posts')
export class PostController {
    constructor(private postService: PostService) { }

    @Get()
    @ApiImplicitQuery({ name: 'tag', required: false })
    @ApiImplicitQuery({ name: 'category', required: false })
    @ApiImplicitQuery({ name: 'userID', required: false })
    async getAllPosts(@Query() paginate: PaginationDto) {
        return this.postService.getAllPosts(paginate);
    }

    @Get('/getOne/:id')
    @ApiImplicitParam({ name: 'id', required: true })
    async getOnepost(
        @Param('id', new ParseIntPipe()) id,
    ) {
        return this.postService.getOnePost(id);
    }

    @Post('/reactions/:id')
    @ApiImplicitHeader({ name: 'authorization', required: true })
    @ApiImplicitParam({ name: 'id', required: true })
    @ApiImplicitQuery({ name: 'react', enum: ['like', 'love', 'haha', 'wow', 'sad', 'angry'], required: true })
    async reactToPost(
        @User('id') userid,
        @Param('id', new ParseIntPipe()) postid,
        @Query('react') reaction,
    ) {
        return this.postService.reactToPost(postid, userid, reaction);
    }

    @ApiImplicitHeader({ name: 'authorization', required: true })
    @Post('/new')
    @UseInterceptors(FilesInterceptor('files'))
    async createNewPost(
        @User('id') id,
        @Body() post: PostDto,
        @UploadedFiles() files: any[],
    ) {
        let updir = 'http://localhost:3001/';
        /* prod */
        // let updir = 'http://localhost:3001/'

        post = JSON.parse(JSON.stringify(post));
        post.photos = [];

        if (files) {
            if (files.length > 0) {
                post.backgroundImage = `${updir}${files[0].filename}`;
                files.forEach(photo => {
                    post.photos.push(`${updir}${photo.filename}`);
                });
            }
        }
        return this.postService.createNewPost(id, post);
    }

    @ApiImplicitHeader({ name: 'authorization', required: true })
    @Get('/mySubscriptions')
    async getPostsOfMySubscription(
        @User('id') id,
        @Query() paginate: PaginationDto) {
        return this.postService.getPostsOfMySubscription(id, paginate);
    }
    // @ApiImplicitHeader({ name: 'authorization', required: true })
    // @ApiImplicitParam({ name: 'id' })
    // @Put('/update/:id')
    // async updatepost(
    //     @Param('id', new ParseIntPipe()) id,
    //     @Body() post: postUpdateDto,
    // ) {
    //     console.log(post);
    //     return this.postService.updatepost(id, post);
    // }

    @ApiImplicitHeader({ name: 'authorization', required: true })
    @ApiImplicitParam({ name: 'id' })
    @Delete('/delete/:id')
    async deletepost(
        @Param('id', new ParseIntPipe()) id,
    ) {
        return this.postService.deletPost(id);
    }
}
