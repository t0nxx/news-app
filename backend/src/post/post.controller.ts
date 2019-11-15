import { Controller, Get, Query, Param, ParseIntPipe, Post, Body, Put, Delete, UseInterceptors, UploadedFiles } from '@nestjs/common';
import { PostService } from './post.service';
import { PaginationDto } from '../shared/pagination.filter';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ApiImplicitParam, ApiImplicitHeader, ApiUseTags, ApiImplicitQuery, ApiExcludeEndpoint } from '@nestjs/swagger';
import { PostDto } from './post.dto';
import { User } from '../user/user.decorator';
import { extractBase64FromBody } from '../shared/base64ToFile';
import { UploadToS3 } from '../shared/awsUploader';
//
@ApiUseTags('posts')
@Controller('posts')
export class PostController {
    constructor(private postService: PostService) { }

    @Get()
    @ApiImplicitQuery({ name: 'tag', required: false })
    @ApiImplicitQuery({ name: 'userId', required: false })
    @ApiImplicitQuery({ name: 'kind', required: false, description: 'mostComment , mostRead' })
    // @ApiImplicitQuery({ name: 'userID', required: false })
    async getAllPosts(@Query() paginate: PaginationDto) {
        return this.postService.getAllPosts(paginate);
    }

    @Get('/getOne/:id')
    @ApiExcludeEndpoint()
    @ApiImplicitParam({ name: 'id', required: true })
    async getOnepostDashBoard(
        @Param('id', new ParseIntPipe()) id,
    ) {
        return this.postService.getOnePostDashBoard(id);
    }

    @Get('/getOne/mobile/:id')
    @ApiImplicitQuery({ name: 'userId', required: false })
    @ApiImplicitParam({ name: 'id', required: true })
    async getOnepost(
        @Param('id', new ParseIntPipe()) id,
        @Query() paginate: any,
    ) {
        return this.postService.getOnePost(id, paginate);
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
        // let updir = 'http://localhost:3001/';
        // prod 
        // let updir = 'http://18.194.127.99:3001/';

        post = JSON.parse(JSON.stringify(post));
        console.log(post);
        post.body = await extractBase64FromBody(post.body);
        if (files) {
            if (files.length > 0) {
                post.backgroundImage = await UploadToS3(files[0]);
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
    @ApiImplicitHeader({ name: 'authorization', required: true })
    @ApiImplicitParam({ name: 'id' })
    @Put('/update/:id')
    @UseInterceptors(FilesInterceptor('files'))
    async updatepost(
        @Param('id', new ParseIntPipe()) id,
        @Body() post: any,
        @UploadedFiles() files: any[],
    ) {
        post.body = await extractBase64FromBody(post.body);
        if (files) {
            if (files.length > 0) {
                post.backgroundImage = await UploadToS3(files[0]);
            }
        }
        return this.postService.updatePost(id, post);
    }

    @ApiImplicitHeader({ name: 'authorization', required: true })
    @ApiImplicitParam({ name: 'id' })
    @Delete('/delete/:id')
    async deletepost(
        @Param('id', new ParseIntPipe()) id,
    ) {
        return this.postService.deletPost(id);
    }

    @ApiImplicitHeader({ name: 'authorization', required: true })
    @ApiImplicitParam({ name: 'id' })
    @Put('/bookmark/:id')
    async bookmarkPost(
        @User('id') id,
        @Param('id', new ParseIntPipe()) postId) {
        return this.postService.bookmarkPost(id, postId);
    }

    @ApiImplicitHeader({ name: 'authorization', required: true })
    @ApiImplicitParam({ name: 'id' })
    @Put('/unbookmark/:id')
    async unBookmarkPost(
        @User('id') id,
        @Param('id', new ParseIntPipe()) postId) {
        return this.postService.unBookmarkPost(id, postId);
    }

    @Get('statistics')
    async getStatistics() {
        return this.postService.getStatistics();
    }
}
